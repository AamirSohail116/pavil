interface BookingDetailsProps {
    guestName: string
    message: string
    bookingDate: string
    checkInDate: string
    checkOutDate: string
    nights: number
    arrivalTime: string
    specialRequest?: string
}

export function BookingDetails({
    guestName,
    message,
    bookingDate,
    checkInDate,
    checkOutDate,
    nights,
    arrivalTime,
    specialRequest,
}: BookingDetailsProps) {
    return (
        <div className="bg-[#dedede] p-6 rounded-lg mb-3">
            <p className="text-black mb-4">Dear {guestName},</p>

            <p className="text-black mb-6">{message}</p>

            <div className="mb-6">
                <h3 className="bg-[#f3a32d] text-white px-3 py-1 rounded font-bold inline-block mb-3">Booking Details</h3>
                <div className="text-black space-y-1">
                    <p>Booking Date : {bookingDate}</p>
                    <p>Check In Date : {checkInDate}</p>
                    <p>Check Out Date : {checkOutDate}</p>
                    <p>Nights : {nights}</p>
                    <p>Arrival Time : {arrivalTime}</p>
                    {specialRequest && <p>Special Request : {specialRequest}</p>}
                </div>
            </div>
        </div>
    )
}
