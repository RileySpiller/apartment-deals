import Header from "@/components/header"
import Hero from "@/components/hero"
import FeaturedProperties from "@/components/featured-properties"
import ApartmentTable from "@/components/apartment-table"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Hero />
        <FeaturedProperties />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ApartmentTable />
        </div>
      </div>
      <Footer />
    </main>
  )
}

