"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { addDays, addMonths, endOfMonth, format, startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";

import { formatDateRange, stringToDate } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover";
import BookingLegend from "./booking-legend";
import { useGetRoomRates, getDefaultDateRange } from "@/API/useGetRoomRates";
import { usePropertyStore } from "@/hooks/usePropertyInfo";
import { useRoomIdStore } from "@/hooks/useRoomId";

interface DateFilterProps {
    onDateChange: (dateRange: { from?: Date; to?: Date }) => void;
    initialFrom: string;
    initialTo: string;
}

type DayInfo = {
    baseRate?: number;
    hasZeroInventory?: boolean;
};

const today = new Date();

const DateFilter = ({ onDateChange, initialFrom, initialTo }: DateFilterProps) => {
    const [monthsToShow, setMonthsToShow] = useState(2);
    const [date, setDate] = useState<DateRange | undefined>({
        from: stringToDate(initialFrom),
        to: stringToDate(initialTo),
    });
    const [isSelectingFrom, setIsSelectingFrom] = useState(true);
    const [open, setOpen] = useState(false);

    // which month pair is currently visible (leftmost month)
    const [visibleMonth, setVisibleMonth] = useState<Date>(() =>
        startOfMonth(date?.from ?? today)
    );

    // stores
    const { property } = usePropertyStore();
    const { roomId } = useRoomIdStore();

    useEffect(() => {
        const updateMonths = () => {
            setMonthsToShow(window.innerWidth < 780 ? 1 : 2);
        };
        updateMonths();
        window.addEventListener("resize", updateMonths);
        return () => window.removeEventListener("resize", updateMonths);
    }, []);

    // compute range to fetch based on visibleMonth and monthsToShow
    const fetchFrom = useMemo(
        () => format(startOfMonth(visibleMonth), "yyyy-MM-dd"),
        [visibleMonth]
    );
    const fetchTo = useMemo(
        () => format(endOfMonth(addMonths(visibleMonth, monthsToShow - 1)), "yyyy-MM-dd"),
        [visibleMonth, monthsToShow]
    );

    const { data, isError } = useGetRoomRates({
        property_id: property?.id ?? "",
        roomId: roomId ?? "",
        from_date: fetchFrom,
        to_date: fetchTo,
    });

    // Build a quick lookup map: "yyyy-MM-dd" -> DayInfo
    const dayInfoMap: Record<string, DayInfo> = useMemo(() => {
        if (!data || isError) return {};
        const map: Record<string, DayInfo> = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const inv = Array.isArray((data as any).inventory) ? (data as any).inventory as Array<any> : [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rates = Array.isArray((data as any).rates) ? (data as any).rates as Array<any> : [];

        for (const r of rates) {
            const key = r.date;
            if (!map[key]) map[key] = {};
            if (r.rate && typeof r.rate.base === "number") {
                map[key].baseRate = r.rate.base;
            }
        }
        for (const it of inv) {
            const key = it.date;
            if (!map[key]) map[key] = {};
            if (typeof it.inventory === "number" && it.inventory === 0) {
                map[key].hasZeroInventory = true;
            }
        }
        return map;
    }, [data, isError]);

    // disable past dates always
    // plus any dates with zero inventory (from fetched window)
    const disabled = useMemo(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const list: any[] = [{ before: today }];
        if (!isError && Object.keys(dayInfoMap).length > 0) {
            const zeroDates: Date[] = [];
            for (const [key, info] of Object.entries(dayInfoMap)) {
                if (info.hasZeroInventory) {
                    const [y, m, d] = key.split("-").map((n) => parseInt(n, 10));
                    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
                        zeroDates.push(new Date(y, m - 1, d));
                    }
                }
            }
            if (zeroDates.length) {
                list.push(...zeroDates);
            }
        }
        return list;
    }, [dayInfoMap, isError]);

    const handleDateSelect = (
        range: DateRange | undefined,
        selectedDay: Date,
    ) => {
        const currentFrom = date?.from;

        if (!currentFrom || (currentFrom && date?.to)) {
            // start fresh selection
            setDate({ from: selectedDay, to: undefined });
            setIsSelectingFrom(false);
            return;
        }

        if (selectedDay.getTime() > currentFrom.getTime()) {
            // normal case: later date as "to"
            setDate({ from: currentFrom, to: selectedDay });
            onDateChange({ from: currentFrom, to: selectedDay });
            setOpen(false);
            setIsSelectingFrom(true);
        } else if (selectedDay.getTime() < currentFrom.getTime()) {
            // flip range: earlier date as "from"
            setDate({ from: selectedDay, to: currentFrom });
            onDateChange({ from: selectedDay, to: currentFrom });
            setOpen(false);
            setIsSelectingFrom(true);
        }
    };

    const handlePopoverOpenChange = (isOpen: boolean) => {
        if (!isOpen && date?.from && !date?.to) {
            const nextDay = addDays(date.from, 1);
            setDate({ from: date.from, to: nextDay });
            onDateChange({ from: date.from, to: nextDay });
            setIsSelectingFrom(true);
        }
        setOpen(isOpen);
    };

    // Ensure the leftmost month is never before current month
    const fromMonth = startOfMonth(today);

    return (
        <div className="col-span-12 sm:col-span-6 w-full">
            <div className="flex items-center justify-between px-4 mb-1">
                <span className="text-[#008ace] font-[300] text-[10px] leading-[18px] uppercase">
                    check in
                </span>
                <span className="text-[#008ace] font-[300] text-[10px] leading-[18px] uppercase">
                    check out
                </span>
            </div>
            <Popover open={open} onOpenChange={handlePopoverOpenChange}>
                <PopoverTrigger asChild>
                    <Button
                        size="sm"
                        variant="outline"
                        className="w-full border border-[#008ace] rounded-none text-[#008ace] hover:text-[#008ace] cursor-pointer"
                    >
                        <span>
                            {date?.from
                                ? date.to
                                    ? formatDateRange({ from: date.from, to: date.to })
                                    : `${date.from.toLocaleDateString()} - Check-out Date`
                                : "Select dates"}
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        numberOfMonths={monthsToShow}
                        defaultMonth={date?.from || today}
                        onMonthChange={(m) => {
                            const left = startOfMonth(m);
                            setVisibleMonth(left < fromMonth ? fromMonth : left);
                        }}
                        fromMonth={fromMonth}
                        mode="range"
                        selected={date}
                        onSelect={handleDateSelect}
                        disabled={disabled}
                        renderDayExtras={(d) => {
                            if (isError) return null;
                            const key = format(d, "yyyy-MM-dd");
                            const info = dayInfoMap[key];
                            if (!info) return null;

                            if (info.hasZeroInventory) {
                                return (
                                    <span
                                        className="flex items-center justify-center text-xl"
                                        aria-label="No inventory"
                                        title="No inventory"
                                    >
                                        ×
                                    </span>
                                );
                            }

                            if (typeof info.baseRate === "number") {
                                return (
                                    <span className="flex items-center justify-center text-[#17762c] font-[500] w-full text-[1px] opacity-80">
                                        {info.baseRate}
                                    </span>
                                );
                            }
                            return null;
                        }}
                    />
                    <BookingLegend />
                </PopoverContent>
            </Popover>
        </div>
    );
};

interface DateFilterWithSuspenseProps {
    onDateChange: (dateRange: { from?: Date; to?: Date }) => void;
    initialFrom: string;
    initialTo: string;
}

export default function DateFilterWithSuspense({
    onDateChange,
    initialFrom,
    initialTo,
}: DateFilterWithSuspenseProps) {
    return (
        <Suspense
            fallback={
                <div className=" flex-1">
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
            }
        >
            <DateFilter
                onDateChange={onDateChange}
                initialFrom={initialFrom}
                initialTo={initialTo}
            />
        </Suspense>
    );
}