import Header from "@/components/header";
import Hero from "@/components/hero";
import FeaturedProperties from "@/components/featured-properties";
import ApartmentTable from "@/components/apartment-table";
import Footer from "@/components/footer";
import CitySearch from "@/components/city-search";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Rental deals and move-in specials for apartments in your city,
                updated daily.
              </h1>
              <div className="max-w-2xl mx-auto">
                <CitySearch />
              </div>
            </div>
          </div>
        </div>
        <FeaturedProperties />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ApartmentTable />
        </div>
      </div>
      <Footer />
    </main>
  );
}
