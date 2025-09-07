"use client"

import { ConfirmationHeader } from "@/components/confirmation-header"
import { BookingDetails } from "@/components/booking-details"
import { GuestDetails } from "@/components/guest-details"
import { DataTable } from "@/components/data-table"
import { RatesSummary } from "@/components/rates-summary"

export default function PaymentSuccessPage() {
    const roomColumns = [
        { header: "Room Type", key: "roomType" },
        { header: "Guest(s)", key: "guests" },
        { header: "No of rooms", key: "rooms", className: "text-center" },
        { header: "Package if any", key: "package", className: "text-center" },
        { header: "Promotion if any", key: "promotion", className: "text-center" },
    ]

    const roomData = [
        {
            roomType: "Duplex 3 Bedroom\nDescription: Duplex 3 Bedroom child Room Only",
            guests: "6 adult & 2",
            rooms: "1",
            package: "None",
            promotion: "None",
        },
    ]

    const inclusionColumns = [
        { header: "Charge", key: "charge" },
        { header: "Charge Rate", key: "rate", className: "text-right" },
    ]

    const inclusionData = [
        {
            charge: "Cleaning Fees",
            rate: "RM 80.00",
        },
    ]

    const ratesData = [
        { label: "Total Room Charges", amount: "400.00" },
        { label: "Room Charges Tax", amount: "" },
        { label: "Inclusions Including Tax", amount: "0.00" },
        { label: "Extra Charges Including Discount and Tax", amount: "80.00" },
        { label: "Round Off", amount: "0.00" },
        { label: "Grand Total", amount: "0.00", isTotal: true },
        { label: "Total Paid", amount: "480.00", isTotal: true },
        { label: "Amount due at time of check in", amount: "480.00", isTotal: true },
    ]

    return (
        <div className=" bg-white">
            <div className=" w-full mx-auto py-3">
                <ConfirmationHeader
                    date="21/07/2025, 12:07"
                    poweredBy="eZen Absolute - Powered By YCS"
                    bookingReference="WB9013684"
                    hotelName="NOVO Ampang"
                    hotelAddress="315, Jalan Ampang, Desa Pahlawan, NOVO Suites by COBNB, Kuala Lumpur - 55000, Kuala Lumpur, Malaysia novo.cobnb@gmail.com"
                    hotelContact="Phone : +60115875017"
                />

                <BookingDetails
                    guestName="Sara S"
                    message="Thank you for choosing NOVO Ampang for your stay. We are pleased to inform you that your reservation request is CONFIRMED and your reservation details are as follows."
                    bookingDate="21/07/2025"
                    checkInDate="28/07/2025"
                    checkOutDate="29/07/2025 11:00:00 AM"
                    nights={1}
                    arrivalTime="03:00:00 PM"
                    specialRequest=""
                />

                <GuestDetails name="Sara S" email="novo.ampang@gmail.com" phone="+60 122890395" />

                <DataTable title="Rooms Details" columns={roomColumns} data={roomData} />

                <DataTable title="Inclusion Details" columns={inclusionColumns} data={inclusionData} />

                <RatesSummary title="Rates Details" items={ratesData} />

                {/* <div className="bg-[#dedede] p-6 rounded-lg mb-6">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button className="bg-[#f3a32d] hover:bg-[#e8932a] text-white">
                            <Download className="w-4 h-4 mr-2" />
                            Download Confirmation
                        </Button>
                        <Button className="bg-[#f3a32d] hover:bg-[#e8932a] text-white">
                            <Mail className="w-4 h-4 mr-2" />
                            Email Confirmation
                        </Button>
                        <Button className="bg-[#f3a32d] hover:bg-[#e8932a] text-white">
                            <Phone className="w-4 h-4 mr-2" />
                            Contact Hotel
                        </Button>
                    </div>
                </div>

                <div className="text-center text-black text-sm">
                    <p>https://live.ipms247.com/frontoffice/reservations</p>
                    <p className="mt-2">1/2</p>
                </div> */}
            </div>
        </div>
    )
}
