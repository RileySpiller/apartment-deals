"use client";

import { Check, ChevronDown, MapPin, ExternalLink, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Apartment } from "@/lib/airtable";

export default function ApartmentTable() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [filteredApartments, setFilteredApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [filters, setFilters] = useState({
    city: "",
    dealScore: "",
    priceScore: "",
    lookAndLease: "",
    advertised: "",
    freeRent: "",
    applicationFee: "",
    giftCard: "",
    adFavorite: "",
    appliesTo: "",
    minimumLeaseTerm: "",
    affordableRental: "",
  });

  // Filter dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("/api/apartments");

        if (!response.ok) {
          throw new Error("Failed to fetch apartments");
        }

        const data = await response.json();
        setApartments(data);
        setFilteredApartments(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching apartments:", err);
        setError("Failed to load apartments. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Apply filters whenever filters state changes
  useEffect(() => {
    let result = [...apartments];

    // Apply each filter
    if (filters.city) {
      result = result.filter((apt) => apt.city === filters.city);
    }

    if (filters.dealScore) {
      result = result.filter((apt) => apt.dealScore === filters.dealScore);
    }

    if (filters.lookAndLease) {
      result = result.filter(
        (apt) => apt.lookAndLease === (filters.lookAndLease === "Yes")
      );
    }

    if (filters.advertised) {
      result = result.filter(
        (apt) => apt.advertised === (filters.advertised === "Yes")
      );
    }

    if (filters.freeRent) {
      result = result.filter((apt) => apt.freeRent?.includes(filters.freeRent));
    }

    if (filters.adFavorite) {
      result = result.filter(
        (apt) => (apt.adFavorite === true) === (filters.adFavorite === "Yes")
      );
    }

    if (filters.appliesTo) {
      result = result.filter((apt) =>
        apt.appliesTo?.includes(filters.appliesTo)
      );
    }

    if (filters.minimumLeaseTerm) {
      result = result.filter((apt) =>
        apt.minimumLeaseTerm?.includes(filters.minimumLeaseTerm)
      );
    }

    setFilteredApartments(result);
  }, [filters, apartments]);

  // Toggle dropdown
  const toggleDropdown = (dropdown: string) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdown);
    }
  };

  // Update filter
  const updateFilter = (filterName: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: prev[filterName] === value ? "" : value,
    }));
    setOpenDropdown(null);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      city: "",
      dealScore: "",
      priceScore: "",
      lookAndLease: "",
      advertised: "",
      freeRent: "",
      applicationFee: "",
      giftCard: "",
      adFavorite: "",
      appliesTo: "",
      minimumLeaseTerm: "",
      affordableRental: "",
    });
  };

  // Get unique values for filter options
  const getUniqueValues = (field: keyof Apartment) => {
    const values = new Set<string>();

    apartments.forEach((apt) => {
      const value = apt[field];
      if (Array.isArray(value)) {
        value.forEach((v) => values.add(v));
      } else if (value !== undefined && value !== null) {
        values.add(String(value));
      }
    });

    return Array.from(values).sort();
  };

  // Filter dropdown component
  const FilterDropdown = ({
    label,
    filterName,
    options,
  }: {
    label: string;
    filterName: keyof typeof filters;
    options: string[];
  }) => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown(filterName.toString())}
        className={`flex items-center space-x-1 px-2 py-1 text-sm font-medium rounded-md ${
          filters[filterName]
            ? "bg-blue-100 text-blue-800"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        <span>{label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {openDropdown === filterName.toString() && (
        <div className="absolute z-10 mt-1 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => updateFilter(filterName, option)}
                className={`flex items-center justify-between w-full px-4 py-2 text-sm ${
                  filters[filterName] === option
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{option}</span>
                {filters[filterName] === option && (
                  <Check className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Boolean filter dropdown
  const BooleanFilterDropdown = ({
    label,
    filterName,
  }: {
    label: string;
    filterName: keyof typeof filters;
  }) => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown(filterName.toString())}
        className={`flex items-center space-x-1 px-2 py-1 text-sm font-medium rounded-md ${
          filters[filterName]
            ? "bg-blue-100 text-blue-800"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        <span>{label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {openDropdown === filterName.toString() && (
        <div className="absolute z-10 mt-1 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                onClick={() => updateFilter(filterName, option)}
                className={`flex items-center justify-between w-full px-4 py-2 text-sm ${
                  filters[filterName] === option
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{option}</span>
                {filters[filterName] === option && (
                  <Check className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return <div className="text-center py-10">Loading apartments...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (apartments.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md">
        No apartment deals found. Check back soon for new listings!
      </div>
    );
  }

  // Get unique values for filters
  const dealScores = getUniqueValues("dealScore");
  const cities = getUniqueValues("city");
  const freeRentOptions = apartments
    .flatMap((apt) => apt.freeRent || [])
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();
  const appliesToOptions = apartments
    .flatMap((apt) => apt.appliesTo || [])
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();
  const minimumLeaseTermOptions = apartments
    .flatMap((apt) => apt.minimumLeaseTerm || [])
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();

  return (
    <div className="space-y-2">
      {/* Filters */}
      <div className="flex flex-wrap gap-1 items-center mb-2">
        <FilterDropdown label="City" filterName="city" options={cities} />
        <FilterDropdown
          label="Deal Score"
          filterName="dealScore"
          options={dealScores}
        />
        <BooleanFilterDropdown
          label="Look and Lease"
          filterName="lookAndLease"
        />
        <BooleanFilterDropdown label="Advertised" filterName="advertised" />
        <FilterDropdown
          label="Free Rent"
          filterName="freeRent"
          options={freeRentOptions}
        />
        <BooleanFilterDropdown label="AD Favorite" filterName="adFavorite" />
        <FilterDropdown
          label="Applies to"
          filterName="appliesTo"
          options={appliesToOptions}
        />
        <FilterDropdown
          label="Minimum Lease Term"
          filterName="minimumLeaseTerm"
          options={minimumLeaseTermOptions}
        />

        {/* Clear filters button */}
        {Object.values(filters).some(Boolean) && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-md hover:bg-red-200"
          >
            <X className="h-3 w-3" />
            <span>Clear filters</span>
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property Name
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AD Fav
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deal Score
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Adv
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                L&L
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deal Ends
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applies To
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Free Rent
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                App Fee
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Admin Fee
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gift Card
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No Rent Until
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Security Dep
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lease Disc
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deal Notes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredApartments.map((apartment) => (
              <tr key={apartment.id} className="hover:bg-gray-50">
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                  {apartment.city || "-"}
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-xs font-medium text-gray-900">
                      {apartment.propertyName}
                    </div>
                    {apartment.streetAddress && (
                      <div className="text-xs text-gray-500 flex items-center">
                        <MapPin className="h-2 w-2 mr-1" />
                        {apartment.streetAddress}
                      </div>
                    )}
                    {apartment.website && (
                      <a
                        href={apartment.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-xs flex items-center"
                      >
                        <ExternalLink className="h-2 w-2 mr-1" />
                        Website
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                  {apartment.adFavorite ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-xs ${
                      apartment.dealScore === "Very Good"
                        ? "bg-green-100 text-green-800"
                        : apartment.dealScore === "Amazing"
                        ? "bg-purple-100 text-purple-800"
                        : apartment.dealScore === "Epic"
                        ? "bg-indigo-100 text-indigo-800"
                        : apartment.dealScore === "Solid"
                        ? "bg-blue-100 text-blue-800"
                        : apartment.dealScore === "Just Okay"
                        ? "bg-yellow-100 text-yellow-800"
                        : apartment.dealScore === "No Deals"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {apartment.dealScore || "-"}
                  </span>
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                  {apartment.advertised ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                  {apartment.lookAndLease ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                  {apartment.dealEnds || "-"}
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                  {apartment.appliesTo?.join(", ") || "-"}
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                  <span
                    className={
                      apartment.freeRent && apartment.freeRent.length > 0
                        ? "font-medium text-green-600"
                        : ""
                    }
                  >
                    {apartment.freeRent?.join(", ") || "-"}
                  </span>
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                  {apartment.applicationFee === "Waived" ? (
                    <span className="font-medium text-green-600">Waived</span>
                  ) : (
                    apartment.applicationFee || "-"
                  )}
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                  {apartment.adminFee?.includes("Waived") ? (
                    <span className="font-medium text-green-600">Waived</span>
                  ) : (
                    apartment.adminFee?.join(", ") || "-"
                  )}
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                  {apartment.giftCard ? (
                    <span className="font-medium text-green-600">
                      {apartment.giftCard}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                  {apartment.noRentUntil || "-"}
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                  {apartment.securityDeposit || "-"}
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                  {apartment.leaseDiscount ? (
                    <span className="font-medium text-green-600">
                      {apartment.leaseDiscount}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500 max-w-xs truncate">
                  {apartment.dealNotes || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
