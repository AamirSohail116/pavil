"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Users, Bed, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GoArrowUpRight } from "react-icons/go";
import { Badge } from "@/components/ui/badge"
import { FaUser } from "react-icons/fa";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { FaBed } from "react-icons/fa6";
import { BsPersonStanding } from "react-icons/bs";

import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"



export default function HotelBookingCard() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const images = [
        "/slider-img-1.jpg",
        "/slider-img-2.jpg",
        "/slider-img-3.jpg",
        "/slider-img-4.jpg",
    ]

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <div className="w-full  overflow-hidden grid grid-cols-3 shadow-lg p-5 mt-2 bg-white rounded-md">
            {/* Image Slider Section */}
            <div className="relative col-span-1">
                <Carousel className="w-full ">
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

                        {/* Absolute navigation buttons */}
                        <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1 rounded-full shadow" />
                        <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1 rounded-full shadow" />
                    </div>
                </Carousel>
            </div>


            {/* Content Section */}
            <div className=" col-span-2 ml-5">
                <div className="space-y-4">
                    {/* Header */}
                    <div className="flex  justify-between border-b pb-4">
                        <div className="space-y-4">
                            <h2 className="text-[16px] font-[500] leading-[19px] text-[#008ace]">One Bedroom Executive Suite</h2>
                            <button className="flex items-center cursor-pointer gap-1 text-[#008ace] underline text-[12px] font-[300] leading-[14px]">
                                More Info <GoArrowUpRight className=" size-4 mt-[2px] " />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center bg-[#dedede] font-bold text-black gap-1 px-[6px] py-[1px]">
                                <span>2</span>
                                <FaUser className="w-4 h-3 text-black" />
                            </div>
                            <span className="flex items-center bg-[#dedede] font-bold text-black gap-1 px-[6px] py-[1px]">622 sq ft</span>
                            <div className="flex items-center bg-[#dedede] font-bold text-black gap-1 px-[6px] py-[1px]">
                                <FaBed className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* Book Now Section */}
                    <div className="space-y-3 flex justify-between items-center gap-5">
                        <div className=" flex-1">
                            <div>
                                <h3 className="font-[400] text-[14px] leading-normal text-black mb-1">BOOK NOW</h3>
                                <button className="flex items-center cursor-pointer gap-1 text-[#008ace] underline text-[12px] font-[300] leading-[14px]">
                                    More Info <GoArrowUpRight className=" size-4 mt-[2px] " />
                                </button>
                            </div>
                            {/* Discount Badges */}
                            <div className="flex gap-2 mt-2">
                                <div className=" border text-[14px] font-bold py-[2px] px-1 border-[#ff0000]">
                                    10% Off
                                </div>
                                <button className="bg-red-600 hover:bg-red-700 px-2 py-1 text-white">Save MYR 35</button>
                            </div>
                        </div>
                        <div className="flex items-center  mr-8">
                            <span className="text-[14px] font-[500]">2</span>
                            <BsPersonStanding className=" size-5 text-[#696969]" />
                        </div>

                        <div className="flex flex-col items-center  mr-5">
                            <span className="text-[12px] font-[300] text-[#696969]">Room</span>
                            <Select defaultValue="2">
                                <SelectTrigger className="w-16 h-8">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="text-right">
                            <div className="text-[12px] font-normal text-black line-through">MYR 720</div>
                            <div className="text-[16px] font-[500] text-black">MYR 648 ▶</div>
                            <div className="text-[10px] text-black font-normal">Tax Inclusive</div>
                        </div>
                        <Link href={"/reserve-booking"} className=" cursor-pointer ml-6">
                            <Button className=" bg-[#f3a32d] cursor-pointer rounded-none text-white font-[400]">Book</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
