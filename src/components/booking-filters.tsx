"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import DateFilterWithSuspense from "./date-filter"
import { Plus, Minus } from 'lucide-react';
import LanguageCurrencyMenu from "./language-currency-menu"

interface Room {
    id: number;
    guests: number;
}

export function BookingFilters() {
    const [checkIn, setCheckIn] = useState("22-10-2025")
    const [checkOut, setCheckOut] = useState("21-11-2025")
    const [promoCode, setPromoCode] = useState("")

    const [rooms, setRooms] = useState<Room[]>([
        { id: 1, guests: 4 },
        { id: 2, guests: 2 }
    ]);

    const addRoom = (): void => {
        const newRoom: Room = {
            id: Math.max(...rooms.map((r: Room) => r.id)) + 1,
            guests: 1
        };
        setRooms([...rooms, newRoom]);
    };

    const removeRoom = (roomId: number): void => {
        if (rooms.length > 1) {
            setRooms(rooms.filter((room: Room) => room.id !== roomId));
        }
    };

    const updateGuests = (roomId: number, change: number): void => {
        setRooms(
            rooms.map((room: Room) => {
                if (room.id === roomId) {
                    const newGuests: number = room.guests + change;
                    return {
                        ...room,
                        guests: Math.max(1, Math.min(4, newGuests))
                    };
                }
                return room;
            })
        );
    };

    const totalGuests: number = rooms.reduce((sum: number, room: Room) => sum + room.guests, 0);





    return (
        <div className="sticky top-[52px] z-40 bg-[#dedede] pb-8 px-6 pt-2  w-full shadow-lg">
            <LanguageCurrencyMenu />
            <div className=" w-full grid grid-cols-12 gap-4 max-w-[1000px] mx-auto">
                <DateFilterWithSuspense />
                <div className=" col-span-2">
                    <Label className="text-[#008ace] font-[300] text-[10px] leading-[18px] uppercase mb-[2px]">ROOM</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-start border border-[#008ace] h-[34px] rounded-none  text-[#008ace] font-[400] text-[14px] "
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
                                        <div
                                            key={index}
                                            className=""
                                        >
                                            {/* Room Header */}
                                            <div className="flex justify-between bg-[#dedede] items-center mb-2 px-2">
                                                <span className="font-[400] text-[12px] leading-normal">Room {index + 1}</span>
                                                <div className="flex items-center gap-1">
                                                    {/* Minus icon: show if more than 1 room and NOT first-only room */}
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
                                                    {/* Plus icon: only for last room */}
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
                                                </div>
                                            </div>

                                            {/* Guests Controller */}
                                            <div className=" px-3 ">
                                                <div className="font-[400] text-[12px] leading-normal">Guest</div>
                                                <div className="flex items-center border border-[#ddd] mb-2">
                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        className="  flex-1 bg-[#eee] rounded-none"
                                                        onClick={() => updateGuests(room.id, -1)}
                                                        disabled={room.guests === 1}
                                                    >
                                                        <Minus size={14} />
                                                    </Button>
                                                    <span className=" flex-1 text-center text-[12px] font-normal">{room.guests}</span>
                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        className="  flex-1 bg-[#eee] rounded-none"
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

                {/* Promo Code */}
                <div className=" col-span-2">
                    <Label htmlFor="promo" className="text-[#008ace] font-[300] mb-[2px] text-[10px] leading-[18px] uppercase">
                        PROMO CODE
                    </Label>
                    <div className="relative">
                        <Input
                            id="promo"
                            placeholder="Promo"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="pl-10 w-full justify-start border border-[#008ace] placeholder:text-[#008ace] h-[34px] hover:bg-white focus-within:ring-0 focus-within:bg-transparent rounded-none bg-white  text-[#008ace] font-[400] text-[14px]"
                        />
                    </div>
                </div>

                {/* Search Button */}
                <div className="mt-5 flex justify-center col-span-1">
                    <Button className=" bg-[#f3a32d]  border border-white hover:bg-[#f3a32d] cursor-pointer rounded-none text-white font-[400]">Search</Button>
                </div>
            </div>
        </div>
    )
}