// store/useGuestStore.ts
import { create } from "zustand";

interface GuestStore {
    max_guests: number;
    setMaxGuests: (count: number) => void;
}

export const useGuestStore = create<GuestStore>((set) => ({
    max_guests: 2, // default
    setMaxGuests: (count) => set({ max_guests: count }),
}));
