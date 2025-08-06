// components/booking-summary.tsx
"use client";

import type { UseFormReturn } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2 } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { BsPersonStanding } from "react-icons/bs";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "./ui/input";
import { BookNowSheet } from "./book-now-sheet";

interface BookingSummaryProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
    roomType: string;
    roomPrice: number;
    checkIn: string;
    checkOut: string;
    onRemoveRoom: (roomId: string) => void;
}

export function BookingSummary({
    form,
    roomType,
    roomPrice,
    checkIn,
    checkOut,
    onRemoveRoom
}: BookingSummaryProps) {
    const rooms = form.watch("rooms") || [];
    const totalAmount = roomPrice * rooms.length;
    const [bookNowOpen, setBookNowOpen] = useState(false)
    const router = useRouter();
    const [showPromoInput, setShowPromoInput] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const [promoError, setPromoError] = useState("");

    const handleRemoveRoom = (roomId: string) => {
        onRemoveRoom(roomId);

        // Use setTimeout to allow state update before checking length
        setTimeout(() => {
            const updatedRooms = form.getValues("rooms") || [];
            if (updatedRooms.length === 0) {
                router.push('/');
            }
        }, 0);
    }

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold leading-[28px]">Booking Details</CardTitle>
                    <Link href={"/"}>
                        <Button variant="outline" size="sm" className="bg-[#f3a32d] cursor-pointer px-6 py-5 hover:bg-[#f3a32d] hover:text-white text-white">
                            Book more
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {rooms.map((room: any, index: number) => (
                        <div key={room.id} className="space-y-3">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h4 className="font-medium leading-[24px] text-[16px]">{roomType}</h4>
                                    <span onClick={() => setBookNowOpen(true)} className="text-[#008ace] text-[12px] leading-[18px] font-[400] underline cursor-pointer">BOOK NOW</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-1 hover:text-red-500 transition"
                                    onClick={() => handleRemoveRoom(room.id)}
                                >
                                    <Trash2 className="h-4 w-4 text-gray-400 " />
                                </Button>
                            </div>

                            <div className="border p-4 rounded-md">
                                <div className="flex justify-between items-center text-sm">
                                    <div>
                                        <div className="text-[#878787] text-[12px]">Check In</div>
                                        <div>{checkIn}</div>
                                    </div>
                                    <div>
                                        <div className="text-[#878787] text-[12px]">Check Out</div>
                                        <div>{checkOut}</div>
                                    </div>
                                    <div className="flex items-center gap-[2px]">
                                        <div className="text-[#878787] text-[14px]">{room.guestCount}</div>
                                        <BsPersonStanding className="size-5 text-[#212529]" />
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-medium">MYR {roomPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between text-sm mt-4">
                                <span>
                                    Sub Total (<button className="text-[#008ace] underline">Price breakdown</button>)
                                </span>
                                <span className="font-medium">MYR {roomPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    ))}

                    <div className="border-t pt-4 space-y-3">
                        <div className="bg-[#f2f2f2] border border-[#c9c7c7] p-5 rounded-md">
                            {!showPromoInput ? (
                                <div className="text-sm">
                                    Do you have a promo code? <button
                                        className="text-blue-600 underline"
                                        onClick={() => setShowPromoInput(true)}
                                    >
                                        Click here
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="text-sm">
                                        Do you have a promo code? <button
                                            className="text-blue-600 underline"
                                            onClick={() => setShowPromoInput(false)}
                                        >
                                            Click here
                                        </button>
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Promo"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            className="flex-1 bg-white rounded-none"
                                        />
                                        <Button
                                            className="bg-[#f3a32d] hover:bg-[#f3a32d] text-white px-6 rounded-none cursor-pointer"
                                            onClick={() => {
                                                if (!promoCode.trim()) {
                                                    setPromoError("Please enter promo code");
                                                } else {
                                                    setPromoError("");
                                                    // Handle promo code application logic here
                                                    console.log("Applying promo code:", promoCode);
                                                }
                                            }}
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                    {promoError && (
                                        <div className="text-red-500 text-sm">
                                            {promoError}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between font-semibold text-lg">
                            <span className="text-[14px] font-bold leading-[21px]">Total</span>
                            <span className="text-[14px] font-bold leading-[21px]">MYR {totalAmount.toLocaleString()}</span>
                        </div>

                        <div className="space-y-3">
                            <FormField
                                control={form.control}
                                name="agreeToTerms"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="text-[12px] font-[400] leading-[18px]">
                                            By booking, you have agreed to our{" "}
                                            <button className="text-blue-600 underline">Terms and Conditions</button> |
                                            <button className="text-blue-600 underline">Payment Terms</button>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="subscribeNewsletter"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-[12px] font-[400] leading-[18px] text-black">
                                                Subscribe to Pavilion Ceylon Hill Suites by Perfect Host Newsletter
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full rounded-sm bg-[#f3a32d] hover:bg-[#f3a32d] text-white py-3"
                            onClick={form.handleSubmit((data) => console.log(data))}
                        >
                            Pay Now
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <BookNowSheet
                open={bookNowOpen}
                onOpenChange={setBookNowOpen}
            />
        </>
    )
}