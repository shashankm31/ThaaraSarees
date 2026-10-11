-- Only user IDs explicitly added to this table can manage catalogue data.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
revoke all on table public.admin_users from anon, authenticated;
grant select on table public.admin_users to authenticated;

create policy "Users can read their own admin allowlist entry"
on public.admin_users for select to authenticated
using (user_id = auth.uid());

grant insert, update, delete on table public.products to authenticated;

create policy "Admins can read all products"
on public.products for select to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid()));

create policy "Admins can insert products"
on public.products for insert to authenticated
with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

create policy "Admins can update products"
on public.products for update to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid()))
with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

create policy "Admins can delete products"
on public.products for delete to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid()));

-- Keep the existing bucket and make the source-of-truth migration match its public catalogue use.
update storage.buckets set public = true where id = 'saree-images';

create policy "Admins can upload saree images"
on storage.objects for insert to authenticated
with check (bucket_id = 'saree-images' and exists (select 1 from public.admin_users where user_id = auth.uid()));

create policy "Admins can update saree images"
on storage.objects for update to authenticated
using (bucket_id = 'saree-images' and exists (select 1 from public.admin_users where user_id = auth.uid()))
with check (bucket_id = 'saree-images' and exists (select 1 from public.admin_users where user_id = auth.uid()));

create policy "Admins can delete saree images"
on storage.objects for delete to authenticated
using (bucket_id = 'saree-images' and exists (select 1 from public.admin_users where user_id = auth.uid()));
