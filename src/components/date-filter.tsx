// components/date-filter.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { subDays, addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { useSearchParams } from "next/navigation";

import { formatDateRange, stringToDate } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover";
import BookingLegend from "./booking-legend";

interface DateFilterProps {
    onDateChange: (dateRange: { from?: Date, to?: Date }) => void;
    initialFrom: string;
    initialTo: string;
}

const DateFilter = ({ onDateChange, initialFrom, initialTo }: DateFilterProps) => {
    const [monthsToShow, setMonthsToShow] = useState(2);
    const [date, setDate] = useState<DateRange | undefined>({
        from: stringToDate(initialFrom),
        to: stringToDate(initialTo)
    });

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const updateMonths = () => {
            setMonthsToShow(window.innerWidth < 780 ? 1 : 2);
        };

        updateMonths();
        window.addEventListener("resize", updateMonths);
        return () => window.removeEventListener("resize", updateMonths);
    }, []);

    const handleDateSelect = (range: DateRange | undefined) => {
        setDate(range);
        if (range?.from && range?.to) {
            onDateChange({ from: range.from, to: range.to });
            setOpen(false);
        }
    };

    return (
        <div className=" col-span-12 sm:col-span-6 w-full">
            <div className=" flex items-center justify-between px-4 mb-1">
                <span className=" text-[#008ace] font-[300] text-[10px] leading-[18px] uppercase">check in</span>
                <span className=" text-[#008ace] font-[300] text-[10px] leading-[18px] uppercase">check out</span>
            </div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        disabled={false}
                        size="sm"
                        variant="outline"
                        className=" w-full border border-[#008ace] rounded-none text-[#008ace] hover:text-[#008ace] cursor-pointer"
                    >
                        <span>{formatDateRange({
                            from: date?.from || new Date(),
                            to: date?.to || addDays(new Date(), 1)
                        })}</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="  w-full p-0 " align="start">
                    <Calendar
                        disabled={{ before: new Date() }}
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleDateSelect}
                        numberOfMonths={monthsToShow}
                    />
                    <BookingLegend />
                </PopoverContent>
            </Popover>
        </div>
    );
};

interface DateFilterWithSuspenseProps {
    onDateChange: (dateRange: { from?: Date, to?: Date }) => void;
    initialFrom: string;
    initialTo: string;
}

export default function DateFilterWithSuspense({
    onDateChange,
    initialFrom,
    initialTo
}: DateFilterWithSuspenseProps) {
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
            <DateFilter
                onDateChange={onDateChange}
                initialFrom={initialFrom}
                initialTo={initialTo}
            />
        </Suspense>
    );
}