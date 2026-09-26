-- Conversion reporting (website assessment, Track 4): the monthly review reads
-- these views in the Supabase SQL editor or any BI tool on the service role.
-- security_invoker keeps demo_requests' RLS in force; public roles get nothing.

-- Leads per ISO week, by channel. "direct" = no campaign tag and no referrer.
create or replace view public.lead_funnel_weekly
with (security_invoker = on) as
select
  date_trunc('week', created_at)::date                                   as week,
  coalesce(utm_source,
           nullif(split_part(split_part(attribution #>> '{first,referrer}', '://', 2), '/', 1), ''),
           'direct')                                                     as channel,
  count(*)                                                               as leads,
  count(*) filter (where is_mql)                                         as mqls,
  round(100.0 * count(*) filter (where is_mql) / nullif(count(*), 0), 1) as mql_rate_pct
from public.demo_requests
group by 1, 2;

-- Which entry point converts: the form/tool (`source`) and the area of interest.
create or replace view public.lead_sources_monthly
with (security_invoker = on) as
select
  date_trunc('month', created_at)::date as month,
  coalesce(source, 'unknown')           as source,
  coalesce(area, 'none')                as area,
  interest,
  count(*)                              as leads,
  count(*) filter (where is_mql)        as mqls
from public.demo_requests
group by 1, 2, 3, 4;

-- Campaign performance (UTM tagged links from the content kit).
create or replace view public.lead_campaigns
with (security_invoker = on) as
select
  coalesce(utm_campaign, '(none)')  as campaign,
  coalesce(utm_source, '(none)')    as source,
  count(*)                          as leads,
  count(*) filter (where is_mql)    as mqls,
  min(created_at)                   as first_lead,
  max(created_at)                   as last_lead
from public.demo_requests
group by 1, 2;

revoke all on public.lead_funnel_weekly, public.lead_sources_monthly, public.lead_campaigns from anon, authenticated;
