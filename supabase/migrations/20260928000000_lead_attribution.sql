-- Lead attribution (website assessment, Track 1 #11): every demo request
-- carries its first/last touch (UTM, referrer, landing page) and the pages
-- viewed before converting. Bounded by the API schema (lib/validation.ts).
alter table public.demo_requests
  add column attribution jsonb,
  add column utm_source text check (utm_source is null or char_length(utm_source) <= 120),
  add column utm_campaign text check (utm_campaign is null or char_length(utm_campaign) <= 120);

create index demo_requests_utm_idx on public.demo_requests (utm_source, utm_campaign, created_at desc);
