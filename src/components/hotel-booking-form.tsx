// components/hotel-booking-form.tsx
"use client";

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { GuestDetailsSection } from "./guest-details-section"
import { ContactDetails } from "./contact-details"
import { BookingSummary } from "./booking-summary"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

// Define form schema with dynamic rooms
const formSchema = z.object({
    rooms: z.array(
        z.object({
            id: z.string(), // Unique ID for each room
            firstName: z.string().min(1, "First name is required"),
            lastName: z.string().min(1, "Last name is required"),
            guestCount: z.string().min(1, "Guest count is required"),
        }),
    ),
    specialRequest: z.string().optional(),
    estimatedArrival: z.string().optional(),
    contactNumber: z.string().min(1, "Contact number is required"),
    email: z.string().email("Invalid email address"),
    bookingForSomeoneElse: z.boolean(),
    contactFirstName: z.string().optional(),
    contactLastName: z.string().optional(),
    agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to terms and conditions"),
    subscribeNewsletter: z.boolean().optional(),
})

interface HotelBookingFormProps {
    roomType: string;
    roomPrice: number;
    checkIn: string;
    checkOut: string;
    initialRooms: number;
}

export function HotelBookingForm({
    roomType,
    roomPrice,
    checkIn,
    checkOut,
    initialRooms
}: HotelBookingFormProps) {
    const [useDetailsForAllRooms, setUseDetailsForAllRooms] = useState(false)

    // Generate unique IDs for rooms
    const generateRoomDefaults = (count: number) =>
        Array(count).fill(null).map((_, i) => ({
            id: `room-${Date.now()}-${i}`,
            firstName: "",
            lastName: "",
            guestCount: "2"
        }))

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rooms: generateRoomDefaults(initialRooms),
            specialRequest: "",
            estimatedArrival: "",
            contactNumber: "",
            email: "",
            bookingForSomeoneElse: false,
            contactFirstName: "",
            contactLastName: "",
            agreeToTerms: false,
            subscribeNewsletter: false,
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    // Handle "Use for all rooms" functionality
    const handleUseDetailsForAllRooms = (checked: boolean, roomIndex: number) => {
        setUseDetailsForAllRooms(checked)
        if (checked && roomIndex === 0) {
            const firstRoomData = form.getValues(`rooms.0`)
            const rooms = form.getValues('rooms')

            const updatedRooms = rooms.map((room, idx) =>
                idx === 0 ? room : { ...room, ...firstRoomData }
            )

            form.setValue('rooms', updatedRooms)
        }
    }

    // Add a new room
    const addRoom = () => {
        const newRoom = {
            id: `room-${Date.now()}-${form.getValues('rooms').length}`,
            firstName: "",
            lastName: "",
            guestCount: "2"
        }
        form.setValue('rooms', [...form.getValues('rooms'), newRoom])
    }

    // Remove a room
    const removeRoom = (roomId: string) => {
        const updatedRooms = form.getValues('rooms').filter(room => room.id !== roomId)
        form.setValue('rooms', updatedRooms)

        // Reset "Use for all" if rooms change
        if (useDetailsForAllRooms) {
            setUseDetailsForAllRooms(false)
        }
    }


    return (
        <Form {...form}>
            <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
                <div className="col-span-12 lg:col-span-8 xl:col-span-7 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-[500] leading-[24px]">{roomType}</CardTitle>
                            <div className="flex gap-[150px] text-sm text-gray-600">
                                <div>
                                    <div className="font-[400] text-[#212529] text-[12px] leading-[18px]">Check In</div>
                                    <div className="font-[400] text-[#212529] text-[14px] leading-[21px]">{checkIn}</div>
                                </div>
                                <div>
                                    <div className="font-[400] text-[#212529] text-[12px] leading-[18px]">Check Out</div>
                                    <div className="font-[400] text-[#212529] text-[14px] leading-[21px]">{checkOut}</div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {form.getValues('rooms').map((room, index) => (
                                    <GuestDetailsSection
                                        key={room.id}
                                        roomNumber={index + 1}
                                        form={form}
                                        roomIndex={index}
                                        roomId={room.id}
                                        showUseForAllRooms={index === 0}
                                        onUseDetailsForAllRooms={handleUseDetailsForAllRooms}
                                        useDetailsForAllRooms={useDetailsForAllRooms}
                                    />
                                ))}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <FormField
                                            control={form.control}
                                            name="specialRequest"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[#99a1af] font-[500] text-[14px]">Special Request</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            placeholder="Special Request"
                                                            className="col-span-1 h-[50px]"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2 w-full">
                                        <FormField
                                            control={form.control}
                                            name="estimatedArrival"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[#99a1af] font-[500] text-[14px]">Estimated Arrival Time</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger className="col-span-1 py-6 w-full">
                                                                <SelectValue placeholder="09:00 am" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {Array.from({ length: 24 }, (_, i) => {
                                                                    const hour = i.toString().padStart(2, "0")
                                                                    return (
                                                                        <SelectItem key={i} value={`${hour}:00`}>
                                                                            {`${hour}:00 ${i < 12 ? "am" : "pm"}`}
                                                                        </SelectItem>
                                                                    )
                                                                })}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <ContactDetails form={form} />
                </div>

                <div className="col-span-12 lg:col-span-4 xl:col-span-5">
                    <BookingSummary
                        form={form}
                        roomType={roomType}
                        roomPrice={roomPrice}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        onRemoveRoom={removeRoom}
                    />
                </div>
            </div>
        </Form>
    )
}