# Apartment Deals

A Next.js application that displays apartment deals from an Airtable database.

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file with your Airtable credentials:
   ```
   AIRTABLE_API_KEY=your_airtable_api_key
   AIRTABLE_BASE_ID=your_airtable_base_id
   AIRTABLE_TABLE_NAME=your_airtable_table_name
   ```
4. Run the development server:
   ```
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deploying to Vercel

### Option 1: Deploy with Vercel CLI (Recommended)

1. Install the Vercel CLI:

   ```
   npm install -g vercel
   ```

2. Login to Vercel:

   ```
   vercel login
   ```

3. Deploy the project:

   ```
   vercel
   ```

4. Follow the prompts to set up your project. When asked about environment variables, you'll need to provide your Airtable credentials.

### Option 2: Deploy via Vercel Dashboard

1. Push your code to a GitHub repository

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "New Project"

4. Import your GitHub repository

5. Configure the project:

   - Framework Preset: Next.js
   - Environment Variables: Add your Airtable credentials
     - `AIRTABLE_API_KEY`
     - `AIRTABLE_BASE_ID`
     - `AIRTABLE_TABLE_NAME`

6. Click "Deploy"

## Important Notes for Deployment

- Make sure to set up your environment variables in the Vercel dashboard
- The free tier of Vercel is sufficient for this application
- Your Airtable API key should be kept secret and only added through environment variables
- The application will automatically connect to your Airtable database once deployed with the correct environment variables
