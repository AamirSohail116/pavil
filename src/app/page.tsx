"use client";

import { HeroSection } from "@/components/hero-section";
import { BookingFilters } from "@/components/booking-filters";
import HotelBookingCard from "@/components/hotel-booking-card";
import PropertyDetails from "@/components/property-details";
import { hotelRooms } from "@/data/roomData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { HomeBookingSummary } from "@/components/HomeBookingSummary ";

export default function Home() {
  const [bookingData] = useLocalStorage("bookingData", []);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (bookingData.length > 0) {
      const timer = setTimeout(() => {
        setShowSummary(true);
      }, 500); // Delay of 500ms to prevent initial flash
      return () => clearTimeout(timer);
    } else {
      setShowSummary(false);
    }
  }, [bookingData]);

  return (
    <div className="">
      <HeroSection />
      <BookingFilters />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Dynamic column span based on summary visibility */}
        <div
          className={`space-y-2 ${showSummary ? "lg:col-span-8" : "lg:col-span-12"
            }`}
        >
          {hotelRooms.map((room) => (
            <HotelBookingCard
              room={room}
              key={room.id}
              showSummary={showSummary}
            />
          ))}
        </div>

        {showSummary && (
          <div className="lg:col-span-4 mt-2">
            <HomeBookingSummary
              roomTypes={hotelRooms}
              setShowSummary={setShowSummary}
            />
          </div>
        )}
      </div>

      <div>
        <PropertyDetails />
      </div>
    </div>
  );
}
