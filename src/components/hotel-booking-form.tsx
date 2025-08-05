"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { GuestDetailsSection } from "./guest-details-section"
import { ContactDetails } from "./contact-details"
import { BookingSummary } from "./booking-summary"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

const formSchema = z.object({
    rooms: z.array(
        z.object({
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
    agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to terms and conditions"),
    subscribeNewsletter: z.boolean().optional(),
})

export function HotelBookingForm() {
    const [useDetailsForAllRooms, setUseDetailsForAllRooms] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rooms: [
                { firstName: "", lastName: "", guestCount: "2" },
                { firstName: "", lastName: "", guestCount: "2" },
                { firstName: "", lastName: "", guestCount: "2" },
            ],
            specialRequest: "",
            estimatedArrival: "",
            contactNumber: "",
            email: "",
            bookingForSomeoneElse: false,
            agreeToTerms: false,
            subscribeNewsletter: false,
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    const handleUseDetailsForAllRooms = (checked: boolean, roomIndex: number) => {
        setUseDetailsForAllRooms(checked)
        if (checked && roomIndex === 0) {
            const firstRoomData = form.getValues(`rooms.0`)
            form.setValue(`rooms.1.firstName`, firstRoomData.firstName)
            form.setValue(`rooms.1.lastName`, firstRoomData.lastName)
            form.setValue(`rooms.1.guestCount`, firstRoomData.guestCount)
            form.setValue(`rooms.2.firstName`, firstRoomData.firstName)
            form.setValue(`rooms.2.lastName`, firstRoomData.lastName)
            form.setValue(`rooms.2.guestCount`, firstRoomData.guestCount)
        }
    }

    return (
        <Form {...form}>
            <div className="w full mx-auto grid lg:grid-cols-12 gap-4">
                <div className="lg:col-span-7 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-[500] leading-[24px]">Executive Studio</CardTitle>
                            <div className="flex gap-[150px] text-sm text-gray-600">
                                <div>
                                    <div className="font-[400] text-[#212529] text-[12px] leading-[18px]">Check In</div>
                                    <div className="font-[400] text-[#212529] text-[14px] leading-[21px]">14 Oct 2025</div>
                                </div>
                                <div>
                                    <div className="font-[400] text-[#212529] text-[12px] leading-[18px]">Check Out</div>
                                    <div className="font-[400] text-[#212529] text-[14px] leading-[21px]">21 Nov 2025</div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {[1, 2, 3].map((roomNumber, index) => (
                                    <GuestDetailsSection
                                        key={roomNumber}
                                        roomNumber={roomNumber}
                                        form={form}
                                        roomIndex={index}
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
                                                    <FormLabel className=" text-[#99a1af] font-[500] text-[14px]">Special Request</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            placeholder="Special Request"
                                                            className=" col-span-1 h-[50px]"
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
                                                    <FormLabel className=" text-[#99a1af] font-[500] text-[14px]">Estimated Arrival Time</FormLabel>
                                                    <FormControl>
                                                        <Select   {...field}>
                                                            <SelectTrigger className=" col-span-1 py-6 w-full">
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

                <div className="lg:col-span-5">
                    <BookingSummary form={form} />
                </div>
            </div>
        </Form>
    )
}
