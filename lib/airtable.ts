import Airtable from "airtable";

// Initialize Airtable with API key
console.log(
  "Airtable API Key:",
  process.env.AIRTABLE_API_KEY ? "Set (hidden)" : "Not set"
);
console.log("Airtable Base ID:", process.env.AIRTABLE_BASE_ID);
console.log("Airtable Table Name:", process.env.AIRTABLE_TABLE_NAME);

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

// Connect to the base
const base = Airtable.base(process.env.AIRTABLE_BASE_ID || "");

// Define the Apartment type based on your table structure
export interface Apartment {
  id: string;
  propertyName: string;
  streetAddress?: string;
  city?: string;
  website?: string;
  freeRent?: string[];
  adminFee?: string[];
  securityDeposit?: string;
  dealScore?: string;
  dealEnds?: string;
  neighborhood?: string[];
  totalUnits?: number;
  yearBuilt?: string;
  avgSqft?: number;
  stories?: number;
  googleRating?: string;
  phoneNumber?: string;
  email?: string;
  advertised?: boolean;
  lookAndLease?: boolean;
  appliesTo?: string[];
  minimumLeaseTerm?: string[];
  adFavorite?: boolean;
  applicationFee?: string;
  giftCard?: string;
  noRentUntil?: string;
  leaseDiscount?: string;
  dealNotes?: string;
}

// Function to fetch all apartments from Airtable
export async function fetchApartments(): Promise<Apartment[]> {
  try {
    console.log("Fetching apartments from Airtable...");
    console.log("Table name:", process.env.AIRTABLE_TABLE_NAME || "Austin");

    const records = await base(process.env.AIRTABLE_TABLE_NAME || "Austin")
      .select({
        // You can add view, filter, sort options here
        view: "Grid view",
      })
      .all();

    console.log("Fetched records:", records.length);

    // Map Airtable records to our Apartment interface
    return records.map((record) => {
      const fields = record.fields;
      console.log("Record fields:", Object.keys(fields));

      return {
        id: record.id,
        propertyName: (fields["Property Name"] as string) || "",
        streetAddress: fields["Street Address"] as string,
        city: fields["City"] as string,
        website: fields["Website"] as string,
        freeRent: fields["Free Rent"] as string[],
        adminFee: fields["Admin Fee"] as string[],
        securityDeposit: fields["Security Deposit"] as string,
        dealScore: fields["Deal Score"] as string,
        dealEnds: fields["Deal Ends"] as string,
        neighborhood: fields["Neighborhood"] as string[],
        totalUnits: fields["Total Units"] as number,
        yearBuilt: fields["Year Built"] as string,
        avgSqft: fields["Avg. Sqft."] as number,
        stories: fields["Stories"] as number,
        googleRating: fields["Google Rating"] as string,
        phoneNumber: fields["Phone Number"] as string,
        email: fields["Email"] as string,
        advertised: fields["Advertised"] as boolean,
        lookAndLease: fields["Look and Lease"] as boolean,
        appliesTo: fields["Applies to "] as string[],
        minimumLeaseTerm: fields["Minimum Lease Term"] as string[],
        adFavorite: fields["Ad Favorite"] as boolean,
        applicationFee: fields["Application Fee"] as string,
        giftCard: fields["Gift Card"] as string,
        noRentUntil: fields["No Rent Until"] as string,
        leaseDiscount: fields["Lease Discount"] as string,
        dealNotes: fields["Deal Notes"] as string,
      };
    });
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    return [];
  }
}

// Function to fetch a single apartment by ID
export async function fetchApartmentById(
  id: string
): Promise<Apartment | null> {
  try {
    const record = await base(process.env.AIRTABLE_TABLE_NAME || "Austin").find(
      id
    );

    if (!record) {
      return null;
    }

    const fields = record.fields;

    return {
      id: record.id,
      propertyName: (fields["Property Name"] as string) || "",
      streetAddress: fields["Street Address"] as string,
      city: fields["City"] as string,
      website: fields["Website"] as string,
      freeRent: fields["Free Rent"] as string[],
      adminFee: fields["Admin Fee"] as string[],
      securityDeposit: fields["Security Deposit"] as string,
      dealScore: fields["Deal Score"] as string,
      dealEnds: fields["Deal Ends"] as string,
      neighborhood: fields["Neighborhood"] as string[],
      totalUnits: fields["Total Units"] as number,
      yearBuilt: fields["Year Built"] as string,
      avgSqft: fields["Avg. Sqft."] as number,
      stories: fields["Stories"] as number,
      googleRating: fields["Google Rating"] as string,
      phoneNumber: fields["Phone Number"] as string,
      email: fields["Email"] as string,
      advertised: fields["Advertised"] as boolean,
      lookAndLease: fields["Look and Lease"] as boolean,
      appliesTo: fields["Applies to "] as string[],
      minimumLeaseTerm: fields["Minimum Lease Term"] as string[],
      adFavorite: fields["Ad Favorite"] as boolean,
      applicationFee: fields["Application Fee"] as string,
      giftCard: fields["Gift Card"] as string,
      noRentUntil: fields["No Rent Until"] as string,
      leaseDiscount: fields["Lease Discount"] as string,
      dealNotes: fields["Deal Notes"] as string,
    };
  } catch (error) {
    console.error("Error fetching apartment by ID:", error);
    return null;
  }
}
