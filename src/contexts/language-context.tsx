"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Language {
    code: string
    name: string
    flag: string
}

export const languages: Language[] = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "th", name: "ไทย", flag: "🇹🇭" },
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "pl", name: "Polski", flag: "🇵🇱" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "sv", name: "Svenska", flag: "🇸🇪" },
    { code: "da", name: "Dansk", flag: "🇩🇰" },
    { code: "no", name: "Norsk", flag: "🇳🇴" },
]

interface LanguageContextType {
    currentLanguage: Language
    setCurrentLanguage: (language: Language) => void
    isTranslating: boolean
    translateText: (text: string) => Promise<string>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])
    const [isTranslating, setIsTranslating] = useState(false)
    const [translationCache, setTranslationCache] = useState<Map<string, string>>(new Map())

    const translateText = async (text: string): Promise<string> => {
        if (currentLanguage.code === "en" || !text.trim()) {
            return text
        }

        const cacheKey = `${text}-${currentLanguage.code}`
        if (translationCache.has(cacheKey)) {
            return translationCache.get(cacheKey)!
        }

        try {
            setIsTranslating(true)

            const translatedText = await translateWithMultipleServices(text, currentLanguage.code)

            // Cache successful translations
            setTranslationCache((prev) => new Map(prev).set(cacheKey, translatedText))
            return translatedText
        } catch (error) {
            console.error("Translation failed:", error)
            return text // Return original text on error
        } finally {
            setIsTranslating(false)
        }
    }

    const translateWithMultipleServices = async (text: string, targetLang: string): Promise<string> => {
        const services = [
            // Service 1: LibreTranslate (Free, no rate limits)
            async () => {
                const response = await fetch("https://libretranslate.de/translate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        q: text,
                        source: "en",
                        target: targetLang,
                        format: "text",
                    }),
                })

                if (!response.ok) throw new Error("LibreTranslate failed")

                const data = await response.json()
                if (data.translatedText && data.translatedText !== text) {
                    return data.translatedText
                }
                throw new Error("No translation returned")
            },

            // Service 2: Microsoft Translator (Free tier)
            async () => {
                const response = await fetch(
                    `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLang}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Ocp-Apim-Subscription-Key": "free-tier", // This would need a real key in production
                        },
                        body: JSON.stringify([{ text }]),
                    },
                )

                if (!response.ok) throw new Error("Microsoft Translator failed")

                const data = await response.json()
                if (data[0]?.translations?.[0]?.text) {
                    return data[0].translations[0].text
                }
                throw new Error("No translation returned")
            },

            // Service 3: Google Translate (via unofficial API)
            async () => {
                const response = await fetch(
                    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`,
                )

                if (!response.ok) throw new Error("Google Translate failed")

                const data = await response.json()
                if (data[0]?.[0]?.[0]) {
                    return data[0][0][0]
                }
                throw new Error("No translation returned")
            },

            // Service 4: Fallback to MyMemory (with better error handling)
            async () => {
                const response = await fetch(
                    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`,
                    {
                        headers: {
                            "User-Agent": "Mozilla/5.0 (compatible; TranslationApp/1.0)",
                        },
                    },
                )

                if (!response.ok) throw new Error("MyMemory failed")

                const data = await response.json()

                if (
                    data.responseData?.translatedText &&
                    !data.responseData.translatedText.includes("MYMEMORY WARNING") &&
                    !data.responseData.translatedText.includes("USAGE LIMIT") &&
                    !data.responseData.translatedText.includes("TRANSLATED.NET") &&
                    data.responseData.translatedText !== text
                ) {
                    return data.responseData.translatedText
                }
                throw new Error("MyMemory returned invalid response")
            },
        ]

        for (const service of services) {
            try {
                const result = await service()
                if (result && result.trim() && result !== text) {
                    return result
                }
            } catch (error) {
                console.warn("Translation service failed, trying next:", error)
                continue
            }
        }

        console.warn("All translation services failed for:", text)
        return text
    }

    // Clear cache when language changes
    useEffect(() => {
        setTranslationCache(new Map())
    }, [currentLanguage.code])

    return (
        <LanguageContext.Provider
            value={{
                currentLanguage,
                setCurrentLanguage,
                isTranslating,
                translateText,
            }}
        >
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
