import Header from "@/components/header";
import Footer from "@/components/footer";
import { FileText, BarChart, Mail, Download, ArrowRight } from "lucide-react";

export default function WeeklyReport() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Our Weekly Apartment Deals Report
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay informed with our comprehensive weekly report on the best
                apartment deals and move-in specials in your area.
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    What's Inside Our Report
                  </h2>
                  <ul className="space-y-6">
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Comprehensive Deal Listings
                        </h3>
                        <p className="mt-1 text-gray-600">
                          A complete list of all new apartment deals and move-in
                          specials from the past week, organized by
                          neighborhood.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <BarChart className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Market Trend Analysis
                        </h3>
                        <p className="mt-1 text-gray-600">
                          Insights on rental price trends, concession values,
                          and market conditions to help you make informed
                          decisions.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <Mail className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Exclusive Offers
                        </h3>
                        <p className="mt-1 text-gray-600">
                          Special deals and promotions available only to our
                          subscribers, negotiated directly with property
                          managers.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Subscribe to Our Weekly Report
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Join thousands of renters, property managers, and real
                    estate professionals who rely on our weekly insights.
                  </p>

                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="San Francisco"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="profession"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        I am a...
                      </label>
                      <select
                        id="profession"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option>Renter looking for an apartment</option>
                        <option>Property manager</option>
                        <option>Real estate agent</option>
                        <option>Investor</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center"
                    >
                      Subscribe Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-200 pt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Sample Reports
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      March 2025 Report
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Spring season deals and trends for downtown apartments.
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Sample (PDF)
                    </a>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      February 2025 Report
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Winter specials and luxury apartment promotions.
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Sample (PDF)
                    </a>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      January 2025 Report
                    </h3>
                    <p className="text-gray-600 mb-4">
                      New year deals and market forecast for the coming year.
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Sample (PDF)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
