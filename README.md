# RecipAI

**Live: [https://recipai-ruby.vercel.app](https://recipai-ruby.vercel.app)**

A web app that generates recipes from ingredients you have on hand, powered by the Gemini API.

## Screenshots

![Generate recipes](screenshots/Screenshot%202026-04-01%20at%205.36.45%20PM.png)
![Recipe book](screenshots/Screenshot%202026-04-01%20at%205.37.37%20PM.png)

## What it does

- Enter ingredients you have available
- Get AI-generated recipes based on those ingredients
- Sign in with Google to save recipes to your account
- View saved recipes on a dedicated page

## Tech stack

- **Framework**: Next.js 16 (App Router)
- **Auth**: NextAuth.js with Google OAuth
- **AI**: Google Gemini API
- **Database**: Neon (Postgres) — stores users and saved recipes
- **Deployment**: Vercel

## Running locally

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file with the following variables:

```
DATABASE_URL=
GEMINI_API_KEY=
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

