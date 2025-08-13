"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GoArrowUpRight } from "react-icons/go";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FaBed, FaRegCopy, FaUser } from "react-icons/fa6";
import { BsPersonStanding } from "react-icons/bs";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { RoomDetailsSheet } from "./room-details-sheet";
import { BookNowSheet } from "./book-now-sheet";
import { Room } from "@/types/hotel"; // Updated import path
import { ImageSliderModal } from "./image-slider-modal";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { useCurrencyStore } from "@/store/useCurrencyStore";

interface HotelBookingCardProps {
    room: Room;
    showSummary?: boolean;
    check_in: string;
    check_out: string;
}

interface BookingItem {
    roomId: string;
    roomType: string;
    quantity: number;
    price: number;
    checkIn: string;
    checkOut: string;
}

export default function HotelBookingCard({ room, showSummary, check_in, check_out }: HotelBookingCardProps) {
    const [roomDetailsOpen, setRoomDetailsOpen] = useState(false);
    const [bookNowOpen, setBookNowOpen] = useState(false);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [cardOpen, setCardOpen] = useState(false);
    const [bookingData, setBookingData] = useLocalStorage<BookingItem[]>("bookingData", []);
    const { rate, currencyCode } = useCurrencyStore();
    const router = useRouter();

    // Calculate available rooms using the new data structure
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bookedRooms = bookingData.filter((item: any) => item.roomId === room.id?.toString())
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .reduce((sum: number, item: any) => sum + item.quantity, 0);
    const availableRooms = (room.quantity || 0) - bookedRooms;

    const [roomCount, setRoomCount] = useState(availableRooms > 0 ? 1 : 0);

    // Handle images - use slider_images if available, fallback to room_image
    const images = room.slider_images && room.slider_images.length > 0
        ? room.slider_images
        : room.room_image
            ? [room.room_image]
            : [];

    // Calculate prices
    const basePrice = parseFloat(room.price_per_night || "0");
    const discountPercent = 10; // You might want to add this to your Room interface
    const discountPrice = basePrice * (1 - discountPercent / 100);

    // Hardcoded dates for example
    const checkIn = check_in || "2025-11-20";
    const checkOut = check_out || "2025-11-21";

    React.useEffect(() => {
        // Recalculate available rooms
        const bookedRooms = bookingData.filter(item => item.roomId === room.id?.toString())
            .reduce((sum, item) => sum + item.quantity, 0);
        const newAvailableRooms = (room.quantity || 0) - bookedRooms;

        // Reset room count if it exceeds new availability
        if (roomCount > newAvailableRooms) {
            setRoomCount(newAvailableRooms > 0 ? 1 : 0);
        }
    }, [bookingData, room.id, room.quantity, roomCount]);

    const handleBookClick = () => {
        // if (!room.id) return;

        setBookingData(prev => {
            const newBookingData = [...prev];
            const existingIndex = newBookingData.findIndex(item => item.roomId === room.id?.toString());

            if (existingIndex >= 0) {
                newBookingData[existingIndex] = {
                    ...newBookingData[existingIndex],
                    quantity: newBookingData[existingIndex].quantity + roomCount
                };
            } else {
                newBookingData.push({
                    roomId: room.id.toString(),
                    roomType: room.room_name || "Unknown Room",
                    quantity: roomCount,
                    price: discountPrice,
                    checkIn,
                    checkOut
                });
            }
            return newBookingData;
        });

        router.push("/reserve-booking");
    };

    // Parse room description to extract plain text
    const getPlainTextFromHTML = (html: string) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    };

    return (
        <>
            <div className="w-full overflow-hidden relative grid grid-cols-12 md:grid-cols-3 shadow-lg px-2 py-4 lg:p-5 mt-2 bg-white rounded-md">
                {/* Image Slider Section */}
                <div className="relative col-span-12 md:col-span-1">
                    <Carousel className="w-full">
                        <div className="relative">
                            <CarouselContent>
                                {images.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <div className="relative h-[200px] w-full">
                                            <Image
                                                src={image}
                                                alt={`Hotel room view ${index + 1}`}
                                                fill
                                                className="object-cover rounded-md"
                                                onError={(e) => {
                                                    // Fallback image on error
                                                    e.currentTarget.src = '/placeholder-room.jpg';
                                                }}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            {images.length > 1 && (
                                <>
                                    <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1 rounded-full shadow" />
                                    <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1 rounded-full shadow" />
                                </>
                            )}
                            <div
                                onClick={() => setImageModalOpen(true)}
                                className="bg-white/80 size-7 rounded-xs cursor-pointer flex items-center justify-center absolute bottom-2 left-2"
                            >
                                <FaRegCopy className="text-gray-500" />
                            </div>
                        </div>
                    </Carousel>
                </div>

                {/* Content Section */}
                <div className="col-span-12 md:col-span-2 ml-5">
                    <div className="space-y-4">
                        {/* Header */}
                        <div className="flex justify-between border-b pb-4 pt-4 md:pt-0">
                            <div className="space-y-4">
                                <h2 translate="no" className="text-[16px] font-[500] leading-[19px] text-[#008ace]">
                                    {room.room_name || "Room Name Not Available"}
                                </h2>
                                <button
                                    onClick={() => setRoomDetailsOpen(true)}
                                    className="flex items-center cursor-pointer gap-1 text-[#008ace] underline text-[12px] font-[300] leading-[14px]"
                                >
                                    More Info <GoArrowUpRight className="size-4 mt-[2px]" />
                                </button>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <div className="flex items-center bg-[#dedede] font-bold text-black gap-1 px-[6px] py-[1px]">
                                    <span>{room.max_guests || 1}</span>
                                    <FaUser className="w-4 h-3 text-black" />
                                </div>
                                <span className="flex items-center bg-[#dedede] font-bold text-black gap-1 px-[6px] py-[1px]">
                                    {room.room_size || "N/A"}
                                </span>
                                <div className="flex items-center bg-[#dedede] font-bold text-black gap-1 px-[6px] py-[1px]">
                                    <FaBed className="w-4 h-4" />
                                    <span className="text-xs">{room.beds || "1"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Book Now Section */}
                        <div
                            className={`space-y-3 flex flex-col ${showSummary ? "lg:flex-col xl:justify-between" : "lg:flex-row"
                                } gap-1 lg:gap-5`}
                        >
                            <div className="flex-1">
                                <div>
                                    <h3 translate="no" className="font-[400] text-[14px] leading-normal text-black mb-1">
                                        BOOK NOW
                                    </h3>
                                    <button
                                        onClick={() => setBookNowOpen(true)}
                                        className="flex items-center cursor-pointer gap-1 text-[#008ace] underline text-[12px] font-[300] leading-[14px]"
                                    >
                                        More Info <GoArrowUpRight className="size-4 mt-[2px]" />
                                    </button>
                                </div>
                                {/* Discount Badges */}
                                <div className="flex gap-2 mt-2">
                                    <div className="border text-[14px] font-bold py-[2px] px-1 border-[#ff0000]">
                                        {discountPercent}% Off
                                    </div>
                                    <button className="bg-red-600 hover:bg-red-700 px-2 py-1 text-white">
                                        Save {currencyCode} {(basePrice - discountPrice).toFixed(2)}
                                    </button>
                                </div>
                            </div>

                            <div className="flex md:ml-[100px] lg:ml-0 justify-between items-center gap-1 mt-2 sm:mt-0 sm:gap-3 lg:gap-5">
                                <div className="flex items-center mr-8">
                                    <span translate="no" className="text-[14px] font-[500]">{room.max_guests || 1}</span>
                                    <BsPersonStanding className="size-5 text-[#696969]" />
                                </div>

                                <div className="flex flex-col items-center mr-5">
                                    <span className="text-[12px] font-[300] text-[#696969]">
                                        Room
                                    </span>
                                    <Select
                                        value={roomCount.toString()}
                                        onValueChange={(val) => setRoomCount(parseInt(val))}
                                        disabled={availableRooms === 0}
                                    >
                                        <SelectTrigger translate="no" className="w-16 h-8">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent translate="no">
                                            {Array.from({ length: availableRooms }, (_, i) => i + 1).map((num) => (
                                                <SelectItem key={num} value={num.toString()}>
                                                    {num}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <HoverCard open={cardOpen} onOpenChange={() => setCardOpen(!cardOpen)}>
                                    <HoverCardTrigger translate="no" onClick={() => setCardOpen(true)} asChild>
                                        <div className="text-right cursor-pointer">
                                            <div className="text-[12px] font-normal text-black line-through">
                                                {currencyCode} {(basePrice * rate * roomCount).toFixed(1)}
                                            </div>
                                            <div className="text-[16px] font-[500] text-black">
                                                {currencyCode} {(discountPrice * rate * roomCount).toFixed(1)} ▶
                                            </div>
                                            <div className="text-[10px] text-black font-normal">
                                                Tax Inclusive
                                            </div>
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-62 p-0 rounded-md" side="bottom">
                                        <div className="bg-white border border-gray-200 rounded-md shadow-lg">
                                            <div className="bg-black text-white p-3 text-center rounded-md">
                                                <div className="text-[12px] leading-[14px] font-[400]">
                                                    Rate for 1 Night {room.max_guests || 1} Guests {roomCount} Room
                                                </div>
                                            </div>
                                            <div className="p-4 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[12px] font-[400] text-[#212529]">{checkIn}</span>
                                                    <div className="text-right">
                                                        <div translate="no" className="text-[12px] line-through text-gray-500">
                                                            {currencyCode} {(basePrice * rate * roomCount).toFixed(1)}
                                                        </div>
                                                        <div translate="no" className="text-[12px] font-medium">
                                                            {currencyCode} {(discountPrice * rate * roomCount).toFixed(1)}
                                                        </div>
                                                        <div className="text-xs text-red-600">
                                                            <span translate="no">Save</span> {currencyCode} {((basePrice - discountPrice) * rate * roomCount).toFixed(1)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="border-gray-200" />
                                                <div className="flex justify-between items-center font-[500]">
                                                    <span>Total</span>
                                                    <span translate="no">{currencyCode} {(discountPrice * rate * roomCount).toFixed(1)}</span>
                                                </div>
                                            </div>
                                            <div className="p-4 pt-0 text-right">
                                                <Button
                                                    className="w-fit bg-[#f3a32d] rounded-xs hover:bg-[#e8941a] text-white"
                                                    onClick={handleBookClick}
                                                    disabled={availableRooms === 0}
                                                >
                                                    Book
                                                </Button>
                                            </div>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                                <Button
                                    className="bg-[#f3a32d] cursor-pointer rounded-none text-white font-[400]"
                                    onClick={handleBookClick}
                                    disabled={availableRooms === 0}
                                >
                                    Book
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <ImageSliderModal
                    open={imageModalOpen}
                    onOpenChange={setImageModalOpen}
                    images={images}
                    initialIndex={0}
                />
            </div>
            <RoomDetailsSheet
                open={roomDetailsOpen}
                onOpenChange={setRoomDetailsOpen}
                room={room}
            />
            <BookNowSheet
                open={bookNowOpen}
                onOpenChange={setBookNowOpen}
                room={room}
            />
        </>
    );
}