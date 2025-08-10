"use client"

import { useState, useEffect, useCallback } from "react"

// Custom event for same-tab localStorage updates
const createStorageEvent = (key: string, newValue: string | null) => {
    const event = new CustomEvent("local-storage-change", {
        detail: { key, newValue },
    })
    window.dispatchEvent(event)
}

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") {
            return initialValue
        }
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(error)
            return initialValue
        }
    })

    // Function to update both state and localStorage
    const setValue = useCallback(
        (value: T | ((val: T) => T)) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value
                setStoredValue(valueToStore)

                if (typeof window !== "undefined") {
                    const stringValue = JSON.stringify(valueToStore)
                    window.localStorage.setItem(key, stringValue)
                    // Dispatch custom event for same-tab updates
                    createStorageEvent(key, stringValue)
                }
            } catch (error) {
                console.error(error)
            }
        },
        [key, storedValue],
    )

    useEffect(() => {
        // Handle storage changes from other tabs
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key) {
                try {
                    const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue
                    setStoredValue(newValue)
                } catch (error) {
                    console.error(error)
                }
            }
        }

        // Handle storage changes from same tab
        const handleCustomStorageChange = (e: CustomEvent) => {
            if (e.detail.key === key) {
                try {
                    const newValue = e.detail.newValue ? JSON.parse(e.detail.newValue) : initialValue
                    setStoredValue(newValue)
                } catch (error) {
                    console.error(error)
                }
            }
        }

        window.addEventListener("storage", handleStorageChange)
        window.addEventListener("local-storage-change", handleCustomStorageChange as EventListener)

        return () => {
            window.removeEventListener("storage", handleStorageChange)
            window.removeEventListener("local-storage-change", handleCustomStorageChange as EventListener)
        }
    }, [key, initialValue])

    return [storedValue, setValue] as const
}
