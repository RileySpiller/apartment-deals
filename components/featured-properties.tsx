"use client";

import { Flame } from "lucide-react";
import Image from "next/image";

export default function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      name: "Luxury Downtown Loft",
      image: "/images/property-1.png",
      special: "First Month Free",
    },
    {
      id: 2,
      name: "Modern Midtown Studio",
      image: "/images/property-2.png",
      special: "$500 Move-in Special",
    },
    {
      id: 3,
      name: "Uptown Heights",
      image: "/images/property-3.png",
      special: "No Security Deposit",
    },
    {
      id: 4,
      name: "Cascadia Luxury Apartment Homes",
      image: "/images/property-4.png",
      special: "$1000 Off First Month + Free Parking",
    },
  ];

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            Featured Move-In Specials
          </h2>
          <Flame className="ml-2 h-5 w-5 text-orange-500" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={property.image}
                  alt={`${property.name} property`}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate">
                  {property.name}
                </h3>
                <p className="mt-1 text-sm text-orange-600 font-medium">
                  {property.special}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
