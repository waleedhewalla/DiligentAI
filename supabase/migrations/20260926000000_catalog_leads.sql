-- Leads are now captured by service model (consult / build / integrate) and
-- catalog area (offering or capability slug) instead of a fixed product list.
alter table public.demo_requests
  add column interest text not null default 'unsure'
    check (interest in ('consult', 'build', 'integrate', 'unsure')),
  add column area text check (area is null or area ~ '^[a-z0-9-]{1,80}$');

-- Legacy column kept for historical rows; no longer written.
alter table public.demo_requests alter column product drop not null;

create index demo_requests_interest_idx on public.demo_requests (interest, created_at desc);
