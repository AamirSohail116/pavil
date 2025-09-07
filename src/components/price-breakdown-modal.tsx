"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCurrencyStore } from "@/store/useCurrencyStore"

interface PriceBreakdownModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    roomType: string
    checkIn: string
    checkOut: string
    basePrice: number
    discount?: {
        percentage: number
        amount: number
    }
    nights: number
    max_guests: number
    rooms: number
    prices: Record<string, number>
}

export function PriceBreakdownModal({
    open,
    onOpenChange,
    roomType,
    checkIn,
    checkOut,
    basePrice,
    discount,
    nights,
    max_guests,
    rooms,
    prices
}: PriceBreakdownModalProps) {
    const discountAmount = discount?.amount || 0
    const finalPrice = basePrice - discountAmount
    const { rate, currencyCode } = useCurrencyStore();

    const pricesObject = prices || {};
    const priceEntries = Object.entries(pricesObject);

    // Calculate total price and number of nights
    const totalPrice = priceEntries.reduce((sum, [, price]) => sum + price, 0);
    const numberOfNights = priceEntries.length;

    // Format date function
    const formatDate = (dateKey: string): string => {
        // Convert "Sep 2, 25" format to "02-09-2025"
        const [month, day, year] = dateKey.split(' ');
        const monthMap: Record<string, string> = {
            'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
            'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
        };
        const fullYear = year.length === 2 ? `20${year}` : year;
        return `${day.replace(',', '').padStart(2, '0')}-${monthMap[month]}-${fullYear}`;
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className="sm:max-w-[700px] h-auto">
                <DialogHeader className="flex flex-row items-center justify-between text-[18px] font-[500] space-y-0 p-4 bg-[#dedede] text-[#008ace]">
                    <DialogTitle className="text-lg font-normal text-[#008ace]">Price breakdown</DialogTitle>
                    <Button variant="ghost" size="sm" className=" cursor-pointer h-8 w-8 p-0 bg-white" onClick={() => onOpenChange(false)}>
                        <X className="h-4 w-4 text-black" />
                    </Button>
                </DialogHeader>

                <div className="space-y-4 px-10 py-4">
                    {/* Room Type */}
                    <div className="text-[14px] font-[400] leading-[26px] text-[#212529]">
                        <span className="font-medium">{roomType}</span>
                        <span className=" ml-1">( BOOK NOW )</span>
                    </div>

                    <div className="border space-y-4 rounded-md">
                        {/* Date and Base Price */}
                        <div className="">
                            {priceEntries.map(([dateKey, price], index) => (
                                <div key={index} className="flex justify-between items-center border-b p-3 ">
                                    <div className="text-sm text-gray-600">{(dateKey)}</div>
                                    <div className="text-sm font-medium">{currencyCode} {(price * rate).toFixed(1)}</div>
                                </div>
                            ))}
                        </div>


                        {/* Discount */}
                        {/* {discount && (
                            <div className="flex justify-between items-center border-b pt-0 px-3 pb-3">
                                <div className="text-sm text-red-500">{discount.percentage}% Off</div>
                                <div className="text-sm text-red-500">(-) MYR {discountAmount.toFixed(0)}</div>
                            </div>
                        )} */}

                        {/* Subtotal */}
                        <div className="flex justify-between items-center border-b pt-0 px-3 pb-3">
                            <div className="text-sm text-gray-600">
                                Total Rate for {numberOfNights} Night{numberOfNights !== 1 ? 's' : ''} {max_guests || 1} Guests
                            </div>
                            <div className="text-sm font-medium">{currencyCode} {(totalPrice * rate).toFixed(1)}</div>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="border p-3">
                        <div className="flex justify-between items-center">
                            <div className="text-base font-semibold">Total</div>
                            <div className="text-base font-semibold">{currencyCode} {(totalPrice * rate).toFixed(1)}</div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
