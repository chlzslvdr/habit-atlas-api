-- USERS TABLE (linked to auth.users)
create table if not exists public.users (
  id uuid primary key references auth.users(id),
  username text
);

-- HABITS TABLE
create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  frequency text not null,
  completed_dates text[]
);

-- FUNCTION: Auto-insert new auth.users into public.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- TRIGGER: After user signs up
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
