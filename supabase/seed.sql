-- Example seed: the Star Trans tenant and its first admin.
-- 1) Invite the admin first (Dashboard → Authentication → Users → Invite, or
--    supabase.auth.admin.inviteUserByEmail) so the auth.users row exists.
-- 2) Replace the email below and run this in the SQL editor.

insert into public.organizations (name, slug, plan, ipe_enabled, ceo_enabled, nexus_enabled, sso_domains)
values ('Star Trans', 'star-trans', 'enterprise', true, true, true, array['startrans.com'])
on conflict (slug) do nothing;

insert into public.users (id, org_id, email, full_name, role, language_pref)
select au.id, o.id, au.email, null, 'admin', 'ar'
  from auth.users au, public.organizations o
 where au.email = 'it-admin@startrans.com'   -- ← replace
   and o.slug = 'star-trans'
on conflict (id) do nothing;

insert into public.product_access (user_id, org_id, product, access_level)
select u.id, u.org_id, p.product, 'full'
  from public.users u
 cross join (values ('ipe'::public.product_key), ('ceo_os'), ('nexus')) as p(product)
 where u.email = 'it-admin@startrans.com'     -- ← replace
on conflict (user_id, product) do nothing;
