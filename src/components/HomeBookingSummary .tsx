// components/home-booking-summary.tsx
"use client"

import type { Room } from "@/types/hotel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { BsPersonStanding } from "react-icons/bs"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { BookNowSheet } from "./book-now-sheet"
import Link from "next/link"
import { useCurrencyStore } from "@/store/useCurrencyStore"

interface HomeBookingSummaryProps {
    roomTypes: Room[]
    setShowSummary?: (show: boolean) => void
}

interface BookingItem {
    roomId: string
    quantity: number
    price: number
    checkIn: string
    checkOut: string
    roomType?: string
}

export function HomeBookingSummary({ roomTypes, setShowSummary }: HomeBookingSummaryProps) {
    const [bookingData, setBookingData] = useLocalStorage<BookingItem[]>("bookingData", [])
    const router = useRouter()
    const [bookNowOpen, setBookNowOpen] = useState(false)
    const { rate, currencyCode } = useCurrencyStore();

    useEffect(() => {
        if (!bookingData || bookingData.length === 0) {
            setShowSummary?.(false)
        }
    }, [bookingData, setShowSummary])

    if (!bookingData || bookingData.length === 0) {
        return null
    }

    const removeRoomInstance = (roomTypeId: string) => {
        setBookingData((prev) => {
            const newData = [...prev]
            const index = newData.findIndex((item) => item.roomId === roomTypeId)

            if (index >= 0) {
                if (newData[index].quantity > 1) {
                    newData[index] = { ...newData[index], quantity: newData[index].quantity - 1 }
                } else {
                    newData.splice(index, 1)
                }
            }

            return newData
        })
    }

    // Flatten booking data into individual room instances
    const roomInstances = bookingData.flatMap((item) =>
        Array(item.quantity)
            .fill(null)
            .map((_, i) => ({
                ...item,
                instanceId: `${item.roomId}-${i}`,
            })),
    )

    const totalAmount = bookingData.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    ) * rate;


    return (
        <>
            <Card className="">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold leading-[28px]">Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {roomInstances.map((roomInstance) => {
                        const room = roomTypes?.find?.(
                            (rt) => rt.id?.toString() === roomInstance.roomId?.toString()
                        )


                        return (
                            <div key={roomInstance.instanceId} className="space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h4 translate="no" className="font-medium leading-[24px] text-[16px]">
                                            {room?.room_name || roomInstance.roomType || "Unknown Room"}
                                        </h4>
                                        <span
                                            translate="no"
                                            onClick={() => setBookNowOpen(true)}
                                            className="text-[#008ace] text-[12px] leading-[18px] font-[400] underline cursor-pointer"
                                        >
                                            BOOK NOW
                                        </span>
                                    </div>
                                    <Button
                                        translate="no"
                                        variant="ghost"
                                        size="sm"
                                        className="p-1 hover:text-red-500 transition"
                                        onClick={() => removeRoomInstance(roomInstance.roomId)}
                                    >
                                        <Trash2 className="h-4 w-4 text-gray-400" />
                                    </Button>
                                </div>

                                <div className="border py-4 px-2 lg:p-4 rounded-md">
                                    <div className="flex flex-row justify-between items-center text-sm">
                                        <div className="flex flex-1 flex-col xl:flex-row xl:items-center gap-3">
                                            <div>
                                                <div className="text-[#878787] text-[12px]">Check In</div>
                                                <div>{roomInstance.checkIn}</div>
                                            </div>
                                            <div>
                                                <div className="text-[#878787] text-[12px]">Check Out</div>
                                                <div>{roomInstance.checkOut}</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 items-center justify-between gap-2">
                                            <div className="flex items-center gap-[2px]">
                                                <div className="text-[#878787] text-[14px]">{room?.max_guests || 2}</div>
                                                <BsPersonStanding className="size-5 text-[#212529]" />
                                            </div>
                                            <div className="flex items-center">
                                                <span className="font-medium">{currencyCode} {(roomInstance.price * rate).toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm mt-4 border-b pb-3">
                                    <span className="text-[12px] font-bold">Sub Total</span>
                                    <span className="font-bold text-[12px]">{currencyCode} {(roomInstance.price * rate).toFixed(1)}</span>
                                </div>

                                <div className="flex justify-between text-sm mt-4 border-b pb-3">
                                    <span className="text-[12px] font-bold">Total</span>
                                    <span className="font-bold text-[12px]">{currencyCode} {totalAmount.toFixed(1)}</span>
                                </div>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
            <Link
                href={"/reserve-booking"}
                className="mt-4 flex justify-center py-3 mx-1 text-[14px] font-bold leading-[21px] items-center bg-[#dedede] text-[#008ace] border border-[#008ace]"
            >
                Complete Booking
            </Link>
            {/* <BookNowSheet open={bookNowOpen} onOpenChange={setBookNowOpen} /> */}
        </>
    )
}