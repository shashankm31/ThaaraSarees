# Thaara Sarees

Static React + Vite catalogue backed by Supabase. Customers browse available sarees and enquire through WhatsApp; catalogue management is restricted to authenticated users in `admin_users`.

## Local development

`npm install`
`npm run dev`

Copy `.env.example` to `.env` and provide only:

`VITE_SUPABASE_URL`
`VITE_SUPABASE_PUBLISHABLE_KEY`

Never add a service-role key, database password, or other private credential to Vite environment variables.

## Production build

`npm run build`

The build output directory is `dist/`.

## Deployment

The included `vercel.json` provides SPA fallback routing for Vercel so direct visits to customer and admin routes serve `index.html`. For another static host, configure an equivalent rewrite of unknown routes to `/index.html`.

Configure the same two Vite environment variables in the hosting provider. Do not commit `.env`.

After the final public URL is known, set it in Supabase Authentication → URL Configuration as the Site URL and add the deployed origin and any required admin callback paths to Redirect URLs. Keep localhost entries only for local development.

## Production checklist

- Confirm the public site URL and SPA rewrite are configured.
- Confirm Supabase RLS policies, `admin_users`, and the public-read/admin-write `saree-images` bucket policies are active.
- Confirm an authorised admin account can sign in, manage products, and sign out.
- Replace `STORE_CONFIG.whatsappNumber` in `src/config/store.js` with the real business number.
- Review product data and images, including removing any temporary test product through the admin UI if desired.
