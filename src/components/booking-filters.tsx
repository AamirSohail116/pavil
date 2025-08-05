"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DateFilter from "./date-filter"

export function BookingFilters() {
    const [checkIn, setCheckIn] = useState("22-10-2025")
    const [checkOut, setCheckOut] = useState("21-11-2025")
    const [rooms, setRooms] = useState("1")
    const [guests, setGuests] = useState("2")
    const [promoCode, setPromoCode] = useState("")

    return (
        <div className="sticky top-[52px] z-40 bg-[#dedede] py-8 px-6  w-full shadow-lg">
            <div className=" w-full grid grid-cols-12 gap-4 max-w-[1000px] mx-auto">
                <DateFilter />
                <div className=" col-span-2">
                    <Label className="text-[#008ace] font-[300] text-[10px] leading-[18px] uppercase mb-[2px]">ROOM</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-start border border-[#008ace] h-[34px] rounded-none  text-[#008ace] font-[400] text-[14px] "
                            >
                                {rooms} Room, {guests} Guest
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="rooms">Rooms</Label>
                                    <Select value={rooms} onValueChange={setRooms}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1 Room</SelectItem>
                                            <SelectItem value="2">2 Rooms</SelectItem>
                                            <SelectItem value="3">3 Rooms</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="guests">Guests</Label>
                                    <Select value={guests} onValueChange={setGuests}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1 Guest</SelectItem>
                                            <SelectItem value="2">2 Guests</SelectItem>
                                            <SelectItem value="3">3 Guests</SelectItem>
                                            <SelectItem value="4">4 Guests</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
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