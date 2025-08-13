"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import DateFilterWithSuspense from "./date-filter"
import { Plus, Minus } from 'lucide-react';
import LanguageCurrencyMenu from "./language-currency-menu"
import { formatDate } from "@/lib/utils"

interface Room {
    id: number;
    guests: number;
}

interface BookingFiltersProps {
    filters: {
        property_id: number;
        check_in: string;
        check_out: string;
        guests: number;
        search: string;
    };
    currencies?: {
        currency_code: string;
        id: number;
    }[];
    onFilterChange: (newFilters: Partial<BookingFiltersProps['filters']>) => void;
    onSearch: () => void; // Add search handler
}

export function BookingFilters({ filters, currencies, onFilterChange, onSearch }: BookingFiltersProps) {
    const [promoCode, setPromoCode] = useState("")
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        const guestCount = filters.guests;
        const roomsCount = Math.ceil(guestCount / 4);
        const newRooms = [];

        for (let i = 1; i <= roomsCount; i++) {
            const roomGuests = i === roomsCount ? guestCount - (roomsCount - 1) * 4 : 4;
            newRooms.push({ id: i, guests: Math.min(4, Math.max(1, roomGuests)) });
        }

        setRooms(newRooms);
    }, [filters.guests]);

    const addRoom = (): void => {
        if (rooms.length >= 4) return;
        const newRoom: Room = {
            id: Math.max(...rooms.map(r => r.id)) + 1,
            guests: 1
        };
        const newRooms = [...rooms, newRoom];
        setRooms(newRooms);
        updateTotalGuests(newRooms);
    };

    const removeRoom = (roomId: number): void => {
        if (rooms.length <= 1) return;
        const newRooms = rooms.filter(room => room.id !== roomId);
        setRooms(newRooms);
        updateTotalGuests(newRooms);
    };

    const updateGuests = (roomId: number, change: number): void => {
        const newRooms = rooms.map(room => {
            if (room.id === roomId) {
                const newGuests = room.guests + change;
                return {
                    ...room,
                    guests: Math.max(1, Math.min(4, newGuests))
                };
            }
            return room;
        });

        setRooms(newRooms);
        updateTotalGuests(newRooms);
    };

    const updateTotalGuests = (roomList: Room[]) => {
        const totalGuests = roomList.reduce((sum, room) => sum + room.guests, 0);
        onFilterChange({ guests: totalGuests });
    };

    const handleDateChange = (dateRange: { from?: Date, to?: Date }) => {
        if (dateRange.from && dateRange.to) {
            onFilterChange({
                check_in: formatDate(dateRange.from),
                check_out: formatDate(dateRange.to)
            });
        }
    };

    const totalGuests = rooms.reduce((sum, room) => sum + room.guests, 0);

    return (
        <div className="sticky top-[52px] z-40 bg-[#dedede] pb-8 px-2 xl:px-6 pt-2 w-full shadow-lg" translate="no">
            <LanguageCurrencyMenu currencies={currencies} />
            <div className="w-full grid grid-cols-12 gap-4 max-w-[1000px] mx-auto">
                <DateFilterWithSuspense
                    onDateChange={handleDateChange}
                    initialFrom={filters.check_in}
                    initialTo={filters.check_out}
                />

                {/* Room Section */}
                <div className="col-span-12 sm:col-span-3 xl:col-span-2">
                    <Label className="text-[#008ace] font-[300] text-[10px] leading-[18px] uppercase mb-[2px]">
                        ROOM
                    </Label>

                    {/* Mobile layout */}
                    <div className="sm:hidden space-y-4">
                        {rooms.map((room, index) => (
                            <div key={room.id} className="bg-[#dedede]">
                                {/* <div className="flex justify-between items-center bg-[#dedede] px-2 pt-1">
                                    <span className="font-[400] text-[12px]">Room {index + 1}</span>
                                    {rooms.length > 1 && (
                                        <button
                                            onClick={() => removeRoom(room.id)}
                                            className="text-[#484747] text-sm"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div> */}

                                {/* Guest control */}
                                <div className="px-3 py-2 bg-white">
                                    <div className="font-[400] text-[12px] leading-normal mb-1 text-[#565656]">Guest</div>
                                    <div className="flex border border-[#ddd]">
                                        <button
                                            className="flex-1 bg-[#eee] py-1"
                                            onClick={() => updateGuests(room.id, -1)}
                                            disabled={room.guests === 1}
                                        >
                                            -
                                        </button>
                                        <span className="flex-1 text-center text-[14px] py-1">
                                            {room.guests}
                                        </span>
                                        <button
                                            className="flex-1 bg-[#eee] py-1"
                                            onClick={() => updateGuests(room.id, 1)}
                                            disabled={room.guests === 4}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Add room button */}
                        {/* {rooms.length < 4 && (
                            <button
                                onClick={addRoom}
                                className="bg-[#f3a32d] text-white font-[400] px-4 py-2 text-[12px] flex items-center gap-1"
                            >
                                <Plus size={14} /> Add another room
                            </button>
                        )} */}


                    </div>

                    {/* Desktop Popover layout */}
                    <div className="hidden sm:block">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start border border-[#008ace] h-[34px] rounded-none text-[#008ace] font-[400] text-[14px]"
                                >
                                    {rooms.length} Room{rooms.length > 1 ? 's' : ''}, {totalGuests} Guest{totalGuests > 1 ? 's' : ''}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <div className="space-y-2">
                                    {rooms.map((room, index) => {
                                        const isFirst = index === 0;
                                        const isLast = index === rooms.length - 1;

                                        return (
                                            <div key={index}>
                                                {/* Room Header */}
                                                <div className="flex justify-between bg-[#dedede] items-center mb-2 px-2">
                                                    <span className="font-[400] text-[12px] leading-normal">Room {index + 1}</span>
                                                    {/* <div className="flex items-center gap-1">
                                                        {(rooms.length > 1 || !isFirst) && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => removeRoom(room.id)}
                                                                className="w-6 h-6 p-0 text-[#484747] border-none cursor-pointer"
                                                            >
                                                                <Minus size={14} />
                                                            </Button>
                                                        )}
                                                        {isLast && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={addRoom}
                                                                className="w-6 h-6 p-0 text-[#484747] border-none cursor-pointer"
                                                            >
                                                                <Plus size={14} />
                                                            </Button>
                                                        )}
                                                    </div> */}
                                                </div>

                                                {/* Guests Controller */}
                                                <div className="px-3">
                                                    <div className="font-[400] text-[12px] leading-normal">Guest</div>
                                                    <div className="flex items-center border border-[#ddd] mb-2">
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            className="flex-1 bg-[#eee] rounded-none"
                                                            onClick={() => updateGuests(room.id, -1)}
                                                            disabled={room.guests === 1}
                                                        >
                                                            <Minus size={14} />
                                                        </Button>
                                                        <span className="flex-1 text-center text-[12px] font-normal">{room.guests}</span>
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            className="flex-1 bg-[#eee] rounded-none"
                                                            onClick={() => updateGuests(room.id, 1)}
                                                            disabled={room.guests === 4}
                                                        >
                                                            <Plus size={14} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {/* Promo Code (desktop only) */}
                {/* <div className=" col-span-9 sm:col-span-3 xl:col-span-2">
                    <Label htmlFor="promo" className="text-[#008ace] font-[300] mb-[2px] text-[10px] leading-[18px] uppercase">
                        PROMO CODE
                    </Label>
                    <div className="relative">
                        <Input
                            id="promo"
                            placeholder="Promo"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="pl-10 w-full justify-start border border-[#008ace] placeholder:text-[#008ace] h-[34px] hover:bg-white focus-within:ring-0 focus-within:bg-transparent rounded-none bg-white text-[#008ace] font-[400] text-[14px]"
                        />
                    </div>
                </div> */}

                {/* Search Button (desktop only) */}
                <div className="sm:flex col-span-3 sm:col-span-12 xl:col-span-1 justify-center xl:justify-start mt-5">
                    <Button
                        onClick={onSearch}
                        className="bg-[#f3a32d] border border-white hover:bg-[#f3a32d] cursor-pointer rounded-none text-white font-[400] w-full sm:w-fit"
                    >
                        Search
                    </Button>
                </div>
            </div>
        </div>
    )
}
