import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">apartment</span>
              <div className="relative w-8 h-8 mx-1">
                <div className="absolute inset-0 bg-[#00A6E6] rounded-full transform rotate-45"></div>
                <div className="absolute inset-1 bg-white rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#00A6E6] rounded-full transform translate-x-0.5 translate-y-0.5"></div>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">deals</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center">
            <div className="flex items-center space-x-6">
              <Link
                href="/get-listed"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Get Listed
              </Link>
              <Link
                href="/weekly-report"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Our Weekly Report
              </Link>
              <Link
                href="/about"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                About Us
              </Link>
              <Link
                href="/advertise"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Advertise
              </Link>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="bg-[#0F172A] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="hidden md:flex items-center bg-[#00A6E6] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-600"
            >
              Sign up for free email updates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        <nav className="md:hidden flex flex-wrap justify-center py-2 space-x-4">
          <Link
            href="/get-listed"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Get Listed
          </Link>
          <Link
            href="/weekly-report"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Our Weekly Report
          </Link>
          <Link
            href="/about"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            About Us
          </Link>
          <Link
            href="/advertise"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Advertise
          </Link>
        </nav>
      </div>
    </header>
  );
}
