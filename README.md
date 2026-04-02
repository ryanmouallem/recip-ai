# RecipAI

**Live: [https://recipai-ruby.vercel.app](https://recipai-ruby.vercel.app)**

A web app that generates recipes from ingredients you have on hand, powered by the Gemini API.

## Screenshots

**Recipe generator**
<img width="2546" height="1289" alt="Screenshot 2026-04-02 at 1 53 55 PM" src="https://github.com/user-attachments/assets/46960724-3245-4497-8e62-a93999db6117" />

**Recipe book**
<img width="2546" height="1289" alt="Screenshot 2026-04-02 at 1 54 34 PM" src="https://github.com/user-attachments/assets/ff781359-ec7d-4b8e-9b7e-b53632b3a3ce" />

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

