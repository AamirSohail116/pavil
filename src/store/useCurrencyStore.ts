// store/useCurrencyStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CurrencyState {
    rate: number;
    currencyCode: string;
    setRate: (rate: number) => void;
    setCurrencyCode: (code: string) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
    persist(
        (set) => ({
            rate: 1,
            currencyCode: "MYR",
            setRate: (rate) => set({ rate }),
            setCurrencyCode: (code) => set({ currencyCode: code }),
        }),
        {
            name: "currency-storage", // localStorage key
        }
    )
);
