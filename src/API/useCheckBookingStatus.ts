import { useQuery } from "@tanstack/react-query";
import { checkBookingStatus } from "./index";

export const useCheckBookingStatus = (orderId: string) => {
    return useQuery({
        queryKey: ["booking-status", orderId],
        queryFn: async () => {
            const response = await checkBookingStatus(orderId);
            const data = response?.data;

            // ⛔ Force retry if API says success = false
            if (!data || data.data?.success === false) {
                throw new Error(data?.data?.message || "Booking not confirmed yet");
            }

            // ✅ If success true, return payload
            return data.data;
        },
        enabled: !!orderId,
        retry: 4, // retry 4 more times = 5 total
        retryDelay: 2000, // 2s delay between retries
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};
