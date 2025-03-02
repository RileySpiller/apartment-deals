import Header from "@/components/header";
import Footer from "@/components/footer";
import { BarChart, Users, Target, CheckCircle, ArrowRight } from "lucide-react";

export default function Advertise() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Advertise With Us
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Reach thousands of potential renters and real estate
                professionals with targeted advertising on Apartment Deals.
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    50,000+
                  </h3>
                  <p className="text-gray-600">
                    Monthly website visitors looking for apartment deals
                  </p>
                </div>
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    15,000+
                  </h3>
                  <p className="text-gray-600">
                    Email subscribers receiving our weekly deals report
                  </p>
                </div>
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    85%
                  </h3>
                  <p className="text-gray-600">
                    Of our audience actively looking to rent in the next 3
                    months
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-200 pt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
                Advertising Options
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-4">
                      Featured Property
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Showcase your property in our featured section on the
                      homepage and in search results.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Premium placement</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Custom property description</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Performance analytics</span>
                      </li>
                    </ul>
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-gray-900 mb-2">
                        $499
                      </span>
                      <span className="text-sm text-gray-600">per month</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 text-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                      Get Started
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg relative">
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm font-medium">
                    Most Popular
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-4">
                      Banner Advertising
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Display your banner ads throughout our website, targeting
                      specific cities or property types.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Multiple ad placements</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Geo-targeting available</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Click-through tracking</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>A/B testing support</span>
                      </li>
                    </ul>
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-gray-900 mb-2">
                        $799
                      </span>
                      <span className="text-sm text-gray-600">per month</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 text-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                      Get Started
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-4">
                      Email Newsletter
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Include your property or service in our weekly email
                      newsletter sent to thousands of subscribers.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>15,000+ subscribers</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>High open rates</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Dedicated section</span>
                      </li>
                    </ul>
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-gray-900 mb-2">
                        $349
                      </span>
                      <span className="text-sm text-gray-600">
                        per newsletter
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 text-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-200 pt-16">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Request Advertising Information
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and our advertising team will contact
                  you with more information about our advertising options and
                  custom packages.
                </p>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your company"
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
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="interest"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      I'm interested in
                    </label>
                    <select
                      id="interest"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option>Featured Property Listing</option>
                      <option>Banner Advertising</option>
                      <option>Email Newsletter</option>
                      <option>Custom Package</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Additional Information
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell us more about your advertising needs"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 inline-flex items-center"
                    >
                      Submit Request
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
