-- Partner programme applications (/partners). Written by the server only.
create table public.partner_applications (
  id         uuid primary key default gen_random_uuid(),
  company    text not null,
  name       text not null,
  email      text not null,
  track      text not null check (track in ('erp', 'automation', 'cloud', 'hardware')),
  country    text not null check (country in ('eg', 'sa', 'ae', 'other')),
  message    text,
  language   public.language_pref not null default 'ar',
  status     text not null default 'new' check (status in ('new', 'contacted', 'signed', 'declined')),
  ip_address inet,
  created_at timestamptz not null default now()
);
create index partner_applications_created_idx on public.partner_applications (created_at desc);

alter table public.partner_applications enable row level security;
alter table public.partner_applications force row level security;
revoke all on public.partner_applications from anon, authenticated;
