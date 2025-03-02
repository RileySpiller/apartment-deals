import Link from "next/link"
import { Search } from "lucide-react"

export default function Hero() {
  return (
    <div className="bg-white py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 max-w-4xl">
          Rental deals and move-in specials for apartments in your city, updated <span className="italic">daily</span>.
        </h1>

        <div className="mt-8 max-w-2xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-blue-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="San Francisco, California"
            />
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Are you an apartment finder or leasing agent?{" "}
            <Link href="/daily-report" className="text-blue-500 hover:underline">
              Get our daily report
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

