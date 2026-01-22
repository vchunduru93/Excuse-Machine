# Deployment Guide

Adding test comment

This guide walks you through deploying The Excuse Machine to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier, no credit card required)
- Neon account (free tier available)

## Step-by-Step Deployment

### 1. Initialize Git Repository

```bash
cd excuse-machine
git init
git add .
git commit -m "Initial commit: Excuse Machine MVP"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. **Important**: Create it on your personal account, NOT the Clever workspace
3. Do not initialize with README, .gitignore, or license (we already have these)
4. Copy the repository URL

### 3. Push to GitHub

```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

### 4. Set Up Neon Database

#### Option A: Through Vercel (Recommended)

1. Go to [Vercel](https://vercel.com) and sign in
2. Create a new project and connect your GitHub repository
3. In the project settings, go to the **Storage** tab
4. Click **Create Database** and select **Neon Postgres**
5. Choose a name for your database
6. Vercel will automatically create the database and set the `DATABASE_URL` environment variable

#### Option B: Direct Setup

1. Go to [Neon](https://neon.tech) and create an account
2. Create a new project
3. Copy the connection string (use the pooled connection for serverless)
4. You'll add this to Vercel in the next step

### 5. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click **Add New Project**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `excuse-machine` (if your repo contains the project folder)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

5. **Add Environment Variables**:
   - If you set up Neon through Vercel, `DATABASE_URL` should already be set
   - If you set up Neon directly, add `DATABASE_URL` with your connection string

6. Click **Deploy**

### 6. Run Database Migrations

After the first deployment:

1. Go to your Vercel project dashboard
2. Open the deployment logs to check if migrations ran automatically
3. If migrations didn't run automatically, you can:
   - Use Vercel's CLI: `vercel env pull` then `npx prisma migrate deploy`
   - Or add a build script that runs migrations (see below)

### 7. Verify Deployment

1. Visit your deployment URL (e.g., `https://your-project.vercel.app`)
2. Test submitting an excuse
3. Test upvoting an excuse
4. Verify excuses are sorted by vote count

## Troubleshooting

### Prisma Migrations Not Running

Add this to your `package.json`:

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

### Database Connection Issues

- Ensure you're using the **pooled connection string** from Neon (not the direct connection)
- Check that `DATABASE_URL` is set in Vercel environment variables
- Verify the connection string includes SSL parameters: `?sslmode=require`

### Build Failures

- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation passes locally: `npm run build`

### Module Not Found Errors

- Run `npm install` locally to verify all dependencies install correctly
- Check that imports use correct paths (Next.js App Router conventions)

## Next Steps

Once deployed, you can:
- Share the URL with others
- Add custom domain (Vercel Pro feature)
- Monitor usage in Vercel dashboard
- Set up CI/CD for automatic deployments on push

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created and connected to GitHub
- [ ] Neon database created and connected
- [ ] `DATABASE_URL` environment variable set in Vercel
- [ ] First deployment successful
- [ ] Database migrations run successfully
- [ ] App accessible at public URL
- [ ] Can submit excuses
- [ ] Can upvote excuses
- [ ] Excuses sorted correctly by votes
