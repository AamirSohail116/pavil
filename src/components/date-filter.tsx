"use client";

import { Suspense, useState } from "react";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { ChevronDown } from "lucide-react";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { formatDateRange } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose,
} from "./ui/popover";

const DateFilter = () => {
    const pathname = usePathname();
    const router = useRouter();
    const params = useSearchParams();

    const accountId = params.get("accountId");
    const from = params.get("from") || "";
    const to = params.get("to") || "";

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const paramsState = {
        from: from ? new Date(from) : defaultFrom,
        to: to ? new Date(to) : defaultTo,
    };

    const [date, setDate] = useState<DateRange | undefined>(paramsState);

    const pushToUrl = (dateRange: DateRange | undefined) => {
        const query = {
            from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
            to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
            accountId,
        };

        const url = qs.stringifyUrl(
            {
                url: pathname,
                query,
            },
            { skipEmptyString: true, skipNull: true }
        );

        router.push(url);
    };

    const onReset = () => {
        setDate(undefined);
        pushToUrl(undefined);
    };

    return (
        <div className=" col-span-6 w-full">
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
                <PopoverContent className=" lg:w-auto w-full p-0 " align="start">
                    <Calendar
                        disabled={false}
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                    {/* <div className=" p-4 w-full flex items-center gap-x-2">
                        <PopoverClose asChild>
                            <Button
                                onClick={onReset}
                                disabled={!date?.from || !date?.to}
                                className=" w-full"
                                variant="outline"
                            >
                                Reset
                            </Button>
                        </PopoverClose>
                        <PopoverClose asChild>
                            <Button
                                onClick={() => pushToUrl(date)}
                                disabled={!date?.from || !date?.to}
                                className=" w-full"
                            >
                                Appy
                            </Button>
                        </PopoverClose>
                    </div> */}
                </PopoverContent>
            </Popover>
        </div>
    );
};


export default function DateFilterWithSuspense() {
    return (
        <Suspense fallback={
            <div className="col-span-6 w-full">
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