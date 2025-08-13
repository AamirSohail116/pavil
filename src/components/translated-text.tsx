"use client"

import { useTranslation } from "@/hooks/use-translation"
import { useLanguage } from "@/contexts/language-context"
import type { JSX } from "react"

interface TranslatedTextProps {
    className?: string
    as?: keyof JSX.IntrinsicElements
    children: string  // Accept text as children
}

export function TranslatedText({ className = "", as: Component = "span", children }: TranslatedTextProps) {
    const { currentLanguage } = useLanguage()
    const { translatedText, isLoading } = useTranslation(children)  // Use children as text

    return (
        <Component className={`${className} transition-all duration-200 ${isLoading ? "opacity-80" : "opacity-100"}`}>
            {translatedText}
        </Component>
    )
}