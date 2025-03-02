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

// Define Airtable's attachment type
type AirtableAttachment = {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails?: {
    small: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    full: { url: string; width: number; height: number };
  };
};

export type Apartment = {
  id: string;
  propertyName: string;
  streetAddress?: string;
  city?: string;
  website?: string;
  dealScore?: string;
  priceScore?: string;
  lookAndLease?: boolean;
  advertised?: boolean;
  freeRent?: string[];
  applicationFee?: string;
  adminFee?: string[];
  giftCard?: string;
  leaseDiscount?: string;
  adFavorite?: boolean;
  appliesTo?: string[];
  minimumLeaseTerm?: string[];
  affordableRental?: boolean;
  dealNotes?: string;
  totalUnits?: string;
  yearBuilt?: string;
  avgSqft?: string;
  stories?: string;
  dealEnds?: string;
  securityDeposit?: string;
  thumbnail?: string;
  logo?: string;
  photos?: string[];
};

// Function to extract URL from Airtable attachment
function getAttachmentUrl(
  attachment: AirtableAttachment[] | undefined
): string | undefined {
  if (!attachment || attachment.length === 0) return undefined;
  return attachment[0].url;
}

function getAttachmentUrls(
  attachments: AirtableAttachment[] | undefined
): string[] {
  if (!attachments) return [];
  return attachments.map((attachment) => attachment.url);
}

// Function to fetch all apartments from Airtable
export async function fetchApartments(): Promise<Apartment[]> {
  try {
    console.log("Fetching apartments from Airtable...");
    console.log("Table name:", process.env.AIRTABLE_TABLE_NAME || "Austin");

    const records = await base(process.env.AIRTABLE_TABLE_NAME || "Austin")
      .select({
        view: "Grid view",
      })
      .all();

    console.log("Fetched records:", records.length);

    return records.map((record) => {
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
        totalUnits: fields["Total Units"] as string,
        yearBuilt: fields["Year Built"] as string,
        avgSqft: fields["Avg. Sqft."] as string,
        stories: fields["Stories"] as string,
        advertised: fields["Advertised"] as boolean,
        lookAndLease: fields["Look and Lease"] as boolean,
        appliesTo: fields["Applies To"] as string[],
        minimumLeaseTerm: fields["Minimum Lease Term"] as string[],
        adFavorite: fields["AD Favorite"] as boolean,
        applicationFee: fields["Application Fee"] as string,
        giftCard: fields["Gift Card"] as string,
        leaseDiscount: fields["Lease Discount"] as string,
        dealNotes: fields["Deal Notes"] as string,
        thumbnail: getAttachmentUrl(
          fields["Thumbnail"] as AirtableAttachment[]
        ),
        logo: getAttachmentUrl(fields["Logo"] as AirtableAttachment[]),
        photos: getAttachmentUrls(fields["Photos"] as AirtableAttachment[]),
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
      totalUnits: fields["Total Units"] as string,
      yearBuilt: fields["Year Built"] as string,
      avgSqft: fields["Avg. Sqft."] as string,
      stories: fields["Stories"] as string,
      advertised: fields["Advertised"] as boolean,
      lookAndLease: fields["Look and Lease"] as boolean,
      appliesTo: fields["Applies To"] as string[],
      minimumLeaseTerm: fields["Minimum Lease Term"] as string[],
      adFavorite: fields["AD Favorite"] as boolean,
      applicationFee: fields["Application Fee"] as string,
      giftCard: fields["Gift Card"] as string,
      leaseDiscount: fields["Lease Discount"] as string,
      dealNotes: fields["Deal Notes"] as string,
      thumbnail: getAttachmentUrl(fields["Thumbnail"] as AirtableAttachment[]),
      logo: getAttachmentUrl(fields["Logo"] as AirtableAttachment[]),
      photos: getAttachmentUrls(fields["Photos"] as AirtableAttachment[]),
    };
  } catch (error) {
    console.error("Error fetching apartment by ID:", error);
    return null;
  }
}
