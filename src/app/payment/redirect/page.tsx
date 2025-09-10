"use client"

import { useEffect, useState, Suspense } from "react"
import { useCheckBookingStatus } from "@/API/useCheckBookingStatus"
import { useRouter, useSearchParams } from "next/navigation"
import { ConfirmationHeader } from "@/components/confirmation-header"
import { BookingDetails } from "@/components/booking-details"
import { GuestDetails } from "@/components/guest-details"
import { DataTable } from "@/components/data-table"
import { RatesSummary } from "@/components/rates-summary"

const PaymentRedirectContent = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const orderid = searchParams.get("orderid")
    const [paymentStatus, setPaymentStatus] = useState<"loading" | "success" | "failed">("loading")
    const [errorMessage, setErrorMessage] = useState("")

    const { data, isLoading, isError, error, failureCount } = useCheckBookingStatus(orderid || "")

    useEffect(() => {
        if (data?.success) {
            console.log("✅ Booking success:", data)
            setPaymentStatus("success")
        }
    }, [data])

    useEffect(() => {
        if (isError && failureCount >= 4) {
            setPaymentStatus("failed")
            setErrorMessage(error?.message || "Payment verification failed. Please contact support.")
        }
    }, [isError, failureCount, error])

    const Loader = () => (
        <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600 text-lg">Verifying your payment...</p>
        </div>
    )

    if (paymentStatus === "loading" || isLoading) {
        return (
            <div className="min-h-[79vh] flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <Loader />
                </div>
            </div>
        )
    }

    const invoiceData = data?.invoice_data

    if (paymentStatus === "success" && !invoiceData) {
        return (
            <div className="min-h-[79vh] flex items-center justify-center bg-gray-50">
                <div className="text-center bg-white p-8 rounded-lg shadow-md w-full mx-4">
                    <h2 className="text-2xl font-bold text-gray-600 mb-2"> Available</h2>
                    <p className="text-gray-600 mb-4">Booking confirmation data is not available.</p>
                </div>
            </div>
        )
    }

    const roomColumns = [
        { header: "Room Type", key: "roomType" },
        { header: "Guest(s)", key: "guests" },
        { header: "No of rooms", key: "rooms", className: "text-center" },

    ]

    const roomData = invoiceData?.room_details
        ? [
            {
                roomType: invoiceData.room_details.name || "",
                guests: invoiceData.room_details.guests || "",
                rooms: invoiceData.room_details.no_of_rooms?.toString() || "",

            },
        ]
        : []

    const inclusionColumns = [
        { header: "Charge", key: "charge" },
        { header: "Charge Rate", key: "rate", className: "text-right" },
    ]

    const inclusionData =
        invoiceData?.discount && invoiceData.discount !== "RM 0.00"
            ? [
                {
                    charge: "Discount Applied",
                    rate: invoiceData.discount,
                },
            ]
            : []

    const ratesData = invoiceData
        ? [
            { label: "Sub Total", amount: invoiceData.sub_total?.replace("RM ", "") || "0.00" },
            { label: "Discount", amount: invoiceData.discount?.replace("RM ", "") || "0.00" },
            { label: "Total Paid", amount: invoiceData.total_paid?.replace("RM ", "") || "0.00", isTotal: true },
        ]
        : []

    return (
        <div className="min-h-[79vh] flex items-center justify-center bg-gray-50">
            <div className="">
                {paymentStatus === "success" ? (
                    <div className=" bg-white">
                        <div className=" w-full mx-auto py-3">
                            <ConfirmationHeader
                                date={invoiceData?.booking_date ? `${invoiceData.booking_date}, 12:07` : ""}
                                poweredBy="eZen Absolute - Powered By YCS"
                                bookingReference={invoiceData?.booking_no || ""}
                                hotelName={invoiceData?.property_name || ""}
                                hotelAddress={invoiceData?.property_address || ""}
                                hotelContact={invoiceData?.property_phone ? `Phone : ${invoiceData.property_phone}` : ""}
                                hotelEmail={invoiceData?.property_email ? `Email : ${invoiceData.property_email}` : ""}
                            />

                            <BookingDetails
                                guestName={invoiceData?.customer_name || ""}
                                message={`Thank you for choosing ${invoiceData?.property_name || "us"} for your stay. We are pleased to inform you that your reservation request is CONFIRMED and your reservation details are as follows.`}
                                bookingDate={invoiceData?.booking_date || ""}
                                checkInDate={invoiceData?.checkin_date || ""}
                                checkOutDate={invoiceData?.checkout_date || ""}
                                nights={invoiceData?.nights || 0}
                                arrivalTime={invoiceData?.arrival_time || ""}
                                specialRequest={invoiceData?.special_request || ""}
                            />

                            <GuestDetails
                                name={invoiceData?.customer_name || ""}
                                email={invoiceData?.customer_email || ""}
                                phone={invoiceData?.customer_phone || ""}
                            />

                            <DataTable title="Rooms Details" columns={roomColumns} data={roomData} />

                            {inclusionData.length > 0 && (
                                <DataTable title="Inclusion Details" columns={inclusionColumns} data={inclusionData} />
                            )}

                            <RatesSummary title="Rates Details" items={ratesData} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="text-center bg-white p-8 rounded-lg shadow-md  w-full ">
                            <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h2>
                            <p className="text-gray-600 mb-4">{errorMessage}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const PaymentRedirectPage = () => {
    return (
        <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
            <PaymentRedirectContent />
        </Suspense>
    )
}

export default PaymentRedirectPage
