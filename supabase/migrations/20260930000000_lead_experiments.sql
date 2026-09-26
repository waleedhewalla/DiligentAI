-- A/B test results (website assessment, Track 5). Each demo request stores the
-- test versions its visitor saw in attribution->'experiments'. Compare leads and
-- MQLs per version here; visitors per version come from GA4 (experiment_impression).
create or replace view public.lead_experiments
with (security_invoker = on) as
select
  e.key                           as experiment,
  e.value                         as variant,
  count(*)                        as leads,
  count(*) filter (where r.is_mql) as mqls,
  min(r.created_at)               as first_lead,
  max(r.created_at)               as last_lead
from public.demo_requests r
cross join lateral jsonb_each_text(coalesce(r.attribution -> 'experiments', '{}'::jsonb)) as e(key, value)
group by 1, 2;

revoke all on public.lead_experiments from anon, authenticated;
