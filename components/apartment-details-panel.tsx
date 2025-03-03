"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, MapPin, ExternalLink, Check } from "lucide-react";
import { Apartment } from "@/lib/airtable";
import Image from "next/image";

interface ApartmentImage {
  url: string;
  filename: string;
}

interface ApartmentDetailsPanelProps {
  apartment: Apartment & {
    images?: ApartmentImage[];
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function ApartmentDetailsPanel({
  apartment,
  isOpen,
  onClose,
}: ApartmentDetailsPanelProps) {
  if (!apartment) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-xl font-semibold text-gray-900">
                          {apartment.propertyName}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="relative flex-1 px-4 py-6 sm:px-6">
                      {/* Property Details */}
                      <div className="space-y-6">
                        {/* Thumbnail and Photos */}
                        <div className="space-y-4">
                          {apartment.thumbnail && (
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Featured Image
                              </h3>
                              <div className="relative h-64 w-full">
                                <Image
                                  src={apartment.thumbnail}
                                  alt={`${apartment.propertyName} thumbnail`}
                                  fill
                                  className="object-cover rounded-lg"
                                />
                              </div>
                            </div>
                          )}

                          {apartment.logo && (
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Property Logo
                              </h3>
                              <div className="relative h-16">
                                <Image
                                  src={apartment.logo}
                                  alt={`${apartment.propertyName} logo`}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </div>
                          )}

                          {apartment.photos && apartment.photos.length > 0 && (
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Property Photos
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                {apartment.photos.map((photo, index) => (
                                  <div key={index} className="relative h-48">
                                    <Image
                                      src={photo}
                                      alt={`${apartment.propertyName} photo ${
                                        index + 1
                                      }`}
                                      fill
                                      className="object-cover rounded-lg"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Location */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Location
                          </h3>
                          <div className="mt-2 flex items-center text-gray-500">
                            <MapPin className="h-5 w-5 mr-2" />
                            <span>
                              {apartment.streetAddress}, {apartment.city}
                            </span>
                          </div>
                          {apartment.website && (
                            <a
                              href={apartment.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
                            >
                              <ExternalLink className="h-5 w-5 mr-2" />
                              Visit Website
                            </a>
                          )}
                        </div>

                        {/* Deal Score */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Deal Score
                          </h3>
                          <div className="mt-2">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
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
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {apartment.dealScore || "No Score"}
                            </span>
                          </div>
                        </div>

                        {/* Current Deals */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Current Deals
                          </h3>
                          <dl className="mt-2 divide-y divide-gray-200">
                            {apartment.freeRent &&
                              apartment.freeRent.length > 0 && (
                                <div className="py-3 flex justify-between">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Free Rent
                                  </dt>
                                  <dd className="text-sm text-green-600 font-medium">
                                    {apartment.freeRent.join(", ")}
                                  </dd>
                                </div>
                              )}
                            {apartment.applicationFee && (
                              <div className="py-3 flex justify-between">
                                <dt className="text-sm font-medium text-gray-500">
                                  Application Fee
                                </dt>
                                <dd
                                  className={`text-sm ${
                                    apartment.applicationFee === "Waived"
                                      ? "text-green-600 font-medium"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {apartment.applicationFee}
                                </dd>
                              </div>
                            )}
                            {apartment.adminFee &&
                              apartment.adminFee.length > 0 && (
                                <div className="py-3 flex justify-between">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Admin Fee
                                  </dt>
                                  <dd
                                    className={`text-sm ${
                                      apartment.adminFee.includes("Waived")
                                        ? "text-green-600 font-medium"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    {apartment.adminFee.join(", ")}
                                  </dd>
                                </div>
                              )}
                            {apartment.giftCard && (
                              <div className="py-3 flex justify-between">
                                <dt className="text-sm font-medium text-gray-500">
                                  Gift Card
                                </dt>
                                <dd className="text-sm text-green-600 font-medium">
                                  {apartment.giftCard}
                                </dd>
                              </div>
                            )}
                            {apartment.leaseDiscount && (
                              <div className="py-3 flex justify-between">
                                <dt className="text-sm font-medium text-gray-500">
                                  Lease Discount
                                </dt>
                                <dd className="text-sm text-green-600 font-medium">
                                  {apartment.leaseDiscount}
                                </dd>
                              </div>
                            )}
                          </dl>
                        </div>

                        {/* Property Details */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Property Details
                          </h3>
                          <dl className="mt-2 divide-y divide-gray-200">
                            {apartment.totalUnits && (
                              <div className="py-3 flex justify-between">
                                <dt className="text-sm font-medium text-gray-500">
                                  Total Units
                                </dt>
                                <dd className="text-sm text-gray-900">
                                  {apartment.totalUnits}
                                </dd>
                              </div>
                            )}
                            {apartment.yearBuilt && (
                              <div className="py-3 flex justify-between">
                                <dt className="text-sm font-medium text-gray-500">
                                  Year Built
                                </dt>
                                <dd className="text-sm text-gray-900">
                                  {apartment.yearBuilt}
                                </dd>
                              </div>
                            )}
                            {apartment.avgSqft && (
                              <div className="py-3 flex justify-between">
                                <dt className="text-sm font-medium text-gray-500">
                                  Average Sq.Ft.
                                </dt>
                                <dd className="text-sm text-gray-900">
                                  {apartment.avgSqft}
                                </dd>
                              </div>
                            )}
                            {apartment.stories && (
                              <div className="py-3 flex justify-between">
                                <dt className="text-sm font-medium text-gray-500">
                                  Stories
                                </dt>
                                <dd className="text-sm text-gray-900">
                                  {apartment.stories}
                                </dd>
                              </div>
                            )}
                          </dl>
                        </div>

                        {/* Additional Info */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Additional Information
                          </h3>
                          <dl className="mt-2 divide-y divide-gray-200">
                            {apartment.dealEnds && (
                              <div className="py-3 flex justify-between">
                                <dt className="text-sm font-medium text-gray-500">
                                  Deal Ends
                                </dt>
                                <dd className="text-sm text-gray-900">
                                  {apartment.dealEnds}
                                </dd>
                              </div>
                            )}
                            {apartment.appliesTo &&
                              apartment.appliesTo.length > 0 && (
                                <div className="py-3 flex justify-between">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Applies To
                                  </dt>
                                  <dd className="text-sm text-gray-900">
                                    {apartment.appliesTo.join(", ")}
                                  </dd>
                                </div>
                              )}
                            {apartment.minimumLeaseTerm &&
                              apartment.minimumLeaseTerm.length > 0 && (
                                <div className="py-3 flex justify-between">
                                  <dt className="text-sm font-medium text-gray-500">
                                    Minimum Lease Term
                                  </dt>
                                  <dd className="text-sm text-gray-900">
                                    {apartment.minimumLeaseTerm.join(", ")}
                                  </dd>
                                </div>
                              )}
                          </dl>
                        </div>

                        {/* Deal Notes */}
                        {apartment.dealNotes && (
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              Deal Notes
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                              {apartment.dealNotes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
