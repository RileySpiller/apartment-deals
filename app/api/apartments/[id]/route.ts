import { NextRequest, NextResponse } from "next/server";
import { fetchApartmentById, fetchApartments } from "@/lib/airtable";

export async function generateStaticParams() {
  try {
    const apartments = await fetchApartments();
    return apartments.map((apartment) => ({
      id: apartment.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const apartment = await fetchApartmentById(id);

    if (!apartment) {
      return NextResponse.json(
        { error: "Apartment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(apartment);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch apartment" },
      { status: 500 }
    );
  }
}
