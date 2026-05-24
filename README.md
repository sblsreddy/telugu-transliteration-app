# Telugu Transliteration App

A production-ready web application for English-to-Telugu transliteration, built with Next.js, TypeScript, Tailwind CSS, Prisma, and PostgreSQL.

## Features

- English to Telugu transliteration UI
- Mobile-responsive design with Tailwind CSS
- Admin dashboard for translation history
- PostgreSQL storage through Prisma ORM
- GitHub Actions CI workflow
- Vercel-ready deployment setup
- Unit tests with Jest and React Testing Library

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your database provider and connection string. For local development, the app can use SQLite as shown in `.env.example`.

4. Generate Prisma client:

   ```bash
   npm run prisma:generate
   ```

5. Run Prisma migration locally:

   ```bash
   npm run prisma:migrate
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

## Environment

The app expects the following environment variables:

- `DATABASE_URL` - PostgreSQL connection string (or SQLite URL for local development)
- `ADMIN_SECRET` - secret used for the admin history dashboard

If `DATABASE_URL` is not configured, the app will use a local in-memory history fallback for sandbox development only. For production, configure a PostgreSQL database.

## Testing

Run unit tests with:

```bash
npm test
```

## GitHub Actions

A CI workflow is configured in `.github/workflows/ci.yml` to install dependencies, generate Prisma client files, lint, build, and run tests on push and pull request.

## Deployment

This project is ready for Vercel deployment. Connect your GitHub repository to Vercel, configure `DATABASE_URL` and `ADMIN_SECRET` in Vercel environment variables, then deploy from the `main` branch.

## Environments

- `development` branch: sandbox/dev work and feature testing.
- `main` branch: production deployment only after validation.
- Use `.env` locally and separate Vercel environment variables for staging/production.
