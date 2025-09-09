interface ConfirmationHeaderProps {
    date: string
    poweredBy: string
    bookingReference: string
    hotelName: string
    hotelAddress: string
    hotelContact: string
    hotelEmail: string
}

export function ConfirmationHeader({
    date,
    poweredBy,
    bookingReference,
    hotelName,
    hotelAddress,
    hotelContact,
    hotelEmail
}: ConfirmationHeaderProps) {
    return (
        <div className="bg-[#dedede] p-6 rounded-lg mb-3">

            <div className="border-2 border-black p-4 rounded">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="bg-[#f3a32d] text-white px-3 py-1 rounded text-lg font-bold inline-block mb-2">
                            CONFIRM BOOKING
                        </h1>
                        <div className="text-black">
                            <p className="font-semibold">BOOKING REFERENCE NO</p>
                            <p className="text-xl font-bold">: {bookingReference}</p>
                        </div>
                        <p className="text-black text-sm mt-2">
                            Kindly print this confirmation and have it ready upon check-in at the Hotel
                        </p>
                    </div>

                    <div className="text-right text-black">
                        <h2 className="font-bold text-lg">{hotelName}</h2>
                        <div className="text-sm mt-1">
                            <p>{hotelAddress}</p>
                            <p>{hotelContact}</p>
                            <p>{hotelEmail}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
