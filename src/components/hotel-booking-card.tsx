// components/hotel-booking-card.tsx (updated)
"use client";

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { GoArrowUpRight } from "react-icons/go";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { BsPersonStanding } from "react-icons/bs";
import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { RoomDetailsSheet } from "./room-details-sheet"
import { BookNowSheet } from "./book-now-sheet"
import { Room } from "@/data/roomData"

interface roomsData {
    hotel: Room;
}

export default function HotelBookingCard({ hotel }: roomsData) {
    const [roomDetailsOpen, setRoomDetailsOpen] = useState(false)
    const [bookNowOpen, setBookNowOpen] = useState(false)
    const [roomCount, setRoomCount] = useState(1)

    const images = [
        "/slider-img-1.jpg",
        "/slider-img-2.jpg",
        "/slider-img-3.jpg",
        "/slider-img-4.jpg",
    ]

    // Hardcoded dates for example
    const checkIn = '2025-10-14';
    const checkOut = '2025-11-21';

    return (
        <>
            <div className="w-full overflow-hidden grid grid-cols-3 shadow-lg p-5 mt-2 bg-white rounded-md">
                {/* Image Slider Section */}
                <div className="relative col-span-1">
                    <Carousel className="w-full">
                        <div className="relative">
                            <CarouselContent>
                                {images.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <div className="relative h-64 lg:h-[200px] w-full">
                                            <Image
                                                src={image}
                                                alt={`Hotel room view ${index + 1}`}
                                                fill
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1 rounded-full shadow" />
                            <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1 rounded-full shadow" />
                        </div>
                    </Carousel>
                </div>

                {/* Content Section */}
                <div className="col-span-2 ml-5">
                    <div className="space-y-4">
                        {/* Header */}
                        <div className="flex justify-between border-b pb-4">
                            <div className="space-y-4">
                                <h2 className="text-[16px] font-[500] leading-[19px] text-[#008ace]">{hotel.name}</h2>
                                <button
                                    onClick={() => setRoomDetailsOpen(true)}
                                    className="flex items-center cursor-pointer gap-1 text-[#008ace] underline text-[12px] font-[300] leading-[14px]">
                                    More Info <GoArrowUpRight className="size-4 mt-[2px]" />
                                </button>
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center bg-[#dedede] font-bold text-black gap-1 px-[6px] py-[1px]">
                                    <span>2</span>
                                </div>
                                <span className="flex items-center bg-[#dedede] font-bold text-black gap-1 px-[6px] py-[1px]">2345</span>
                                <div className="flex items-center bg-[#dedede] font-bold text-black gap-1 px-[6px] py-[1px]">
                                    <span>3</span>
                                </div>
                            </div>
                        </div>

                        {/* Book Now Section */}
                        <div className="space-y-3 flex justify-between items-center gap-5">
                            <div className="flex-1">
                                <div>
                                    <h3 className="font-[400] text-[14px] leading-normal text-black mb-1">BOOK NOW</h3>
                                    <button
                                        onClick={() => setBookNowOpen(true)}
                                        className="flex items-center cursor-pointer gap-1 text-[#008ace] underline text-[12px] font-[300] leading-[14px]">
                                        More Info <GoArrowUpRight className="size-4 mt-[2px]" />
                                    </button>
                                </div>
                                {/* Discount Badges */}
                                <div className="flex gap-2 mt-2">
                                    <div className="border text-[14px] font-bold py-[2px] px-1 border-[#ff0000]">
                                        10% Off
                                    </div>
                                    <button className="bg-red-600 hover:bg-red-700 px-2 py-1 text-white">Save MYR 35</button>
                                </div>
                            </div>
                            <div className="flex items-center mr-8">
                                <span className="text-[14px] font-[500]">2</span>
                                <BsPersonStanding className="size-5 text-[#696969]" />
                            </div>

                            <div className="flex flex-col items-center mr-5">
                                <span className="text-[12px] font-[300] text-[#696969]">Room</span>
                                <Select
                                    value={roomCount.toString()}
                                    onValueChange={(val) => setRoomCount(parseInt(val))}
                                >
                                    <SelectTrigger className="w-16 h-8">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="3">3</SelectItem>
                                        <SelectItem value="4">4</SelectItem>
                                        <SelectItem value="5">5</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="text-right">
                                <div className="text-[12px] font-normal text-black line-through">MYR 720</div>
                                <div className="text-[16px] font-[500] text-black">MYR 648 ▶</div>
                                <div className="text-[10px] text-black font-normal">Tax Inclusive</div>
                            </div>
                            <Link
                                href={{
                                    pathname: "/reserve-booking",
                                    query: {
                                        roomType: hotel.name,
                                        roomPrice: 648, // Use discounted price
                                        checkIn,
                                        checkOut,
                                        rooms: roomCount
                                    }
                                }}
                                className="cursor-pointer ml-6"
                            >
                                <Button className="bg-[#f3a32d] cursor-pointer rounded-none text-white font-[400]">Book</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <RoomDetailsSheet
                open={roomDetailsOpen}
                onOpenChange={setRoomDetailsOpen}
            />
            <BookNowSheet
                open={bookNowOpen}
                onOpenChange={setBookNowOpen}
            />
        </>
    )
}