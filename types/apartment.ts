export interface Apartment {
  id: string;
  propertyName: string;
  city: string;
  state: string;
  dealScore: number;
  currentDeals: string[];
  propertyDetails: {
    bedrooms: string;
    bathrooms: string;
    sqft: string;
    rent: string;
  };
  additionalInfo: {
    yearBuilt: string;
    petPolicy: string;
    parking: string;
    amenities: string[];
  };
  dealNotes: string;
  images: {
    url: string;
    filename: string;
  }[];
}
