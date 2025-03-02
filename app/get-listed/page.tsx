import Header from "@/components/header";
import Footer from "@/components/footer";
import { Building, CheckCircle, ArrowRight } from "lucide-react";

export default function GetListed() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Get Your Property Listed
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Showcase your property's special offers and deals to thousands
                of potential renters in your area.
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Property Owners
                  </h3>
                  <p className="text-gray-600 mb-4">
                    List your property's special offers and deals to attract
                    quality tenants faster.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Highlight move-in specials</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Showcase property amenities</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Reach targeted local audience</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-8 rounded-lg">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Property Managers
                  </h3>
                  <p className="text-gray-600 mb-4">
                    List multiple properties and track performance with our
                    management dashboard.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Bulk listing discounts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Performance analytics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>API integration available</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-8 rounded-lg">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Leasing Agents
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Get access to our database of deals to help your clients
                    find the perfect apartment.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Daily deal notifications</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Client-friendly reports</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Commission tracking</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Ready to get started?
              </h2>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-600 inline-flex items-center">
                Submit your property
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <p className="mt-4 text-gray-600">
                Or call us at (555) 123-4567 for more information
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
