"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ApartmentTable from "@/components/apartment-table";
import CitySearch from "@/components/city-search";

function SearchContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <CitySearch />
          </div>

          {city ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Apartment Deals in {city}
              </h1>
              <ApartmentTable initialCity={city} />
            </>
          ) : (
            <div className="text-center py-10 text-gray-500">
              Please select a city to view available apartment deals.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
