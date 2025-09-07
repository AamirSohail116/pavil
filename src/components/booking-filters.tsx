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
        property_id: string;
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
    const [guestInput, setGuestInput] = useState(filters.guests.toString());
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
            <div className="w-full grid grid-cols-12 gap-4 max-w-[1000px] ml-[150px] mx-auto place-content-center place-items-center">


                <DateFilterWithSuspense
                    onDateChange={handleDateChange}
                    initialFrom={filters.check_in}
                    initialTo={filters.check_out}
                />

                {/* Room Section */}
                <div className="col-span-12 sm:col-span-3 xl:col-span-2">
                    <Label className="text-[#008ace] font-[300] text-[10px] leading-[18px] uppercase mb-[2px]">
                        GUESTS
                    </Label>
                    <Input
                        type="number"
                        value={guestInput}
                        onChange={(e) => {
                            // allow empty string or numbers while typing
                            const val = e.target.value;
                            if (/^\d*$/.test(val)) { // only digits or empty
                                setGuestInput(val);
                            }
                        }}
                        onBlur={() => {
                            // enforce min 1 when leaving input
                            let val = parseInt(guestInput, 10);
                            if (isNaN(val) || val < 1) val = 1;
                            setGuestInput(val.toString());
                            onFilterChange({ guests: val });
                        }}
                        className="w-full justify-start border border-[#008ace] h-[34px] rounded-none bg-white text-[#008ace] font-[400] text-[14px]"
                    />


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
