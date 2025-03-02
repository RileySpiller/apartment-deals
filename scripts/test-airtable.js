// Test script to verify Airtable connection
require("dotenv").config({ path: ".env.local" });
const Airtable = require("airtable");

// Log environment variables (hiding the full API key)
console.log("Environment variables:");
console.log(
  "AIRTABLE_API_KEY:",
  process.env.AIRTABLE_API_KEY
    ? `${process.env.AIRTABLE_API_KEY.substring(0, 10)}...`
    : "Not set"
);
console.log("AIRTABLE_BASE_ID:", process.env.AIRTABLE_BASE_ID);
console.log("AIRTABLE_TABLE_NAME:", process.env.AIRTABLE_TABLE_NAME);

// Configure Airtable
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

// Test connection
async function testConnection() {
  try {
    console.log(
      `\nAttempting to fetch records from table: ${process.env.AIRTABLE_TABLE_NAME}`
    );

    const records = await base(process.env.AIRTABLE_TABLE_NAME)
      .select({
        maxRecords: 5,
        view: "Grid view",
      })
      .firstPage();

    console.log(`\n✅ Connection successful! Found ${records.length} records.`);

    if (records.length > 0) {
      console.log("\nSample record fields:");
      const fields = records[0].fields;
      console.log(JSON.stringify(fields, null, 2));
    }
  } catch (error) {
    console.error("\n❌ Connection failed:");
    console.error(error);

    if (error.statusCode === 403) {
      console.log("\n🔑 Permission issue detected. Please check:");
      console.log(
        "1. Your personal access token has the correct scopes (data.records:read, schema.bases:read)"
      );
      console.log("2. Your token has access to this specific base");
      console.log(
        "3. Create a new token at: https://airtable.com/create/tokens"
      );
    }
  }
}

testConnection();
