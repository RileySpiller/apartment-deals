"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MapPin, ExternalLink, ArrowLeft } from "lucide-react";
import { Apartment } from "@/lib/airtable";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ApartmentPage() {
  const params = useParams();
  const router = useRouter();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApartment() {
      try {
        const response = await fetch(`/api/apartments/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch apartment");
        }
        const data = await response.json();
        setApartment(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching apartment:", err);
        setError("Failed to load apartment details");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchApartment();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading apartment details...</div>
      </div>
    );
  }

  if (error || !apartment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          {error || "Apartment not found"}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Search
          </button>

          {/* Property Details */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {apartment.propertyName}
              </h1>
              <div className="mt-2 flex items-center text-gray-500">
                <MapPin className="h-5 w-5 mr-2" />
                <span>
                  {apartment.streetAddress}, {apartment.city}
                </span>
              </div>
              {apartment.website && (
                <a
                  href={apartment.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Visit Website
                </a>
              )}
            </div>

            {/* Deal Score */}
            <div>
              <h2 className="text-lg font-medium text-gray-900">Deal Score</h2>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    apartment.dealScore === "Very Good"
                      ? "bg-green-100 text-green-800"
                      : apartment.dealScore === "Amazing"
                      ? "bg-purple-100 text-purple-800"
                      : apartment.dealScore === "Epic"
                      ? "bg-indigo-100 text-indigo-800"
                      : apartment.dealScore === "Solid"
                      ? "bg-blue-100 text-blue-800"
                      : apartment.dealScore === "Just Okay"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {apartment.dealScore || "No Score"}
                </span>
              </div>
            </div>

            {/* Current Deals */}
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Current Deals
              </h2>
              <dl className="mt-2 divide-y divide-gray-200">
                {apartment.freeRent && apartment.freeRent.length > 0 && (
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">
                      Free Rent
                    </dt>
                    <dd className="text-sm text-green-600 font-medium">
                      {apartment.freeRent.join(", ")}
                    </dd>
                  </div>
                )}
                {apartment.applicationFee && (
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">
                      Application Fee
                    </dt>
                    <dd
                      className={`text-sm ${
                        apartment.applicationFee === "Waived"
                          ? "text-green-600 font-medium"
                          : "text-gray-900"
                      }`}
                    >
                      {apartment.applicationFee}
                    </dd>
                  </div>
                )}
                {apartment.adminFee && apartment.adminFee.length > 0 && (
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">
                      Admin Fee
                    </dt>
                    <dd
                      className={`text-sm ${
                        apartment.adminFee.includes("Waived")
                          ? "text-green-600 font-medium"
                          : "text-gray-900"
                      }`}
                    >
                      {apartment.adminFee.join(", ")}
                    </dd>
                  </div>
                )}
                {apartment.giftCard && (
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">
                      Gift Card
                    </dt>
                    <dd className="text-sm text-green-600 font-medium">
                      {apartment.giftCard}
                    </dd>
                  </div>
                )}
                {apartment.leaseDiscount && (
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">
                      Lease Discount
                    </dt>
                    <dd className="text-sm text-green-600 font-medium">
                      {apartment.leaseDiscount}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Property Details */}
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Property Details
              </h2>
              <dl className="mt-2 divide-y divide-gray-200">
                {apartment.totalUnits && (
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">
                      Total Units
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {apartment.totalUnits}
                    </dd>
                  </div>
                )}
                {apartment.yearBuilt && (
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">
                      Year Built
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {apartment.yearBuilt}
                    </dd>
                  </div>
                )}
                {apartment.avgSqft && (
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">
                      Average Sq.Ft.
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {apartment.avgSqft}
                    </dd>
                  </div>
                )}
                {apartment.stories && (
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">
                      Stories
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {apartment.stories}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Additional Info */}
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Additional Information
              </h2>
              <dl className="mt-2 divide-y divide-gray-200">
                {apartment.dealEnds && (
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">
                      Deal Ends
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {apartment.dealEnds}
                    </dd>
                  </div>
                )}
                {apartment.appliesTo && apartment.appliesTo.length > 0 && (
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">
                      Applies To
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {apartment.appliesTo.join(", ")}
                    </dd>
                  </div>
                )}
                {apartment.minimumLeaseTerm &&
                  apartment.minimumLeaseTerm.length > 0 && (
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">
                        Minimum Lease Term
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {apartment.minimumLeaseTerm.join(", ")}
                      </dd>
                    </div>
                  )}
              </dl>
            </div>

            {/* Deal Notes */}
            {apartment.dealNotes && (
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Deal Notes
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  {apartment.dealNotes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
