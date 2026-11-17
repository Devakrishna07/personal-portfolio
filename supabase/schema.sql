-- ===================================================================
-- Supabase Schema: Admin Profiles & CMS Tables
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ===================================================================

-- 1. Create Public Profiles Table linked to auth.users
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text default 'Deva Prasad NR',
  role text default 'admin' check (role in ('admin', 'editor')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 3. RLS Policies
create policy "Allow authenticated users to read profiles"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Allow users to update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- 4. Trigger to automatically create a profile entry when a user is registered
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, 'Deva Prasad NR', 'admin')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if it already exists then re-create
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
