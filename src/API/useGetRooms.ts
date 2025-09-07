import { useQuery } from "@tanstack/react-query";
import { getRooms } from "./index";

type RoomFilters = {
    property_id: string;
    check_in?: string; // "YYYY-MM-DD"
    check_out?: string; // "YYYY-MM-DD"
    guests?: number;
    search?: string;
};

export const useGetRooms = (filters: RoomFilters) => {
    return useQuery({
        queryKey: ["rooms"],
        queryFn: async () => {
            const response = await getRooms(filters); // pass filters as body
            if (!response) throw new Error("Failed to fetch rooms");
            return response.data?.data;
        },
        enabled: false,  // manual fetching only
        retry: false,
    });
};
