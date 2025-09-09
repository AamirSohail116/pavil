"use client";

import type { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface ContactDetailsProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
}

export function ContactDetails({ form }: ContactDetailsProps) {
    const bookingForSomeoneElse = form.watch("bookingForSomeoneElse");

    return (
        <Card className="mb-2">
            <CardHeader>
                <CardTitle className="text-lg font-semibold leading-[28px]">Contact Details</CardTitle>
                <div className="flex items-center space-x-2" translate="no">
                    <FormField
                        control={form.control}
                        name="bookingForSomeoneElse"
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                    <Switch color="#f3a32d" checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel className="text-[14px] text-[#212529] font-[400]">
                                    I am booking for someone else
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {bookingForSomeoneElse && (
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="contactFirstName">First Name</Label>
                            <FormField
                                control={form.control}
                                name="contactFirstName"
                                render={({ field }) => (
                                    <FormItem translate="no">
                                        <FormControl>
                                            <Input
                                                className="h-[50px]"
                                                placeholder="First Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactLastName">Last Name</Label>
                            <FormField
                                control={form.control}
                                name="contactLastName"
                                render={({ field }) => (
                                    <FormItem translate="no">
                                        <FormControl>
                                            <Input
                                                className="h-[50px]"
                                                placeholder="Last Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-1">
                            <Label htmlFor="countryCode" className="text-[#535353]">Country code</Label>
                            <span className="text-red-500">*</span>
                        </div>
                        <div className="flex space-x-2" translate="no">
                            <FormField
                                control={form.control}
                                name="countryCode"
                                render={({ field }) => (
                                    <FormItem className="w-[100px]">
                                        <FormControl>
                                            <PhoneInput
                                                country={"my"}
                                                value={field.value}
                                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                onChange={(phone, country: any) => field.onChange(`+${country.dialCode}`)}
                                                containerStyle={{ height: "50px" }}
                                                inputStyle={{
                                                    height: "50px",
                                                    width: "100px",
                                                    borderColor: "#e2e8f0",
                                                    borderRadius: "0.375rem",
                                                    paddingLeft: "40px",
                                                }}
                                                buttonStyle={{
                                                    borderColor: "#e2e8f0",
                                                    borderRadius: "0.375rem 0 0 0.375rem",
                                                    backgroundColor: "#fff",
                                                }}
                                                dropdownStyle={{
                                                    borderRadius: "0.375rem",
                                                    maxHeight: "200px",
                                                }}
                                                enableSearch
                                                disableDropdown={false}
                                                countryCodeEditable={false}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contactNumber"
                                render={({ field }) => (
                                    <FormItem className="flex-1" translate="no">
                                        <FormControl>
                                            <Input
                                                className="h-[50px]"
                                                placeholder="Contact no"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center space-x-1">
                            <Label htmlFor="email">Email</Label>
                            <span className="text-red-500">*</span>
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem translate="no">
                                    <FormControl>
                                        <Input
                                            className="h-[50px]"
                                            placeholder="example@email.com"
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}