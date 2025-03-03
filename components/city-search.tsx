"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function CitySearch() {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch cities from the API
  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch("/api/cities");
        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }
        const data = await response.json();
        setCities(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cities:", err);
        setError("Failed to load cities");
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  // Filter cities based on search query
  useEffect(() => {
    if (!query) {
      setFilteredCities([]);
      return;
    }

    const filtered = cities.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [query, cities]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle city selection
  const handleCitySelect = (city: string) => {
    setQuery(city);
    setIsOpen(false);
    router.push(`/search?city=${encodeURIComponent(city)}`);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Austin, Texas"
          className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>

      {/* Dropdown */}
      {isOpen && query && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              Loading cities...
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">{error}</div>
          ) : filteredCities.length > 0 ? (
            <ul className="max-h-60 overflow-auto py-2">
              {filteredCities.map((city) => (
                <li
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  {city}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No cities found matching "{query}". Try a different search or
              check back later for more cities.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
