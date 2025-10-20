# Habit Atlas – Backend API

Habit Atlas is a backend-only GraphQL API built with Node.js, TypeScript, and Supabase. It lets users create, track, and complete personal habits with optional social sharing and analytics (future features).

## Features

- User auth (via Supabase)
- Habit creation and tracking
- Mark habits as completed
- Completed habit history (streak logic ready)
- GraphQL API with typed schema
- Supabase CLI for database migrations
- Deployable to Render

## Tech Stack

| Tool        | Usage                           |
|-------------|----------------------------------|
| Node.js     | Runtime                          |
| TypeScript  | Language                         |
| GraphQL     | API query layer (Apollo Server)  |
| Supabase    | PostgreSQL DB + Auth             |
| Supabase CLI| Local dev + DB migrations        |
| dotenv      | Environment variable handling    |


## Getting Started

### 1. Clone the repo

```bash
git clone git@github.com:chlzslvdr/habit-atlas-api.git
cd habit-atlas-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a .env file:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
TEST_EMAIL=test-email
TEST_PASSWORD=test-password
```

### 4. Run the development server

```bash
npm run dev
```
GraphQL Playground:
http://localhost:4000

## GraphQL Usage

###  Generate test Access Token
```bash
ts-node tools/dev-login.ts
```

###  Example Queries

```graphql
query {
  habits {
    id
    name
    completedDates
  }
}
```

###  Example Mutations

```graphql
mutation {
  createHabit(name: "Workout", frequency: "Daily") {
    id
    name
  }
}

mutation {
  markHabitComplete(habitId: "019831e2-fef6-73bb-a6af-4560174d4d84", date: "2025-07-22") {
    id
    completedDates
  }
}
```

## Running Migrations

###  1. Install Supabase CLI
```bash
npm i -g supabase
```

###  2. Initialize (if not already)
```bash
supabase init
```

###  3. Create a migration
```bash
supabase migration new init-schema
```

###  4. Apply to local dev DB
```bash
supabase start         # starts local database
supabase db reset      # runs migrations
```

###  5. Push to Supabase cloud
```bash
supabase link --project-ref your-project-ref
supabase db push
```
