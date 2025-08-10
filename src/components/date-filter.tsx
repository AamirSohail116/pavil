"use client";

import { Suspense, useEffect, useState } from "react";
import { subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { useSearchParams } from "next/navigation";

import { formatDateRange } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover";
import BookingLegend from "./booking-legend";

const DateFilter = () => {
    const params = useSearchParams();
    const [monthsToShow, setMonthsToShow] = useState(2);



    const from = params.get("from") || "";
    const to = params.get("to") || "";

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const paramsState = {
        from: from ? new Date(from) : defaultFrom,
        to: to ? new Date(to) : defaultTo,
    };

    const [date, setDate] = useState<DateRange | undefined>(paramsState);


    useEffect(() => {
        const updateMonths = () => {
            setMonthsToShow(window.innerWidth < 780 ? 1 : 2);
        };

        updateMonths();
        window.addEventListener("resize", updateMonths);
        return () => window.removeEventListener("resize", updateMonths);
    }, []);

    return (
        <div className=" col-span-12 sm:col-span-6 w-full">
            <div className=" flex items-center justify-between px-4 mb-1">
                <span className=" text-[#008ace] font-[300] text-[10px] leading-[18px] uppercase">check in</span>
                <span className=" text-[#008ace] font-[300] text-[10px] leading-[18px] uppercase">check in</span>
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        disabled={false}
                        size="sm"
                        variant="outline"
                        className=" w-full border border-[#008ace] rounded-none text-[#008ace] hover:text-[#008ace] cursor-pointer"
                    >
                        <span>{formatDateRange(paramsState)}</span>
                        {/* <ChevronDown className=" ml-2 size-4 opacity-50" /> */}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="  w-full p-0 " align="start">
                    <Calendar
                        disabled={{ before: new Date() }}
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={monthsToShow}
                    />
                    <BookingLegend />

                </PopoverContent>
            </Popover>
        </div>
    );
};


export default function DateFilterWithSuspense() {
    return (
        <Suspense fallback={
            <div className=" col-span-12 sm:col-span-6 w-full">
                <div className="flex items-center justify-between px-4 mb-1">
                    <span className="text-[#008ace] font-[300] text-[10px] leading-[18px] uppercase">
                        check in
                    </span>
                    <span className="text-[#008ace] font-[300] text-[10px] leading-[18px] uppercase">
                        check out
                    </span>
                </div>
                <Button
                    variant="outline"
                    className="w-full border border-[#008ace] rounded-none text-[#008ace] hover:text-[#008ace] cursor-pointer"
                >
                    Loading dates...
                </Button>
            </div>
        }>
            <DateFilter />
        </Suspense>
    );
}