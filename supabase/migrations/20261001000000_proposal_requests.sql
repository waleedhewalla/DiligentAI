-- Custom-proposal requests share the demo_requests table with plant-review
-- bookings. request_type tells them apart; requirements holds the visitor's
-- own description of what they want to achieve (plain text, bounded).
alter table public.demo_requests
  add column if not exists request_type text not null default 'review'
    check (request_type in ('review', 'proposal')),
  add column if not exists requirements text
    check (requirements is null or char_length(requirements) <= 2000);

create index if not exists demo_requests_type_created_idx
  on public.demo_requests (request_type, created_at desc);
