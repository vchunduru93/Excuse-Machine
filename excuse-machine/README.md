# The Excuse Machine

A Next.js web application where users can submit creative excuses for late assignments and vote on their favorites.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL via Neon
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

1. Create a Neon PostgreSQL database (you can do this through Vercel's Storage tab or directly at [neon.tech](https://neon.tech))
2. Copy the connection string
3. Create a `.env` file in the root directory:

```env
DATABASE_URL="your-neon-connection-string-here"
```

**Important**: Use the pooled connection string for serverless environments (it should include `?pgbouncer=true` or similar pooling parameters).

### 3. Run Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the `DATABASE_URL` environment variable in Vercel dashboard
4. Vercel will automatically build and deploy

### Running Migrations on Production

Vercel should automatically run migrations during build. If needed, you can run:

```bash
npx prisma migrate deploy
```

## Project Structure

```
excuse-machine/
├── app/
│   ├── api/
│   │   └── excuses/
│   │       ├── route.ts          # GET and POST /api/excuses
│   │       └── [id]/
│   │           └── upvote/
│   │               └── route.ts  # POST /api/excuses/[id]/upvote
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page
│   └── globals.css               # Global styles
├── components/
│   ├── ExcuseForm.tsx            # Form for submitting excuses
│   └── ExcuseList.tsx            # List of excuses with upvote
├── lib/
│   └── prisma.ts                 # Prisma Client singleton
├── prisma/
│   └── schema.prisma               # Database schema
└── package.json
```

## Features

- Submit creative excuses
- Upvote your favorite excuses
- Excuses sorted by vote count (highest first)
- Responsive design with Tailwind CSS

## Success Criteria

- [x] App structure created
- [x] Database schema defined
- [x] API endpoints implemented
- [x] UI components created
- [x] Styling added
- [ ] Database connection configured (requires user setup)
- [ ] Migrations run (requires database setup)
- [ ] Local testing (requires database setup)
- [ ] Deployment to Vercel (requires user action)
