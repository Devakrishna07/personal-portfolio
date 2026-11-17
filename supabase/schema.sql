-- ===================================================================
-- Supabase Complete Setup Script: Storage Bucket, Policies & Tables
-- Copy and run this in your Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New query -> Paste & Run
-- ===================================================================

-- ===================================================================
-- 1. Create Supabase S3 Storage Bucket: 'portfolio-assets'
-- ===================================================================
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

-- Storage Policies for 'portfolio-assets'
drop policy if exists "Public Access to portfolio-assets" on storage.objects;
create policy "Public Access to portfolio-assets"
  on storage.objects for select
  using (bucket_id = 'portfolio-assets');

drop policy if exists "Authenticated upload to portfolio-assets" on storage.objects;
create policy "Authenticated upload to portfolio-assets"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio-assets');

drop policy if exists "Authenticated update to portfolio-assets" on storage.objects;
create policy "Authenticated update to portfolio-assets"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio-assets');


-- ===================================================================
-- 2. Create Public Profiles Table linked to auth.users
-- ===================================================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text default 'Deva Prasad NR',
  role text default 'admin' check (role in ('admin', 'editor')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

drop policy if exists "Allow authenticated users to read profiles" on public.profiles;
create policy "Allow authenticated users to read profiles"
  on public.profiles for select
  to authenticated
  using (true);

drop policy if exists "Allow users to update own profile" on public.profiles;
create policy "Allow users to update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- Trigger for automatically adding newly registered users to public.profiles
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, 'Deva Prasad NR', 'admin')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ===================================================================
-- 3. Dynamic Portfolio Content Table with Alignment & Positioning
-- ===================================================================
create table if not exists public.portfolio_content (
  id text primary key default 'main',
  hero_name text default 'Deva Prasad NR',
  hero_roles text[] default array['Developer', 'Creator', 'DevOps Engineer'],
  hero_image text default '/deva-mood.png',
  hero_image_fit text default 'contain',
  hero_image_position text default 'bottom-right',
  hero_image_scale int default 110,
  about_name text default 'Deva Prasad NR',
  about_roles text[] default array['Developer', 'Designer', 'Creator', 'Engineer'],
  about_image text default '/aboutme_image.png',
  about_image_fit text default 'cover',
  about_image_position text default 'top',
  about_location text default 'Karnataka, India',
  about_role_title text default 'Full Stack & Creative Dev',
  about_email text default 'devaprasadnr@gmail.com',
  about_linkedin text default 'https://linkedin.com/in/devaprasad',
  about_github text default 'https://github.com/devaprasad',
  about_bio text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure alignment columns exist if table was already created earlier
alter table public.portfolio_content add column if not exists hero_image_fit text default 'contain';
alter table public.portfolio_content add column if not exists hero_image_position text default 'bottom-right';
alter table public.portfolio_content add column if not exists hero_image_scale int default 110;
alter table public.portfolio_content add column if not exists about_image_fit text default 'cover';
alter table public.portfolio_content add column if not exists about_image_position text default 'top';

alter table public.portfolio_content enable row level security;

drop policy if exists "Public read portfolio_content" on public.portfolio_content;
create policy "Public read portfolio_content"
  on public.portfolio_content for select
  using (true);

drop policy if exists "Admin update portfolio_content" on public.portfolio_content;
create policy "Admin update portfolio_content"
  on public.portfolio_content for update
  to authenticated
  using (true);

drop policy if exists "Admin insert portfolio_content" on public.portfolio_content;
create policy "Admin insert portfolio_content"
  on public.portfolio_content for insert
  to authenticated
  with check (true);

-- Insert initial default row if empty
insert into public.portfolio_content (
  id,
  hero_name,
  hero_roles,
  hero_image,
  hero_image_fit,
  hero_image_position,
  hero_image_scale,
  about_name,
  about_roles,
  about_image,
  about_image_fit,
  about_image_position,
  about_location,
  about_role_title,
  about_email,
  about_linkedin,
  about_github
) values (
  'main',
  'Deva Prasad NR',
  array['Developer', 'Creator', 'DevOps Engineer'],
  '/deva-mood.png',
  'contain',
  'bottom-right',
  110,
  'Deva Prasad NR',
  array['Developer', 'Designer', 'Creator', 'Engineer'],
  '/aboutme_image.png',
  'cover',
  'top',
  'Karnataka, India',
  'Full Stack & Creative Dev',
  'devaprasadnr@gmail.com',
  'https://linkedin.com/in/devaprasad',
  'https://github.com/devaprasad'
) on conflict (id) do nothing;
