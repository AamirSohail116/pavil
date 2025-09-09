"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HotelBookingForm } from "@/components/hotel-booking-form";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const ReserveBookingPage = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ReserveBookingContent />
        </Suspense>
    );
};

const ReserveBookingContent = () => {
    const [bookingData] = useLocalStorage("bookingData", []);
    const router = useRouter();
    const searchParams = useSearchParams();
    const propertyId = searchParams.get("propertyId");

    useEffect(() => {
        if (!bookingData || bookingData.length === 0) {
            if (propertyId) {
                router.push(`/?propertyId=${propertyId}`);
            } else {
                router.push("/");
            }
        }
    }, [bookingData, router, propertyId]);

    if (!bookingData || bookingData.length === 0) return null;

    return (
        <div className="bg-gray-50 pt-4 md:mt-14">
            <HotelBookingForm />
        </div>
    );
};

export default ReserveBookingPage;
