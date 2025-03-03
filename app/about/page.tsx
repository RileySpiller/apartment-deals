import Header from "@/components/header";
import Footer from "@/components/footer";
import { Users, Building, Award, MapPin } from "lucide-react";
import Image from "next/image";

export default function AboutUs() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                About Apartment Deals
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're on a mission to make finding great apartment deals easier
                and more transparent for everyone.
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Our Story
                  </h2>
                  <div className="prose prose-blue max-w-none">
                    <p>
                      Apartment Deals was founded in 2023 by a group of real
                      estate professionals who were frustrated with the lack of
                      transparency in the rental market. We noticed that great
                      move-in specials and deals were often hidden or only
                      available to those "in the know."
                    </p>
                    <p className="mt-4">
                      Our team set out to create a platform that would aggregate
                      and showcase the best apartment deals and move-in specials
                      in cities across the country, making this information
                      accessible to everyone.
                    </p>
                    <p className="mt-4">
                      Today, we track thousands of properties across major
                      metropolitan areas, updating our database daily with the
                      latest specials and promotions. Our platform serves
                      renters looking for the best deals, property managers
                      wanting to showcase their offerings, and real estate
                      professionals seeking to provide value to their clients.
                    </p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <div className="relative w-full h-[500px]">
                    <Image
                      src="/images/team.jpg"
                      alt="The Apartment Deals team"
                      fill
                      className="object-cover rounded-2xl"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={100}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-200 pt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
                Our Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Transparency
                  </h3>
                  <p className="text-gray-600">
                    We believe in complete transparency about apartment deals,
                    pricing, and terms. No hidden fees or surprises.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Quality
                  </h3>
                  <p className="text-gray-600">
                    We carefully vet all listings to ensure they meet our
                    standards for quality, accuracy, and value.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Community
                  </h3>
                  <p className="text-gray-600">
                    We're committed to building better communities by connecting
                    people with homes they love at prices they can afford.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-200 pt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
                Our Team
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  {
                    name: "Amani Anai",
                    title: "Founder & CEO",
                    bio: "Former real estate executive with 15+ years of experience in the rental market.",
                    image: "/images/amani-anai.jpg",
                  },
                  {
                    name: "Riley Spiller",
                    title: "CTO",
                    bio: "Tech entrepreneur with a passion for making real estate data more accessible.",
                    image: "/images/riley-spiller.jpg",
                  },
                ].map((person, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className={`object-cover ${
                          person.name === "Riley Spiller"
                            ? "scale-180"
                            : "scale-105"
                        }`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-sm text-blue-600 mb-2">{person.title}</p>
                    <p className="text-sm text-gray-600">{person.bio}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 border-t border-gray-200 pt-16 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Join Our Team
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                We're always looking for talented individuals who are passionate
                about real estate, technology, and helping people find their
                perfect home.
              </p>
              <a
                href="/careers"
                className="inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
              >
                View Open Positions
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
