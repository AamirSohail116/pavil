// api/useGetCurrencyRate.ts
import { useQuery } from "@tanstack/react-query";
import { getCurrencyRate } from "./index";

export const useGetCurrencyRate = (currencyId: number) => {
    return useQuery({
        queryKey: ["currencyRate", currencyId],
        queryFn: async () => {
            const response = await getCurrencyRate(currencyId);
            if (!response?.data) throw new Error("Failed to fetch currency rate");
            return response.data.data?.rate ?? 1; // default to 1 if missing
        },
        enabled: !!currencyId, // only fetch if id exists
        retry: false,
    });
};
