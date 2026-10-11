-- Private bucket for future admin-managed saree images.
-- No storage.objects policies are created here: customers cannot upload, update,
-- or delete files, and read access remains private until the authenticated admin
-- workflow defines the appropriate access model.
insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'saree-images',
  'saree-images',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Deliberately no policy is added to storage.objects.
-- After admin authentication/authorization is implemented, add narrowly scoped
-- admin-only INSERT, UPDATE, and DELETE policies. Choose the customer-read
-- approach then (for example, signed URLs from a trusted server or a scoped SELECT policy).
