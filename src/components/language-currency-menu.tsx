import { useEffect, useState } from "react"
import ReactCountryFlag from "react-country-flag"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Types
interface Country {
    name: string
    code: string
    flag: string
}

interface Currency {
    code: string
}

const views = ["Room View", "Property View"]

// Function to generate flag emoji from country code
const getFlagEmoji = (countryCode: string) => {
    return countryCode
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
}

export default function LanguageCurrencyMenu() {
    const [countries, setCountries] = useState<Country[]>([])
    const [currencies, setCurrencies] = useState<Currency[]>([])
    const [language, setLanguage] = useState("United Kingdom")
    const [flag, setFlag] = useState("GB")
    const [currency, setCurrency] = useState("GBP")
    const [roomView, setRoomView] = useState("Room View")

    // Fetch countries with flags
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
                const data = await res.json()
                console.log(data)
                const formatted = data
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .filter((c: any) => c.cca2) // Filter out entries without country code
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .map((c: any) => ({
                        name: c.name.common,
                        code: c.cca2,
                        flag: getFlagEmoji(c.cca2)
                    }))
                const sorted = formatted.sort((a: Country, b: Country) =>
                    a.name.localeCompare(b.name)
                )
                setCountries(sorted)
            } catch (err) {
                console.error("Failed to load countries", err)
                // Fallback data in case API fails
                setCountries([
                    { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
                    { name: "United States", code: "US", flag: "🇺🇸" },
                    { name: "France", code: "FR", flag: "🇫🇷" },
                ])
            }
        }
        fetchCountries()
    }, [])

    // Fetch currency codes
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const res = await fetch("https://openexchangerates.org/api/currencies.json")
                const data = await res.json()
                const formatted = Object.entries(data).map(([code]) => ({ code }))
                setCurrencies(formatted)
            } catch (err) {
                console.error("Failed to load currencies", err)
                // Fallback data in case API fails
                setCurrencies([
                    { code: "USD" },
                    { code: "EUR" },
                    { code: "GBP" },
                    { code: "JPY" },
                ])
            }
        }
        fetchCurrencies()
    }, [])

    console.log(countries, "countries")
    return (
        <div className="flex gap-2  justify-center sm:justify-end mb-4">
            {/* Language/Country Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center">
                        <ReactCountryFlag countryCode={flag} svg /> <span className=" font-[400] text-[14px] leading-[21px] text-[#008ace]">
                            {language}
                        </span>  <ChevronDown size={14} className="text-[#008ace]" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" w-[200px] sm:w-[500px] lg:w-[700px] p-3 rounded-none">
                    <ScrollArea className="h-64">
                        <div className=" grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 space-y-2">
                            {countries.map((country) => (
                                <DropdownMenuItem
                                    key={country.code}
                                    onClick={() => {
                                        setLanguage(country.name)
                                        setFlag(country.code)
                                    }}
                                    className="flex gap-2 items-center"
                                >
                                    <ReactCountryFlag countryCode={country.code} svg />
                                    <span className=" text-[14px] font-[400] leading-[13px]">{country.name}</span>
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </ScrollArea>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Currency Dropdown */}
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className=" font-[400] text-[14px] leading-[21px] text-[#008ace]">
                        {currency} <ChevronDown size={16} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" w-[30px] sm:w-[250px] xl:w-[600px] p-3 rounded-none">
                    <ScrollArea className="h-64">
                        <div className=" grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 space-y-2">
                            {currencies.map((curr) => (
                                <DropdownMenuItem
                                    key={curr.code}
                                    onClick={() => setCurrency(curr.code)}
                                    className=" text-[14px] font-[400] leading-[15px] cursor-pointer"
                                >
                                    {curr.code}
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </ScrollArea>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Room View Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className=" font-[400] text-[14px] leading-[21px] text-[#008ace]">
                        {roomView} <ChevronDown size={16} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" rounded-none p-2">
                    {views.map((view) => (
                        <DropdownMenuItem className=" text-[14px] cursor-pointer font-[400] leading-[15px]" key={view} onClick={() => setRoomView(view)}>
                            {view}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}