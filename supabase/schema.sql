-- ===================================================================
-- Supabase Schema: Complete Setup with Projects, Content & Storage
-- Run in Supabase SQL Editor: Dashboard -> SQL Editor -> New Query -> Run
-- ===================================================================

-- 1. Storage Bucket & Policies
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

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

-- 2. Profiles Table
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

-- 3. Dynamic Portfolio Content Table with Focal Crop Coordinates
create table if not exists public.portfolio_content (
  id text primary key default 'main',
  hero_name text default 'Deva Prasad NR',
  hero_roles text[] default array['Developer', 'Creator', 'DevOps Engineer'],
  hero_image text default '/deva-mood.png',
  hero_image_fit text default 'contain',
  hero_image_position text default 'bottom-right',
  hero_image_scale int default 110,
  hero_image_focal_x int default 50,
  hero_image_focal_y int default 100,
  about_name text default 'Deva Prasad NR',
  about_roles text[] default array['Developer', 'Designer', 'Creator', 'Engineer'],
  about_image text default '/aboutme_image.png',
  about_image_fit text default 'cover',
  about_image_position text default 'top',
  about_image_focal_x int default 50,
  about_image_focal_y int default 20,
  about_location text default 'Karnataka, India',
  about_role_title text default 'Full Stack & Creative Dev',
  about_email text default 'devaprasadnr@gmail.com',
  about_linkedin text default 'https://linkedin.com/in/devaprasad',
  about_github text default 'https://github.com/devaprasad',
  about_bio text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

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

insert into public.portfolio_content (
  id,
  hero_name,
  hero_roles,
  hero_image,
  hero_image_fit,
  hero_image_position,
  hero_image_scale,
  hero_image_focal_x,
  hero_image_focal_y,
  about_name,
  about_roles,
  about_image,
  about_image_fit,
  about_image_position,
  about_image_focal_x,
  about_image_focal_y,
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
  50,
  100,
  'Deva Prasad NR',
  array['Developer', 'Designer', 'Creator', 'Engineer'],
  '/aboutme_image.png',
  'cover',
  'top',
  50,
  20,
  'Karnataka, India',
  'Full Stack & Creative Dev',
  'devaprasadnr@gmail.com',
  'https://linkedin.com/in/devaprasad',
  'https://github.com/devaprasad'
) on conflict (id) do nothing;

-- 4. Projects Table & RLS Policies
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_url text default '',
  github_url text,
  live_url text,
  order_index integer not null default 0,
  tags text[] default array[]::text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.projects enable row level security;

drop policy if exists "Public read projects" on public.projects;
create policy "Public read projects"
  on public.projects for select
  using (true);

drop policy if exists "Allow authenticated admin insert projects" on public.projects;
create policy "Allow authenticated admin insert projects"
  on public.projects for insert
  to authenticated
  with check (true);

drop policy if exists "Allow authenticated admin update projects" on public.projects;
create policy "Allow authenticated admin update projects"
  on public.projects for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Allow authenticated admin delete projects" on public.projects;
create policy "Allow authenticated admin delete projects"
  on public.projects for delete
  to authenticated
  using (true);
