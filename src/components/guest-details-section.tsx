"use client"

import type { UseFormReturn } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

interface GuestDetailsSectionProps {
    roomNumber: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>
    roomIndex: number
    showUseForAllRooms?: boolean
    onUseDetailsForAllRooms?: (checked: boolean, roomIndex: number) => void
    useDetailsForAllRooms?: boolean
}

export function GuestDetailsSection({
    roomNumber,
    form,
    roomIndex,
    showUseForAllRooms = false,
    onUseDetailsForAllRooms,
    useDetailsForAllRooms = false,
}: GuestDetailsSectionProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-[500]">{`Guest Details for Room ${roomNumber}`}</h3>
            <div className="space-y-4">
                <div className=" flex">
                    <div>
                        <div className="flex items-center space-x-2 text-sm text-red-500">
                            <span className=" text-black  text-[14px] font-[600]">Guest Details</span>
                            <span className="text-red-500">*</span>
                        </div>
                        <div className=" flex gap-4">
                            <FormField
                                control={form.control}
                                name={`rooms.${roomIndex}.firstName`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className=" h-[50px] w-[250px]" placeholder="First Name" value={field.value} onChange={field.onChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`rooms.${roomIndex}.lastName`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className=" h-[50px] w-[250px]" placeholder="Last Name" value={field.value} onChange={field.onChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className=" ml-4">
                        <Label className="text-sm text-gray-600">Guest</Label>
                        <FormField
                            control={form.control}
                            name={`rooms.${roomIndex}.guestCount`}
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className=" w-[100px] py-6">
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                                <SelectItem key={num} value={num.toString()}>
                                                    {num}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {showUseForAllRooms && (
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="useForAllRooms"
                            checked={useDetailsForAllRooms}
                            onCheckedChange={(checked) => onUseDetailsForAllRooms?.(checked as boolean, roomIndex)}
                        />
                        <Label htmlFor="useForAllRooms" className="text-sm text-gray-600">
                            Use these details for all rooms
                        </Label>
                    </div>
                )}
            </div>
        </div>
    )
}
