"use client"

import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect, useRef } from "react"

export function useTranslation(text: string) {
    const { translateText, currentLanguage } = useLanguage()
    const [translatedText, setTranslatedText] = useState(text)
    const [isLoading, setIsLoading] = useState(false)
    const abortControllerRef = useRef<AbortController | null>(null)

    useEffect(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }

        const performTranslation = async () => {
            // If English, just use original text immediately
            if (currentLanguage.code === "en") {
                setTranslatedText(text)
                setIsLoading(false)
                return
            }

            if (text.length > 10) {
                setIsLoading(true)
            }

            // Create new abort controller for this translation
            abortControllerRef.current = new AbortController()

            try {
                const result = await translateText(text)

                if (!abortControllerRef.current.signal.aborted) {
                    setTranslatedText(result)
                }
            } catch (error) {
                if (!abortControllerRef.current.signal.aborted) {
                    console.error("Translation error:", error)
                    setTranslatedText(text) // Fallback to original text
                }
            } finally {
                if (!abortControllerRef.current.signal.aborted) {
                    setIsLoading(false)
                }
            }
        }

        performTranslation()

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }
        }
    }, [text, currentLanguage.code, translateText])

    return {
        translatedText,
        isLoading: isLoading && currentLanguage.code !== "en",
    }
}
