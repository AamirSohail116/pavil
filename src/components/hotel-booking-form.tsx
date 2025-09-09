"use client";

import { useState, useEffect } from "react"
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
import { Room } from "@/types/hotel"; // Updated import
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

// Define form schema with dynamic rooms
const formSchema = z.object({
    rooms: z.array(
        z.object({
            id: z.string(),
            roomTypeId: z.string(),
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
    countryCode: z.string().optional(),
    agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to terms and conditions"),
    subscribeNewsletter: z.boolean().optional(),
})

interface BookingItem {
    roomId: string;
    roomType: string;
    quantity: number;
    price: number;
    checkIn: string;
    checkOut: string;
    prices?: Record<string, number>;
    max_guests?: number;
}


export function HotelBookingForm() {
    const router = useRouter()
    const [bookingData, setBookingData] = useLocalStorage<BookingItem[]>("bookingData", []);
    const [useDetailsForAllRooms, setUseDetailsForAllRooms] = useState(false)
    const [roomTypes, setRoomTypes] = useState<Room[]>([]);
    const [bookingList, setBookingList] = useState(bookingData);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {

                const roomIds = bookingData.map(item => item.roomId);
                if (roomIds.length === 0) return;

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const roomDetails: any[] = bookingData.map(item => ({
                    id: item.roomId,
                    room_name: item.roomType,
                    max_guests: 2, // Default values
                    price_per_night: item.price.toString(),
                    // Add other required fields with defaults
                }));

                setRoomTypes(roomDetails);
            } catch (error) {
                console.error('Failed to fetch room details:', error);
            }
        };

        if (bookingData.length > 0) {
            fetchRoomDetails();
        }
    }, [bookingData]);

    // Generate unique IDs for rooms
    const generateRoomDefaults = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rooms: any[] = [];
        bookingData.forEach(bookingItem => {
            for (let i = 0; i < bookingItem.quantity; i++) {
                rooms.push({
                    id: `room-${Date.now()}-${bookingItem.roomId}-${i}`,
                    roomTypeId: bookingItem.roomId,
                    firstName: "",
                    lastName: "",
                    guestCount: "2"
                });
            }
        });
        return rooms;
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rooms: generateRoomDefaults(),
            specialRequest: "",
            estimatedArrival: "",
            contactNumber: "",
            email: "",
            bookingForSomeoneElse: false,
            contactFirstName: "",
            contactLastName: "",
            countryCode: "+62",
            agreeToTerms: false,
            subscribeNewsletter: false,
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
        localStorage.setItem('bookingFormData', JSON.stringify(values));
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

    // Remove a room
    const removeRoom = (roomId: string) => {
        const roomToRemove = form.getValues('rooms').find(room => room.id === roomId);
        if (!roomToRemove) return;

        const updatedRooms = form.getValues('rooms').filter(room => room.id !== roomId);
        form.setValue('rooms', updatedRooms);

        const updatedBookingData = [...bookingData];
        const bookingIndex = updatedBookingData.findIndex(item => item.roomId === roomToRemove.roomTypeId);

        if (bookingIndex >= 0) {
            if (updatedBookingData[bookingIndex].quantity > 1) {
                updatedBookingData[bookingIndex].quantity -= 1;
            } else {
                updatedBookingData.splice(bookingIndex, 1);
            }

            setBookingData(updatedBookingData);
        }

        if (useDetailsForAllRooms) {
            setUseDetailsForAllRooms(false);
        }

        form.reset({
            ...form.getValues(),
            rooms: updatedRooms
        });
        setBookingList(updatedBookingData);

        if (updatedBookingData.length === 0) {
            router.push('/');
        }
    }


    const groupedRooms = bookingList.map(bookingItem => {
        const roomType = roomTypes.find(rt => rt.id?.toString() === bookingItem.roomId);
        const roomsForType = form.getValues('rooms').filter(
            room => room.roomTypeId === bookingItem.roomId
        );

        return { bookingItem, roomType, rooms: roomsForType };
    });

    return (
        <Form {...form}>
            <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
                <div className="col-span-12 lg:col-span-8 xl:col-span-7 space-y-6">
                    {groupedRooms.length > 0 && groupedRooms.map((group, groupIndex) => (
                        <Card key={group.bookingItem.roomId} className="mb-4 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-lg font-medium">
                                    {group.roomType?.room_name || group.bookingItem.roomType || "Unknown Room Type"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* Check-in/Check-out dates */}
                                <div className="flex gap-[160px] mb-8">
                                    <div>
                                        <div className="font-[400] text-[#212529] text-[12px] leading-[18px]">Check In</div>
                                        <div className="font-[400] text-[#212529] text-[14px] leading-[21px]">
                                            {group.bookingItem.checkIn}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-[400] text-[#212529] text-[12px] leading-[18px]">Check Out</div>
                                        <div className="font-[400] text-[#212529] text-[14px] leading-[21px]">
                                            {group.bookingItem.checkOut}
                                        </div>
                                    </div>
                                </div>

                                {/* Guest Details for each room */}
                                {group.rooms.map((room, roomIndex) => (
                                    <div key={room.id} className="mb-6">
                                        {group.rooms.length > 1 && (
                                            <h3 className="text-md font-medium mb-4">
                                                Guest Details for Room {roomIndex + 1}
                                            </h3>
                                        )}

                                        <GuestDetailsSection
                                            roomNumber={roomIndex + 1}
                                            form={form}
                                            roomIndex={form.getValues('rooms').findIndex(r => r.id === room.id)}
                                            roomId={room.id}
                                            roomType={group.roomType?.room_name || group.bookingItem.roomType || "Unknown Room Type"}
                                            maxGuests={group.bookingItem?.max_guests || 2}
                                            showUseForAllRooms={groupIndex === 0 && roomIndex === 0}
                                            onUseDetailsForAllRooms={handleUseDetailsForAllRooms}
                                            useDetailsForAllRooms={useDetailsForAllRooms}
                                        />
                                    </div>
                                ))}

                                {group.rooms.length > 0 && (
                                    <div className="mt-6">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <FormField
                                                    control={form.control}
                                                    name="specialRequest"
                                                    render={({ field }) => (
                                                        <FormItem translate="no">
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
                                                        <FormItem translate="no">
                                                            <FormLabel className="text-[#99a1af] font-[500] text-[14px]">
                                                                Estimated Arrival Time
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Select onValueChange={field.onChange} value={field.value}>
                                                                    <SelectTrigger className="col-span-1 py-6 w-full">
                                                                        <SelectValue placeholder="09:00 am" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {Array.from({ length: 14 }, (_, i) => {
                                                                            const hour = i + 9; // start at 9 → end at 22
                                                                            const displayHour = hour % 12 === 0 ? 12 : hour % 12;
                                                                            const suffix = hour < 12 ? "am" : "pm";
                                                                            const value = `${hour.toString().padStart(2, "0")}:00`;
                                                                            return (
                                                                                <SelectItem key={hour} value={value}>
                                                                                    {`${displayHour}:00 ${suffix}`}
                                                                                </SelectItem>
                                                                            );
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
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}

                    {groupedRooms.length > 0 && <ContactDetails form={form} />}
                </div>

                <div className="col-span-12 lg:col-span-4 xl:col-span-5">
                    <BookingSummary
                        form={form}
                        bookingData={bookingData}
                        roomTypes={roomTypes}
                        onRemoveRoom={removeRoom}
                        roomInstances={form.getValues('rooms')}
                    />
                </div>
            </div>
        </Form>
    )
}