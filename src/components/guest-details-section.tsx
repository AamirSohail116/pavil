"use client";
import { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";

interface GuestDetailsSectionProps {
    roomNumber: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
    roomIndex: number;
    roomId: string;
    roomType: string;
    maxGuests: number;
    showUseForAllRooms: boolean;
    onUseDetailsForAllRooms: (checked: boolean, roomIndex: number) => void;
    useDetailsForAllRooms: boolean;
}
export function GuestDetailsSection({
    form,
    roomIndex,
    maxGuests,
    showUseForAllRooms,
    onUseDetailsForAllRooms,
    useDetailsForAllRooms
}: GuestDetailsSectionProps) {

    return (
        <div className="">
            {/* <h3 className="text-lg font-[500]">{`Guest Details for Room ${roomNumber} (${roomType})`}hiii</h3> */}
            <div className="space-y-4">
                <div className=" flex flex-col gap-1 sm:gap-0 sm:flex-row">
                    <div>
                        <div className="flex items-center space-x-2 text-sm text-red-500">
                            <span className=" text-black  text-[14px] font-[600]">Guest Details</span>
                            <span className="text-red-500">*</span>
                        </div>
                        <div className=" flex flex-col sm:flex-row gap-2 xl:gap-4">
                            <FormField
                                control={form.control}
                                name={`rooms.${roomIndex}.firstName`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className=" h-[50px] w-full sm:w-[230px] xl:w-[250px]" placeholder="First Name" value={field.value} onChange={field.onChange} />
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
                                            <Input className=" h-[50px] w-full sm:w-[230px] xl:w-[250px]" placeholder="Last Name" value={field.value} onChange={field.onChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className=" ml-2 xl:ml-4">
                        <Label className="text-sm text-gray-600">Guest</Label>
                        <FormField
                            control={form.control}
                            name={`rooms.${roomIndex}.guestCount`}
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className=" w-[200px] sm:w-[100px] py-6">
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
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