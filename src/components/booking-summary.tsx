"use client";

import type { UseFormReturn } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2 } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { BsPersonStanding } from "react-icons/bs";
import Link from "next/link"
import { useState } from "react";
import { Input } from "./ui/input";
import { BookNowSheet } from "./book-now-sheet";
import { Room } from "@/types/hotel"; // Updated import
import { PriceBreakdownModal } from "./price-breakdown-modal";
import { useRouter } from "next/navigation";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { applyCouponCode } from "@/API";
import { usePropertyStore } from "@/hooks/usePropertyInfo";
import { useCreatePayment } from "@/API/useCreatePayment";


interface BookingSummaryProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
    bookingData: Array<{
        roomId: string;
        roomType: string;
        quantity: number;
        price: number;
        checkIn: string;
        checkOut: string;
        prices?: Record<string, number>;
        max_guests?: number;
    }>
    roomInstances: Array<{
        id: string;
        roomTypeId: string;
        firstName: string;
        lastName: string;
        guestCount: string;
    }>;
    roomTypes: Room[]; // Updated type
    onRemoveRoom: (roomId: string) => void;
}

export function BookingSummary({
    form,
    bookingData,
    roomTypes,
    onRemoveRoom,
    roomInstances
}: BookingSummaryProps) {
    const [showPromoInput, setShowPromoInput] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const [promoError, setPromoError] = useState("");
    const [discountData, setDiscountData] = useState<{ discount: number, type: string } | null>(null);
    const [errorMesaage, setErrorMesaage] = useState("")
    const [priceBreakdownOpen, setPriceBreakdownOpen] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedBookingItem, setSelectedBookingItem] = useState<any>(null);
    const router = useRouter()
    const { rate, currencyCode } = useCurrencyStore();
    const { property } = usePropertyStore()

    // Add payment mutation hook
    const createPaymentMutation = useCreatePayment();

    // Calculate total amount
    const totalAmount = bookingData.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );


    const discountedTotal = discountData
        ? discountData.type === "percentage"
            ? totalAmount - (totalAmount * (Number(discountData.discount) / 100))
            : totalAmount - Number(discountData.discount)
        : null;

    const handleApplyCoupon = async () => {
        if (!promoCode.trim()) {
            setPromoError("Please enter promo code");
            return;
        }
        setPromoError("");

        try {
            const res = await applyCouponCode({
                coupon: promoCode,
                property_id: property?.id
            });

            if (res.data && res.data.data) {
                setDiscountData(res.data.data);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setPromoError(err?.response?.data?.message || "Failed to apply coupon");
        }
    };

    // Get room details using the new backend structure
    const getRoomDetails = (roomId: string) => {
        return roomTypes.find(room => room.id?.toString() === roomId);
    }

    const calculateNights = (checkIn: string, checkOut: string) => {
        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkOut)
        const timeDiff = checkOutDate.getTime() - checkInDate.getTime()
        return Math.ceil(timeDiff / (1000 * 3600 * 24))
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePriceBreakdownClick = (bookingItem: any, room: Room | undefined) => {
        setSelectedBookingItem({
            ...bookingItem,
            room,
            nights: calculateNights(bookingItem.checkIn, bookingItem.checkOut),
        })
        setPriceBreakdownOpen(true)
    }

    // Handle payment submission
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // Handle payment submission
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePayNow = (formData: any) => {
        setErrorMesaage('')

        // Get the first booking item and room instance
        const bookingItem = bookingData[0]; // Assuming first booking item
        const roomInstance = formData.rooms[0]; // Get first room from form data

        if (!bookingItem || !roomInstance || !property) {
            console.error('Missing booking data or room instance');
            return;
        }

        // Example: selected country code from your form/store
        const countryCode = formData.countryCode || "+62";

        // Combine country code + contact number
        const formattedContactNo = `${countryCode}${formData.contactNumber.replace(/^0+/, "")}`;

        // Map the form data to payment API format
        const paymentData = {
            // Required fields
            check_in: bookingItem.checkIn,
            check_out: bookingItem.checkOut,
            guests: Number(roomInstance.guestCount),
            property_id: property.id,
            room_id: roomInstance.roomTypeId,
            first_name: roomInstance.firstName,
            last_name: roomInstance.lastName,
            contact_no: formattedContactNo,
            email: formData.email,

            // Optional fields
            coupon_code: promoCode || "",
            special_request: formData.specialRequest || "",
            estimated_arrival_time: formData.estimatedArrival || "",
            booking_for_other: formData.bookingForSomeoneElse ? "yes" : "no",
            other_first_name: formData.contactFirstName || "",
            other_last_name: formData.contactLastName || ""
        };


        createPaymentMutation.mutate(paymentData, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (err: any) => {
                setErrorMesaage(err?.response?.data?.message)
            }
        });
    };


    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold leading-[28px]">Booking Details</CardTitle>
                    {/* <Link href={"/"} passHref>
                        <Button variant="outline" size="sm" className="bg-[#f3a32d] cursor-pointer px-6 py-5 hover:bg-[#f3a32d] hover:text-white text-white">
                            Book more
                        </Button>
                    </Link> */}
                </CardHeader>
                <CardContent className="space-y-4">
                    {roomInstances.map((roomInstance) => {
                        const bookingItem = bookingData.find(item => item.roomId === roomInstance.roomTypeId);
                        if (!bookingItem) return null;

                        const room = getRoomDetails(bookingItem.roomId);


                        return (
                            <div key={roomInstance.id} className="space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h4 translate="no" className="font-medium leading-[24px] text-[16px]">
                                            {bookingItem.roomType}
                                        </h4>
                                        {/* <span translate="no" onClick={() => setBookNowOpen(true)} className="text-[#008ace] text-[12px] leading-[18px] font-[400] underline cursor-pointer">BOOK NOW</span> */}
                                    </div>
                                    <Button
                                        translate="no"
                                        variant="ghost"
                                        size="sm"
                                        className="p-1 hover:text-red-500 transition"
                                        onClick={() => onRemoveRoom(roomInstance.id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-gray-400 " />
                                    </Button>
                                </div>

                                <div className="border py-4 px-2 lg:p-4 rounded-md">
                                    <div className="flex flex-row justify-between items-center text-sm">
                                        <div className="flex flex-1 flex-col xl:flex-row xl:items-center gap-3">
                                            <div>
                                                <div className="text-[#878787] text-[12px]">Check In</div>
                                                <div>{bookingItem.checkIn}</div>
                                            </div>
                                            <div>
                                                <div className="text-[#878787] text-[12px]">Check Out</div>
                                                <div>{bookingItem.checkOut}</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 items-center justify-between gap-2">
                                            <div className="flex items-center gap-[2px]">
                                                <div className="text-[#878787] text-[14px]">{bookingItem?.max_guests || 2}</div>
                                                <BsPersonStanding className="size-5 text-[#212529]" />
                                            </div>
                                            <div className="flex items-center">
                                                <span className="font-medium">
                                                    {currencyCode} {(bookingItem.price * rate).toFixed(0)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm mt-4 border-b pb-3">
                                    <span>
                                        Sub Total (<button
                                            onClick={() => handlePriceBreakdownClick(bookingItem, room)}
                                            className="text-[#008ace] cursor-pointer underline">Price breakdown</button>)
                                    </span>
                                    <span className="font-medium"> {currencyCode} {(bookingItem.price * rate).toFixed(0)}</span>
                                </div>
                            </div>
                        );
                    })}

                    <div className="border-t pt-4 space-y-3">
                        <div translate="no" className="bg-[#f2f2f2] border border-[#c9c7c7] p-5 rounded-md">
                            {!showPromoInput ? (
                                <div className="text-sm">
                                    Do you have a promo code? <button
                                        className="text-blue-600 underline cursor-pointer"
                                        onClick={() => setShowPromoInput(true)}
                                    >
                                        Click here
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="text-sm">
                                        Do you have a promo code? <button
                                            className="text-blue-600 underline cursor-pointer"
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
                                                    handleApplyCoupon()
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
                            <span className={`text-[14px] font-bold leading-[21px] ${discountedTotal ? "line-through text-gray-500" : ""}`}>MYR {totalAmount.toFixed(0)}</span>

                        </div>
                        {
                            discountedTotal && (
                                <div className="flex justify-between font-semibold text-lg">
                                    <span className="text-[14px] font-bold leading-[21px]">Discounted Total</span>
                                    <span className="text-[14px] font-bold leading-[21px]">MYR {discountedTotal.toFixed(0)}</span>
                                </div>
                            )
                        }

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
                                            <Link
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={"https://dormeodestinations.my/terms-&-conditions"} className="text-blue-600 underline">Terms and Conditions</Link> |
                                            <Link
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={"https://dormeodestinations.my/payment-term"} className="text-blue-600 underline">Payment Terms</Link>
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
                                                Subscribe to Royce Residences by Dormeo Destinations Newsletter
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>


                        <Button
                            className="w-full cursor-pointer rounded-sm bg-[#f3a32d] hover:bg-[#f3a32d] text-white py-3"
                            onClick={form.handleSubmit(handlePayNow)}
                            disabled={createPaymentMutation.isPending}
                        >
                            <span>{createPaymentMutation.isPending ? 'Processing...' : 'Pay Now'}</span>
                        </Button>
                        {errorMesaage && (
                            <span className=" text-red-500 text-[14px] font-semibold">{errorMesaage}</span>
                        )}

                    </div>
                </CardContent>
            </Card>
            {/* <BookNowSheet
                open={bookNowOpen}
                onOpenChange={setBookNowOpen}
            /> */}
            {selectedBookingItem && (
                <PriceBreakdownModal
                    open={priceBreakdownOpen}
                    onOpenChange={setPriceBreakdownOpen}
                    roomType={selectedBookingItem.roomType}
                    checkIn={selectedBookingItem.checkIn}
                    checkOut={selectedBookingItem.checkOut}
                    basePrice={360} // You can calculate this based on your logic
                    discount={{
                        percentage: 10,
                        amount: 36,
                    }}
                    prices={selectedBookingItem.prices}
                    nights={selectedBookingItem.nights}
                    max_guests={selectedBookingItem.max_guests}
                    rooms={1}
                />
            )}
        </>
    )
}