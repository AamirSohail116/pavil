"use client"

import { useLanguage } from "@/contexts/language-context"
import { Loader2 } from "lucide-react"

export function TranslationStatus() {
    const { isTranslating, currentLanguage } = useLanguage()

    if (!isTranslating || currentLanguage.code === "en") {
        return null
    }

    return (
        <div className="fixed top-4 right-4 z-50 bg-background border rounded-lg px-3 py-2 shadow-lg flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Translating...</span>
        </div>
    )
}
