-- Diligent AI — core schema (spec §4.3) with Row-Level Security.
--
-- Tenancy model: one row in `organizations` per customer company. Every
-- tenant-scoped table carries `org_id`, and RLS restricts reads/writes to the
-- caller's organisation, taken from the signed JWT. One org cannot read
-- another's data even with a valid token.

create extension if not exists pgcrypto;

-- ─── Enums ──────────────────────────────────────────────────────────────
create type public.plan_tier as enum ('trial', 'starter', 'pro', 'enterprise');
create type public.user_role as enum ('super_admin', 'admin', 'power_user', 'user', 'viewer', 'trial');
create type public.language_pref as enum ('ar', 'en');
create type public.product_key as enum ('ipe', 'ceo_os', 'nexus');
create type public.access_level as enum ('full', 'read_only', 'trial');
create type public.ticket_priority as enum ('low', 'normal', 'high', 'urgent');
create type public.ticket_status as enum ('open', 'pending', 'resolved', 'closed');

-- ─── Organizations (tenants) ────────────────────────────────────────────
create table public.organizations (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text unique not null check (slug ~ '^[a-z0-9-]{2,64}$'),
  plan          public.plan_tier not null default 'trial',
  ipe_enabled   boolean not null default false,
  ceo_enabled   boolean not null default false,
  nexus_enabled boolean not null default false,
  -- Enterprise SSO: email domains routed to the org's SAML/OIDC IdP.
  sso_domains   text[] not null default '{}',
  -- Org Admin–configurable inactivity timeout (spec §5.2), minutes.
  session_timeout_minutes int not null default 240 check (session_timeout_minutes between 15 and 1440),
  contract_end  date,
  created_at    timestamptz not null default now()
);

-- ─── Users (profile; id = auth.users.id) ────────────────────────────────
create table public.users (
  id            uuid primary key references auth.users (id) on delete cascade,
  org_id        uuid not null references public.organizations (id) on delete restrict,
  email         text unique not null,
  full_name     text,
  role          public.user_role not null default 'user',
  language_pref public.language_pref not null default 'ar',
  last_login    timestamptz,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);
create index users_org_idx on public.users (org_id);

-- ─── Product access (which users can open which products) ──────────────
create table public.product_access (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.users (id) on delete cascade,
  org_id       uuid not null references public.organizations (id) on delete cascade,
  product      public.product_key not null,
  access_level public.access_level not null default 'trial',
  granted_by   uuid references public.users (id),
  expires_at   timestamptz,
  created_at   timestamptz not null default now(),
  unique (user_id, product)
);
create index product_access_org_idx on public.product_access (org_id);

-- ─── Audit log (SOC 2 readiness; retained 2 years) ─────────────────────
create table public.audit_log (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references public.users (id) on delete set null,
  org_id     uuid references public.organizations (id) on delete cascade,
  action     text not null,
  resource   text,
  metadata   jsonb not null default '{}',
  ip_address inet,
  created_at timestamptz not null default now()
);
create index audit_log_org_created_idx on public.audit_log (org_id, created_at desc);
create index audit_log_user_created_idx on public.audit_log (user_id, created_at desc);

-- ─── Support tickets ────────────────────────────────────────────────────
create table public.support_tickets (
  id         uuid primary key default gen_random_uuid(),
  org_id     uuid not null references public.organizations (id) on delete cascade,
  user_id    uuid not null references public.users (id) on delete cascade,
  product    public.product_key,
  subject    text not null check (char_length(subject) between 3 and 200),
  message    text not null check (char_length(message) between 10 and 5000),
  priority   public.ticket_priority not null default 'normal',
  status     public.ticket_status not null default 'open',
  created_at timestamptz not null default now()
);
create index support_tickets_org_idx on public.support_tickets (org_id, created_at desc);

-- ─── Demo requests (marketing leads; written by the server only) ───────
create table public.demo_requests (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  company    text not null,
  industry   text not null,
  product    text not null,
  language   public.language_pref not null default 'ar',
  source     text,
  is_mql     boolean not null default false,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);
create index demo_requests_email_created_idx on public.demo_requests (email, created_at desc);

-- ─── JWT helpers ────────────────────────────────────────────────────────
-- org_id and role are placed in the access token by the custom access token
-- hook below, so RLS checks never need an extra lookup.
create or replace function public.jwt_org_id() returns uuid
language sql stable as $$
  select nullif(auth.jwt() -> 'app_metadata' ->> 'org_id', '')::uuid
$$;

create or replace function public.jwt_role() returns text
language sql stable as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', 'viewer')
$$;

create or replace function public.is_org_admin() returns boolean
language sql stable as $$
  select public.jwt_role() in ('admin', 'super_admin')
$$;

-- ─── Custom access token hook ───────────────────────────────────────────
-- Enable in Supabase Dashboard → Authentication → Hooks → Custom Access Token.
-- Injects org_id / role / org_slug from public.users into app_metadata, and
-- blocks tokens for deactivated users (instant offboarding).
create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  claims jsonb := event -> 'claims';
  profile record;
begin
  select u.org_id, u.role, u.is_active, o.slug
    into profile
    from public.users u
    join public.organizations o on o.id = u.org_id
   where u.id = (event ->> 'user_id')::uuid;

  if found then
    if not profile.is_active then
      return jsonb_build_object('error', jsonb_build_object('http_code', 403, 'message', 'User is deactivated'));
    end if;
    claims := jsonb_set(claims, '{app_metadata}', coalesce(claims -> 'app_metadata', '{}'::jsonb));
    claims := jsonb_set(claims, '{app_metadata,org_id}', to_jsonb(profile.org_id::text));
    claims := jsonb_set(claims, '{app_metadata,role}', to_jsonb(profile.role::text));
    claims := jsonb_set(claims, '{app_metadata,org_slug}', to_jsonb(profile.slug));
  end if;

  return jsonb_set(event, '{claims}', claims);
end;
$$;

grant usage on schema public to supabase_auth_admin;
grant execute on function public.custom_access_token_hook to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook from authenticated, anon, public;
grant select on public.users, public.organizations to supabase_auth_admin;

-- ─── Row-Level Security ─────────────────────────────────────────────────
alter table public.organizations   enable row level security;
alter table public.users           enable row level security;
alter table public.product_access  enable row level security;
alter table public.audit_log       enable row level security;
alter table public.support_tickets enable row level security;
alter table public.demo_requests   enable row level security;

alter table public.organizations   force row level security;
alter table public.users           force row level security;
alter table public.product_access  force row level security;
alter table public.audit_log       force row level security;
alter table public.support_tickets force row level security;
alter table public.demo_requests   force row level security;

-- Organizations: members read their own org; admins update limited settings.
create policy org_select on public.organizations
  for select to authenticated using (id = public.jwt_org_id());
create policy org_admin_update on public.organizations
  for update to authenticated using (id = public.jwt_org_id() and public.is_org_admin())
  with check (id = public.jwt_org_id());
-- Plan and entitlements are changed only via the service role.
revoke update on public.organizations from authenticated;
grant update (name, sso_domains, session_timeout_minutes) on public.organizations to authenticated;

-- Users (spec §4.3 org_isolation policy).
create policy users_select_same_org on public.users
  for select to authenticated using (org_id = public.jwt_org_id());
create policy users_update_self on public.users
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid() and org_id = public.jwt_org_id());
create policy users_admin_update on public.users
  for update to authenticated using (org_id = public.jwt_org_id() and public.is_org_admin())
  with check (org_id = public.jwt_org_id());
-- Users may edit only their profile fields; role/is_active changes need an admin
-- (policy above) and org moves are impossible from the client.
revoke update on public.users from authenticated;
grant update (full_name, language_pref, role, is_active) on public.users to authenticated;

create or replace function public.prevent_self_privilege_change() returns trigger
language plpgsql as $$
begin
  if auth.uid() = new.id and not public.is_org_admin()
     and (new.role is distinct from old.role or new.is_active is distinct from old.is_active) then
    raise exception 'insufficient_privilege';
  end if;
  if new.role = 'super_admin' and old.role is distinct from 'super_admin' and auth.role() <> 'service_role' then
    raise exception 'insufficient_privilege';
  end if;
  return new;
end;
$$;
create trigger users_privilege_guard before update on public.users
  for each row execute function public.prevent_self_privilege_change();

-- Product access: users see their own grants; admins see and manage the org's.
create policy access_select on public.product_access
  for select to authenticated
  using (org_id = public.jwt_org_id() and (user_id = auth.uid() or public.is_org_admin()));
create policy access_admin_write on public.product_access
  for all to authenticated
  using (org_id = public.jwt_org_id() and public.is_org_admin())
  with check (org_id = public.jwt_org_id() and public.is_org_admin());

-- Audit log: append-only from the server; admins read their org, users read their own.
create policy audit_select on public.audit_log
  for select to authenticated
  using (org_id = public.jwt_org_id() and (user_id = auth.uid() or public.is_org_admin()));
revoke insert, update, delete on public.audit_log from authenticated, anon;

-- Support tickets: create for self within own org; read own (admins: whole org).
create policy tickets_insert on public.support_tickets
  for insert to authenticated with check (org_id = public.jwt_org_id() and user_id = auth.uid());
create policy tickets_select on public.support_tickets
  for select to authenticated
  using (org_id = public.jwt_org_id() and (user_id = auth.uid() or public.is_org_admin()));

-- Demo requests: no client access at all (service role only).
revoke all on public.demo_requests from anon, authenticated;

-- ─── Retention (spec §5.4: audit log retained 2 years) ─────────────────
-- Schedule with pg_cron:  select cron.schedule('audit-retention', '0 3 * * *', 'select public.purge_expired_audit_log()');
create or replace function public.purge_expired_audit_log() returns void
language sql security definer set search_path = public as $$
  delete from public.audit_log where created_at < now() - interval '2 years';
$$;
revoke execute on function public.purge_expired_audit_log from public, anon, authenticated;
