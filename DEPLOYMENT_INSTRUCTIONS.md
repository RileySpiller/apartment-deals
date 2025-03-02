# Deployment Instructions for Apartment Deals

## Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" > "Project"
3. Import your GitHub repository or upload your project files
4. Configure the following environment variables:
   - `AIRTABLE_API_KEY`: `patIWWfU7paKNYr5V.c10c92cfc92ad1edf9287fb94b93af49dd6cbb3536be02ad8d1bb444689077ff`
   - `AIRTABLE_BASE_ID`: `app0SGVfSobD7tqcN`
   - `AIRTABLE_TABLE_NAME`: `Austin`
5. Click "Deploy"

## Option 2: Deploy via Vercel CLI

If you're experiencing issues with the CLI deployment, try these steps:

1. Make sure you're logged in to Vercel:

   ```
   vercel login
   ```

2. Try deploying with the `--prod` flag:
   ```
   vercel --prod --env AIRTABLE_API_KEY=patIWWfU7paKNYr5V.c10c92cfc92ad1edf9287fb94b93af49dd6cbb3536be02ad8d1bb444689077ff --env AIRTABLE_BASE_ID=app0SGVfSobD7tqcN --env AIRTABLE_TABLE_NAME=Austin
   ```

## Troubleshooting

If you encounter build errors:

1. Check that your local build works:

   ```
   npm run build
   ```

2. Verify that your environment variables are correctly set in the Vercel dashboard

3. If you're still having issues, try deploying from the Vercel dashboard instead of the CLI

4. For API-related issues, make sure your Airtable credentials are correct and that you're using the correct table name (`Austin`)

## After Deployment

Once deployed, your site will be available at a URL provided by Vercel. You can set up a custom domain in the Vercel dashboard if needed.
