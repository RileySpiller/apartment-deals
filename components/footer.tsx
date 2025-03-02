import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Home</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/updates" className="text-gray-400 hover:text-white text-sm">
                  Updates
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-gray-400 hover:text-white text-sm">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/teams" className="text-gray-400 hover:text-white text-sm">
                  Teams
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="text-gray-400 hover:text-white text-sm">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/examples" className="text-gray-400 hover:text-white text-sm">
                  Examples
                </Link>
              </li>
              <li>
                <Link href="/sessions" className="text-gray-400 hover:text-white text-sm">
                  Sessions
                </Link>
              </li>
              <li>
                <Link href="/program" className="text-gray-400 hover:text-white text-sm">
                  Program
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-400 hover:text-white text-sm">
                  Packages
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Location</h3>
            <address className="not-italic text-gray-400 text-sm">
              <p>72 East Street</p>
              <p>High Brickington</p>
              <p>EX37 9DL</p>
              <p className="mt-2">079 2294 2980</p>
              <p>info@element.com</p>
            </address>
          </div>

          <div className="md:col-span-1">
            <div className="flex items-center">
              <h3 className="text-xl font-medium">hello@apartmentdeals.com</h3>
              <ArrowRight className="ml-2 h-5 w-5" />
            </div>
            <p className="mt-2 text-sm text-gray-400">Don't worry, we only send the best material - no spam.</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">Copyright Element 2020</p>
          <p className="text-sm text-gray-400 mt-2 md:mt-0">Designed by Bartek Marzec</p>
        </div>
      </div>
    </footer>
  )
}

