import { HeroSection } from "@/components/hero-section"
import { BookingFilters } from "@/components/booking-filters"
import HotelBookingCard from "@/components/hotel-booking-card"
import PropertyDetails from "@/components/property-details"


export default function Home() {
  return (

    <div className="">
      <HeroSection />
      <BookingFilters />
      <div className="space-y-2">
        < HotelBookingCard />
        <HotelBookingCard />
        <HotelBookingCard />
        <HotelBookingCard />
      </div >
      <div>
        <PropertyDetails />
      </div>
    </div >
  )
}
