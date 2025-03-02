import { NextResponse } from "next/server";
import { fetchApartments } from "@/lib/airtable";

export async function GET() {
  try {
    const apartments = await fetchApartments();
    return NextResponse.json(apartments);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch apartments" },
      { status: 500 }
    );
  }
}
