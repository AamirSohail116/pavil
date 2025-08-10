"use client";

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { HotelBookingForm } from '@/components/hotel-booking-form';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const ReserveBookingPage = () => {
    const [bookingData] = useLocalStorage("bookingData", []);
    const router = useRouter();

    useEffect(() => {
        if (!bookingData || bookingData.length === 0) {
            router.push('/');
        }
    }, [bookingData, router]);

    if (!bookingData || bookingData.length === 0) {
        return null; // Or loading spinner
    }

    return (
        <div className="bg-gray-50 pt-4 mt-14">
            <HotelBookingForm />
        </div>
    )
}

export default ReserveBookingPage;