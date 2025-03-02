# Deploying Apartment Deals to Vercel

This guide provides step-by-step instructions for deploying the Apartment Deals application to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier is sufficient)
- Your Airtable credentials:
  - API Key
  - Base ID
  - Table Name

## Deployment Options

### Option 1: Using the Deployment Script (Easiest)

1. Make sure you have the Vercel CLI installed:

   ```
   npm install -g vercel
   ```

2. Login to Vercel:

   ```
   vercel login
   ```

3. Run the deployment script:

   ```
   npm run deploy
   ```

4. Follow the prompts to set up your project.

5. When asked about environment variables, provide your Airtable credentials:
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`
   - `AIRTABLE_TABLE_NAME`

### Option 2: Manual Deployment via Vercel Dashboard

1. Push your code to a GitHub repository.

2. Go to the [Vercel Dashboard](https://vercel.com/dashboard).

3. Click "New Project".

4. Import your GitHub repository.

5. Configure the project:

   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next

6. Add your environment variables:

   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`
   - `AIRTABLE_TABLE_NAME`

7. Click "Deploy".

## Verifying Your Deployment

1. Once deployed, Vercel will provide you with a URL for your application.

2. Visit the URL to ensure your application is working correctly.

3. Check the Vercel logs if you encounter any issues.

## Updating Your Deployment

When you make changes to your application:

1. Push your changes to your GitHub repository.

2. Vercel will automatically redeploy your application.

3. Alternatively, you can run `npm run deploy` again to manually trigger a deployment.

## Troubleshooting

If your application is not working correctly after deployment:

1. Check the Vercel logs for any errors.

2. Verify that your environment variables are set correctly.

3. Ensure your Airtable API key has the necessary permissions.

4. Check that your Airtable base and table exist and are accessible.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Airtable API Documentation](https://airtable.com/developers/web/api/introduction)
