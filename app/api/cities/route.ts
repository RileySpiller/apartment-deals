import { NextResponse } from "next/server";
import { fetchApartments } from "@/lib/airtable";

export async function GET() {
  try {
    const apartments = await fetchApartments();

    // Get unique cities with proper typing
    const cities = Array.from(
      new Set(
        apartments
          .map((apt) => apt.city)
          .filter((city): city is string => Boolean(city)) // Type guard to ensure non-null strings
          .sort()
      )
    );

    return NextResponse.json(cities);
  } catch (error) {
    console.error("Error in cities API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
