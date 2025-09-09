"use client"

import { HeroSection } from "@/components/hero-section"
import { BookingFilters } from "@/components/booking-filters"
import HotelBookingCard from "@/components/hotel-booking-card"
import PropertyDetails from "@/components/property-details"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useEffect, useState, Suspense } from "react"
import { useGetRooms } from "@/API/useGetRooms"
import { addDays, formatDate } from "@/lib/utils"
import { Room } from "@/types/hotel"
import { Loader } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { usePropertyStore } from "@/hooks/usePropertyInfo"
import { useGuestStore } from "@/store/useGuestStore"
import { useRoomIdStore } from "@/hooks/useRoomId"
import { getDefaultDateRange, useGetRoomRates } from "@/API/useGetRoomRates"

// Create a separate component for the main content
function HomeContent() {
  const searchParams = useSearchParams()
  const propertyIdFromUrl = searchParams.get("propertyId") || "i10p1"
  const [bookingData] = useLocalStorage("bookingData", []);
  const [showSummary, setShowSummary] = useState(false);
  const { setMaxGuests } = useGuestStore();
  const [filters, setFilters] = useLocalStorage("filters", {
    check_in: formatDate(new Date()),
    check_out: formatDate(addDays(new Date(), 1)),
    guests: 2,
    search: ""
  });

  // Use the property store
  const { updateProperty } = usePropertyStore()
  const { setRoomId } = useRoomIdStore();




  const combinedFilters = { ...filters, property_id: (propertyIdFromUrl) }

  const { data, isLoading, refetch, isFetching, error, isError } = useGetRooms(combinedFilters);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, search: "" }));
  };

  const handleSearch = () => {
    setFilters(prev => ({ ...prev, search: "yes" }));
    setMaxGuests(filters.guests);
    refetch();
  };

  useEffect(() => {
    if (!data) {
      refetch();
    }
  }, []);

  // Update property data in store when propertyData changes
  useEffect(() => {
    if (data?.property && data.property.id) {
      // update property store
      updateProperty({
        id: data.property.id,
        name: data.property.name || "",
        address: data.property.address || ""
      });

      // only update propertyId if rooms exist
      if (data?.rooms && data.rooms.length > 0) {
        setRoomId(data.rooms[0].roomId);
      }
    }
  }, [data?.property, data?.rooms, updateProperty, setRoomId]);


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
        <div className={`space-y-2  lg:col-span-12`}>
          {rooms.length > 0 ? (
            rooms.map((room: Room) => (
              <HotelBookingCard
                check_in={filters.check_in}
                check_out={filters.check_out}
                room={room}
                key={room.id}
                showSummary={showSummary}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Oops! No Rooms Found
                </h2>
                <p className="text-gray-600 mb-6">
                  We couldnt find any available rooms for your selected dates and criteria.
                  Try adjusting your filters or search for different dates to see more options.
                </p>

              </div>
            </div>
          )}
        </div>

        {/* {showSummary && (
          <div className="lg:col-span-4 mt-2">
            <HomeBookingSummary roomTypes={rooms} setShowSummary={setShowSummary} />
          </div>
        )} */}
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