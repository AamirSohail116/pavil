"use client"

import Image from "next/image"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Room } from "@/types/hotel";

interface BookNowSheetProps {
    open: boolean
    onOpenChange: (open: boolean) => void;
    room: Room
}

export function BookNowSheet({ open, onOpenChange, room }: BookNowSheetProps) {


    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full max-w-4xl p-0 overflow-y-auto">
                <div className="p-6 w-full">
                    <SheetHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <SheetTitle className="font-[400] text-[14px] leading-normal text-black">BOOK NOW</SheetTitle>
                    </SheetHeader>

                    <div className="mt-6 space-y-4">
                        {/* Save while you stay */}
                        <div>
                            <h3 className="text-[12px] font-[400] leading-[26px] mb-2">Save while you stay!</h3>
                            <p className="text-[12px] font-[400] leading-[26px] mb-4">
                                Enjoy 10% off each booking by reserving through our website using promo code{' '}
                                <span className="font-[600]">[PERFECT10]</span>!
                            </p>
                        </div>

                        {/* Promotional Banner */}
                        <div className="flex flex-col md:flex-row gap-6 h-[266px]">
                            <div className="flex-1 relative">
                                <Image
                                    src="/offer-img.jpeg"
                                    alt="Room"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="border-b flex items-center justify-between px-4 py-2">
                                    <h5 className=" font-[400] text-[12px] leading-[18px]">Child Age</h5>
                                    <p className="font-[400] text-[12px] leading-[18px]">2 - 10 Years</p>
                                </div>
                                <div className="flex items-center justify-between  px-4">
                                    <h5 className="font-[400] text-[12px] leading-[18px]">Infant Age</h5>
                                    <p className="font-[400] text-[12px] leading-[18px]">0 - 1 Year</p>
                                </div>
                            </div>
                        </div>


                        {/* Cancellation Policy */}
                        <div className=" p-4">
                            <h3 className="text-[16px] font-[500] leading-[19px]">Cancellation Policy</h3>
                            <p className=" font-[400] text-[12px] leading-[26px]">
                                The guest can cancel free of charge up to 3 days prior to arrival. If cancelled within 3 days of arrival, 100% of the Entire Stay shall be charged.
                            </p>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
