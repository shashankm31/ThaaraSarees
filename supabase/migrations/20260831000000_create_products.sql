create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  product_code text not null unique,
  name text not null,
  price numeric null check (price is null or price >= 0),
  category text not null,
  description text null,
  image text not null,
  available boolean not null default true,
  featured boolean not null default false,
  new_arrival boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

revoke all on table public.products from anon, authenticated;
grant select on table public.products to anon, authenticated;

create policy "Public can read available products"
on public.products
for select
to anon, authenticated
using (available = true);

insert into public.products (
  product_code, name, price, category, description, image, available, featured, new_arrival, created_at
)
values
  ('SAR001', 'Thaara Saree 001', null, 'Traditional', '', '/images/sarees/saree-001.jpg', true, false, true, '2026-08-29T00:00:00Z'),
  ('SAR002', 'Thaara Saree 002', null, 'Traditional', '', '/images/sarees/saree-002.jpg', true, false, true, '2026-08-29T00:00:00Z'),
  ('SAR003', 'Thaara Saree 003', null, 'Traditional', '', '/images/sarees/saree-003.jpg', true, false, true, '2026-08-29T00:00:00Z'),
  ('SAR004', 'Thaara Saree 004', null, 'Traditional', '', '/images/sarees/saree-004.jpg', true, false, true, '2026-08-29T00:00:00Z'),
  ('SAR005', 'Thaara Saree 005', null, 'Traditional', '', '/images/sarees/saree-005.jpg', true, false, true, '2026-08-29T00:00:00Z'),
  ('SAR006', 'Thaara Saree 006', null, 'Traditional', '', '/images/sarees/saree-006.jpg', true, false, true, '2026-08-29T00:00:00Z'),
  ('SAR007', 'Thaara Saree 007', null, 'Traditional', '', '/images/sarees/saree-007.jpg', true, false, true, '2026-08-29T00:00:00Z'),
  ('SAR008', 'Thaara Saree 008', null, 'Traditional', '', '/images/sarees/saree-008.jpg', true, false, true, '2026-08-29T00:00:00Z'),
  ('SAR009', 'Thaara Saree 009', null, 'Traditional', '', '/images/sarees/saree-009.jpg', true, false, true, '2026-08-29T00:00:00Z'),
  ('SAR010', 'Thaara Saree 010', null, 'Traditional', '', '/images/sarees/saree-010.jpg', true, false, true, '2026-08-29T00:00:00Z'),
  ('SAR011', 'Thaara Saree 011', null, 'Traditional', '', '/images/sarees/saree-011.jpg', true, false, true, '2026-08-29T00:00:00Z'),
  ('SAR012', 'Thaara Saree 012', null, 'Traditional', '', '/images/sarees/saree-012.jpg', true, false, true, '2026-08-29T00:00:00Z')
on conflict (product_code) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  description = excluded.description,
  image = excluded.image,
  available = excluded.available,
  featured = excluded.featured,
  new_arrival = excluded.new_arrival,
  created_at = excluded.created_at;
