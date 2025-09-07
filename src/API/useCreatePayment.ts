import { useMutation } from "@tanstack/react-query";
import { createPayment } from ".";

type PaymentData = {
    check_in: string;
    check_out: string;
    guests: number;
    property_id: string;
    room_id: string;
    first_name: string;
    last_name: string;
    contact_no: string;
    email: string;
    coupon_code?: string;
    special_request?: string;
    estimated_arrival_time?: string;
    booking_for_other?: string;
    other_first_name?: string;
    other_last_name?: string;
};


export const useCreatePayment = () => {
    return useMutation({
        mutationFn: async (paymentData: PaymentData) => {
            const response = await createPayment(paymentData);
            return response.data
        },
        onSuccess: (data) => {
            if (data?.payment_url) {
                window.location.href = data.payment_url;
            }
        },
        onError: (error) => {
            console.error('Payment creation failed:', error);
        },
    });
};