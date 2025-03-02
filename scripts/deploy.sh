#!/bin/bash

# Ensure the script exits on any error
set -e

echo "🚀 Preparing to deploy to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build the project
echo "📦 Building project..."
npm run build

# Load environment variables from .env.local
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

# Deploy to Vercel with environment variables
vercel --env AIRTABLE_API_KEY=$AIRTABLE_API_KEY \
       --env AIRTABLE_BASE_ID=$AIRTABLE_BASE_ID \
       --env AIRTABLE_TABLE_NAME=$AIRTABLE_TABLE_NAME \
       "$@"

echo "Deployment complete. If you want to deploy to production, add --prod to the command."

echo "✅ Deployment complete!"
echo "Note: Make sure your environment variables are set in the Vercel dashboard:"
echo "- AIRTABLE_API_KEY"
echo "- AIRTABLE_BASE_ID"
echo "- AIRTABLE_TABLE_NAME" 