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
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-[56px] leading-[64px] font-bold text-[#0F172A] max-w-[1000px]">
              Rental deals and move-in specials for apartments in your city,
              updated <span className="italic font-serif">daily</span>.
            </h1>

            <div className="mt-12 max-w-[456px]">
              <CitySearch />
            </div>

            <p className="mt-6 text-base text-gray-600">
              Are you an apartment finder or leasing agent?{" "}
              <a
                href="/daily-report"
                className="text-[#00A6E6] hover:underline"
              >
                Get our daily report
              </a>
              .
            </p>
          </div>
        </section>
        <FeaturedProperties />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ApartmentTable />
        </div>
      </div>
      <Footer />
    </main>
  );
}
