import { useQuery } from "@tanstack/react-query";
import { getRoomRates } from "./index";

export type RateFilters = {
    property_id: string;
    roomId: string;
    from_date: string; // "YYYY-MM-DD"
    to_date: string;   // "YYYY-MM-DD"
};

export const useGetRoomRates = (filters: RateFilters) => {
    const enabled =
        Boolean(filters.property_id) &&
        Boolean(filters.roomId) &&
        Boolean(filters.from_date) &&
        Boolean(filters.to_date);

    return useQuery({
        queryKey: ["room-rates", filters.property_id, filters.roomId, filters.from_date, filters.to_date],
        queryFn: async () => {
            const response = await getRoomRates({
                property_id: filters.property_id,
                roomId: filters.roomId,
                from_date: filters.from_date,
                to_date: filters.to_date
            });
            if (!response) throw new Error("Failed to fetch room rates");
            // expected: response.data.data = { inventory: [...], rates: [...] }
            return response.data?.data;
        },
        retry: false,
    });
};

// Helper function to generate default date range (current date to 2 months from now)
export const getDefaultDateRange = () => {
    const today = new Date();
    const twoMonthsFromNow = new Date(today);
    twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);

    const pad = (n: number) => String(n).padStart(2, "0");
    const fmt = (d: Date) =>
        `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    return {
        from_date: fmt(today),
        to_date: fmt(new Date(twoMonthsFromNow.getFullYear(), twoMonthsFromNow.getMonth() + 1, 0)),
    };
};
