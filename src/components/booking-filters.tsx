"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from 'lucide-react';
import LanguageCurrencyMenu from "./language-currency-menu";
import DateFilterWithSuspense from "./date-filter";
import { formatDate } from "@/lib/utils";

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
    onSearch: () => void;
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
            <div className="flex flex-col md:flex-row gap-4 max-w-[930px] mx-auto items-center md:items-start">
                {/* Date Filter */}
                <div className="w-full md:flex-1">
                    <DateFilterWithSuspense
                        onDateChange={handleDateChange}
                        initialFrom={filters.check_in}
                        initialTo={filters.check_out}
                    />
                </div>

                {/* Guests Input */}
                <div className="w-full md:w-[185px]">
                    <Label className="text-[#008ace] font-[300] text-[10px] leading-[18px] uppercase mb-[2px]">
                        GUESTS
                    </Label>
                    <Input
                        type="number"
                        value={guestInput}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*$/.test(val)) {
                                setGuestInput(val);
                            }
                        }}
                        onBlur={() => {
                            let val = parseInt(guestInput, 10);
                            if (isNaN(val) || val < 1) val = 1;
                            setGuestInput(val.toString());
                            onFilterChange({ guests: val });
                        }}
                        className="w-full border border-[#008ace] h-[34px] rounded-none bg-white text-[#008ace] font-[400] text-[14px]"
                    />
                </div>

                {/* Search Button */}
                <div className="w-full md:w-[100px] mt-5 ">
                    <Button
                        onClick={onSearch}
                        className="w-full bg-[#f3a32d] border border-white hover:bg-[#f3a32d] cursor-pointer rounded-none text-white font-[400]"
                    >
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
}