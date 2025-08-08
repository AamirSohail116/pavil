import { HeroSection } from "@/components/hero-section"
import { BookingFilters } from "@/components/booking-filters"
import HotelBookingCard from "@/components/hotel-booking-card"
import PropertyDetails from "@/components/property-details"
import { hotelRooms } from "@/data/roomData"


export default function Home() {
  return (

    <div className="">
      <HeroSection />
      {/* <BookingFilters /> */}
      <div className="space-y-2">
        {hotelRooms.map((hotel, index) => (
          <HotelBookingCard hotel={hotel} key={index} />
        ))}

      </div >
      <div>
        <PropertyDetails />
      </div>
    </div >
  )
}
