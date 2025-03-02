# Airtable Setup Guide

## Fixing the "NOT_AUTHORIZED" Error

The error you're seeing is because your personal access token doesn't have the right permissions to access your Airtable base. Here's how to fix it:

## Step 1: Create a New Personal Access Token

1. Go to [Airtable Developer Hub](https://airtable.com/create/tokens)
2. Click on the blue "+ Create new token" button

## Step 2: Configure Your Token

1. **Name your token** - Something like "ApartmentDeals App"

2. **Select the required scopes**:

   - `data.records:read` - To read records from your base
   - `schema.bases:read` - To read the schema of your base
   - `data.recordComments:read` - (Optional) If you want to read comments

3. **Add your base as a resource**:

   - Click "Add a resource"
   - Select "Choose bases and tables"
   - Find and select your base (ID: app0SGVfSobD7tqcN)
   - Click "Add base"

4. **Create the token**:
   - Click "Create token"
   - You'll see your new token - **COPY IT IMMEDIATELY** as you won't be able to see it again

## Step 3: Update Your .env.local File

Replace your current token in the `.env.local` file:

```
AIRTABLE_API_KEY=your_new_token_here
AIRTABLE_BASE_ID=app0SGVfSobD7tqcN
AIRTABLE_TABLE_NAME=ApartmentDeals
```

## Step 4: Test Your Connection

Run the test script to verify your connection:

```bash
node scripts/test-airtable.js
```

If successful, you should see information about your records instead of the authorization error.

## Step 5: Restart Your Development Server

After updating your token, restart your Next.js development server:

```bash
npm run dev
```

## Common Issues

1. **Wrong scopes**: Make sure you've selected at least `data.records:read` and `schema.bases:read`
2. **Resource not added**: Ensure you've added your specific base as a resource
3. **Token copied incorrectly**: Double-check that you've copied the entire token correctly

## Need More Help?

- [Airtable API Documentation](https://airtable.com/developers/web/api/introduction)
- [Personal Access Tokens Guide](https://support.airtable.com/docs/creating-personal-access-tokens)
