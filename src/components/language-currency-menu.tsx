import { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LanguageDropdown } from "./custom-translate-trigger"
import { useCurrencyStore } from "@/store/useCurrencyStore"
import { useGetCurrencyRate } from "@/API/useGetCurrencyRate"

interface CurrencyProps {
    currencies?: {
        currency_code: string;
        id: number;
    }[];
}

const views = ["Room View", "Property View"]

export default function LanguageCurrencyMenu({ currencies = [] }: CurrencyProps) {
    const [roomView, setRoomView] = useState("Room View")
    const [currency, setCurrency] = useState(currencies[0]?.currency_code || "USD")
    const { rate, setRate, currencyCode, setCurrencyCode } = useCurrencyStore();
    const selectedCurrency = currencies.find(c => c.currency_code === currencyCode);


    const { data: fetchedRate } = useGetCurrencyRate(selectedCurrency?.id || 0);

    // Update rate in store when fetched
    useEffect(() => {
        if (fetchedRate) setRate(fetchedRate);
    }, [fetchedRate, setRate]);


    return (
        <div className="flex gap-2 justify-center sm:justify-end mb-4" translate="no">
            {/* Currency Dropdown */}
            <LanguageDropdown />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button translate="no" variant="ghost" className="font-[400] text-[14px] leading-[21px] text-[#008ace]">
                        {currencyCode} <ChevronDown size={16} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[30px] sm:w-[250px] xl:w-[600px] p-3 rounded-none">
                    <ScrollArea className="h-64">
                        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 space-y-2" translate="no">
                            {currencies.map((curr) => (
                                <DropdownMenuItem
                                    key={curr.id}
                                    onClick={() => {
                                        setCurrencyCode(curr.currency_code);
                                    }}
                                    className="text-[14px] font-[400] leading-[15px] cursor-pointer"
                                >
                                    {curr.currency_code}
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </ScrollArea>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Room View Dropdown */}
            {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button translate="no" variant="ghost" className="font-[400] text-[14px] leading-[21px] text-[#008ace]">
                        {roomView} <ChevronDown size={16} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-none p-2">
                    {views.map((view) => (
                        <DropdownMenuItem
                            translate="no"
                            className="text-[14px] cursor-pointer font-[400] leading-[15px]"
                            key={view}
                            onClick={() => setRoomView(view)}
                        >
                            {view}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu> */}
        </div>
    )
} 