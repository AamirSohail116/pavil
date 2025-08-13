"use client"

import { HeroSection } from "@/components/hero-section"
import { BookingFilters } from "@/components/booking-filters"
import HotelBookingCard from "@/components/hotel-booking-card"
import PropertyDetails from "@/components/property-details"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useEffect, useState, Suspense } from "react" // Add Suspense import
import { HomeBookingSummary } from "@/components/HomeBookingSummary "
import { useGetRooms } from "@/API/useGetRooms"
import { addDays, formatDate } from "@/lib/utils"
import { Room } from "@/types/hotel"
import { Loader } from "lucide-react"
import { useSearchParams } from "next/navigation"

// Create a separate component for the main content
function HomeContent() {
  const searchParams = useSearchParams()
  const propertyIdFromUrl = searchParams.get("propertyId") || "1"
  const [bookingData] = useLocalStorage("bookingData", []);
  const [showSummary, setShowSummary] = useState(false);
  const [filters, setFilters] = useLocalStorage("filters", {
    check_in: formatDate(new Date()),
    check_out: formatDate(addDays(new Date(), 1)),
    guests: 3,
    search: ""
  });

  const combinedFilters = { ...filters, property_id: parseInt(propertyIdFromUrl) }

  const { data, isLoading, refetch, isFetching, error, isError } = useGetRooms(combinedFilters);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, search: "" }));
  };

  const handleSearch = () => {
    setFilters(prev => ({ ...prev, search: "yes" }));
    refetch();
  };

  useEffect(() => {
    if (!data) {
      refetch();
    }
  }, []);

  useEffect(() => {
    if (bookingData.length > 0) {
      const timer = setTimeout(() => {
        setShowSummary(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowSummary(false);
    }
  }, [bookingData]);

  if (isLoading || isFetching) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader className="animate-spin h-10 w-10 text-gray-500" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="h-[100vh] flex flex-col items-center justify-center text-center space-y-4">
        <p className="text-red-500 font-medium">
          {error instanceof Error ? error.message : "Something went wrong while fetching rooms."}
        </p>
        <button
          onClick={() => refetch()}
          className="bg-[#f3a32d] px-4 py-2 text-white rounded hover:bg-[#e18f22]"
        >
          Try Again
        </button>
      </div>
    );
  }

  const rooms = data?.rooms || [];
  const propertyData = data?.property || {};
  const currencies = data?.currencies || [];

  return (
    <div className="">
      <HeroSection />
      <BookingFilters
        onSearch={handleSearch}
        filters={combinedFilters}
        onFilterChange={handleFilterChange}
        currencies={currencies}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className={`space-y-2 ${showSummary ? "lg:col-span-8" : "lg:col-span-12"}`}>
          {rooms?.map((room: Room) => (
            <HotelBookingCard
              check_in={filters.check_in}
              check_out={filters.check_out}
              room={room}
              key={room.id}
              showSummary={showSummary}
            />
          ))}
        </div>

        {showSummary && (
          <div className="lg:col-span-4 mt-2">
            <HomeBookingSummary roomTypes={rooms} setShowSummary={setShowSummary} />
          </div>
        )}
      </div>

      <div>
        <PropertyDetails propertyData={propertyData} />
      </div>
    </div>
  )
}

// Wrap the content in Suspense
export default function Home() {
  return (
    <Suspense fallback={
      <div className="h-[80vh] flex items-center justify-center">
        <Loader className="animate-spin h-10 w-10 text-gray-500" />
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}