"use client"

import { useState } from "react"
import { ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage, languages } from "@/contexts/language-context"

export function LanguageSelector() {
    const { currentLanguage, setCurrentLanguage } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)

    const handleLanguageChange = (language: (typeof languages)[0]) => {
        setCurrentLanguage(language)
        setIsOpen(false)
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">{currentLanguage.flag}</span>
                    <span className="hidden md:inline">{currentLanguage.name}</span>
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 max-h-80 overflow-y-auto">
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => handleLanguageChange(language)}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        <span className="text-lg">{language.flag}</span>
                        <span>{language.name}</span>
                        {currentLanguage.code === language.code && <span className="ml-auto text-primary">✓</span>}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
