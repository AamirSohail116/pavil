import { create } from "zustand";

interface RoomIdStore {
    roomId: string | null;
    setRoomId: (id: string) => void;
}

export const useRoomIdStore = create<RoomIdStore>((set) => ({
    roomId: null,
    setRoomId: (id) => set({ roomId: id }),
}));
