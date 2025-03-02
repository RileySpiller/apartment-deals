// Test script with direct values
const Airtable = require("airtable");

// Hardcoded values for testing
const API_KEY =
  "patIWWfU7paKNYr5V.c10c92cfc92ad1edf9287fb94b93af49dd6cbb3536be02ad8d1bb444689077ff";
const BASE_ID = "app0SGVfSobD7tqcN";
const TABLE_NAME = "ApartmentDeals";

console.log("Using direct values:");
console.log("API_KEY:", API_KEY ? `${API_KEY.substring(0, 10)}...` : "Not set");
console.log("BASE_ID:", BASE_ID);
console.log("TABLE_NAME:", TABLE_NAME);

// Configure Airtable
Airtable.configure({
  apiKey: API_KEY,
});

const base = Airtable.base(BASE_ID);

// Test connection
async function testConnection() {
  try {
    console.log(`\nAttempting to fetch records from table: ${TABLE_NAME}`);

    const records = await base(TABLE_NAME)
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
    } else if (error.statusCode === 404) {
      console.log("\n❓ Table not found. Please check:");
      console.log(`1. The table name "${TABLE_NAME}" exists in your base`);
      console.log("2. Check for typos in the table name");
    }
  }
}

testConnection();
