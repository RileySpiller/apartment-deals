"use client";

import { Check, ChevronDown, MapPin, ExternalLink, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Apartment } from "@/lib/airtable";
import { useRouter } from "next/navigation";
import ApartmentDetailsPanel from "./apartment-details-panel";
import Image from "next/image";

interface ApartmentImage {
  url: string;
  filename: string;
}

interface ExtendedApartment extends Apartment {
  images?: ApartmentImage[];
}

interface ApartmentTableProps {
  initialCity?: string;
  apartments?: ExtendedApartment[];
}

// Add sort state
type SortConfig = {
  key: keyof ExtendedApartment;
  direction: "ascending" | "descending";
} | null;

export default function ApartmentTable({
  initialCity = "",
  apartments = [],
}: ApartmentTableProps) {
  const router = useRouter();
  const [apartmentList, setApartmentList] =
    useState<ExtendedApartment[]>(apartments);
  const [filteredApartments, setFilteredApartments] =
    useState<ExtendedApartment[]>(apartments);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApartment, setSelectedApartment] =
    useState<ExtendedApartment | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Filter states
  const [filters, setFilters] = useState<Record<string, string>>({
    city: initialCity,
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

  // Add sort state
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const sortData = useCallback(() => {
    if (!sortConfig) {
      return;
    }

    const sorted = [...filteredApartments].sort((a, b) => {
      if (sortConfig.key === "dealScore") {
        const aScore = Number(a.dealScore) || 0;
        const bScore = Number(b.dealScore) || 0;
        return sortConfig.direction === "ascending"
          ? aScore - bScore
          : bScore - aScore;
      }

      if (sortConfig.key === "propertyName" || sortConfig.key === "city") {
        const aValue = String(a[sortConfig.key]).toLowerCase();
        const bValue = String(b[sortConfig.key]).toLowerCase();
        return sortConfig.direction === "ascending"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

    setFilteredApartments(sorted);
  }, [sortConfig, filteredApartments]);

  useEffect(() => {
    if (sortConfig?.key) {
      sortData();
    }
  }, [sortConfig, sortData]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch("/api/apartments");
        if (!response.ok) {
          throw new Error("Failed to fetch apartments");
        }
        const data = await response.json();
        setApartmentList(data);
        setFilteredApartments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);

  // Apply filters
  useEffect(() => {
    const result = apartmentList.filter((apartment) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const apartmentValue = apartment[key as keyof ExtendedApartment];
        return String(apartmentValue)
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    });

    setFilteredApartments(result);
  }, [filters, apartmentList]);

  // Apply sort
  useEffect(() => {
    if (sortConfig?.key) {
      sortData();
    }
  }, [sortConfig, sortData]);

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
      city: initialCity,
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
  const getUniqueValues = (field: keyof ExtendedApartment) => {
    const values = new Set<string>();

    apartmentList.forEach((apt) => {
      const value = apt[field];
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            if (typeof v === "string") {
              values.add(v);
            }
          });
        } else {
          values.add(String(value));
        }
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

  // Add sort handler
  const handleSort = (key: keyof ExtendedApartment) => {
    setSortConfig((currentSort) => {
      if (currentSort?.key === key) {
        if (currentSort.direction === "ascending") {
          return { key, direction: "descending" };
        }
        return null;
      }
      return { key, direction: "ascending" };
    });
  };

  // Handle apartment selection
  const handleApartmentClick = (apartment: ExtendedApartment) => {
    // Check if we're on mobile
    if (window.innerWidth < 768) {
      router.push(`/apartments/${apartment.id}`);
    } else {
      setSelectedApartment(apartment);
      setIsPanelOpen(true);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading apartments...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (apartmentList.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md">
        No apartment deals found. Check back soon for new listings!
      </div>
    );
  }

  // Get unique values for filters
  const dealScores = getUniqueValues("dealScore");
  const cities = getUniqueValues("city");
  const freeRentOptions = apartmentList
    .flatMap((apt) => apt.freeRent || [])
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();
  const appliesToOptions = apartmentList
    .flatMap((apt) => apt.appliesTo || [])
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();
  const minimumLeaseTermOptions = apartmentList
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
              <th
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("city")}
              >
                <div className="flex items-center">
                  City
                  {sortConfig?.key === "city" && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("propertyName")}
              >
                <div className="flex items-center">
                  Property Name
                  {sortConfig?.key === "propertyName" && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("adFavorite")}
              >
                <div className="flex items-center">
                  AD Fav
                  {sortConfig?.key === "adFavorite" && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("dealScore")}
              >
                <div className="flex items-center">
                  Deal Score
                  {sortConfig?.key === "dealScore" && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("advertised")}
              >
                <div className="flex items-center">
                  Adv
                  {sortConfig?.key === "advertised" && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("lookAndLease")}
              >
                <div className="flex items-center">
                  L&L
                  {sortConfig?.key === "lookAndLease" && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("dealEnds")}
              >
                <div className="flex items-center">
                  Deal Ends
                  {sortConfig?.key === "dealEnds" && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("appliesTo")}
              >
                <div className="flex items-center">
                  Applies To
                  {sortConfig?.key === "appliesTo" && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("freeRent")}
              >
                <div className="flex items-center">
                  Free Rent
                  {sortConfig?.key === "freeRent" && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("applicationFee")}
              >
                <div className="flex items-center">
                  App Fee
                  {sortConfig?.key === "applicationFee" && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("adminFee")}
              >
                <div className="flex items-center">
                  Admin Fee
                  {sortConfig?.key === "adminFee" && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("giftCard")}
              >
                <div className="flex items-center">
                  Gift Card
                  {sortConfig?.key === "giftCard" && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("securityDeposit")}
              >
                <div className="flex items-center">
                  Security Dep
                  {sortConfig?.key === "securityDeposit" && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("leaseDiscount")}
              >
                <div className="flex items-center">
                  Lease Disc
                  {sortConfig?.key === "leaseDiscount" && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("dealNotes")}
              >
                <div className="flex items-center">
                  Deal Notes
                  {sortConfig?.key === "dealNotes" && (
                    <span className="ml-1">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredApartments.map((apartment) => (
              <tr
                key={apartment.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleApartmentClick(apartment)}
              >
                <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                  {apartment.city || "-"}
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="flex items-start space-x-2">
                    {apartment.thumbnail ? (
                      <Image
                        src={apartment.thumbnail}
                        alt={`${apartment.propertyName} thumbnail`}
                        width={100}
                        height={75}
                        className="rounded-md object-cover"
                      />
                    ) : apartment.photos && apartment.photos.length > 0 ? (
                      <Image
                        src={apartment.photos[0]}
                        alt={`${apartment.propertyName} photo`}
                        width={100}
                        height={75}
                        className="rounded-md object-cover"
                      />
                    ) : null}
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
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-2 w-2 mr-1" />
                          Website
                        </a>
                      )}
                    </div>
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

      {/* Add the details panel */}
      {selectedApartment && (
        <ApartmentDetailsPanel
          apartment={selectedApartment}
          isOpen={isPanelOpen}
          onClose={() => {
            setIsPanelOpen(false);
            setSelectedApartment(null);
          }}
        />
      )}
    </div>
  );
}
