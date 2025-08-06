"use client";

import React, { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { HotelBookingForm } from '@/components/hotel-booking-form';

interface BookingParams {
    roomType: string;
    roomPrice: number;
    checkIn: string;
    checkOut: string;
    initialRooms: number;
}

// Component that uses useSearchParams (must be wrapped in Suspense)
const BookingContent = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    // Get booking parameters from URL
    const bookingParams: BookingParams = {
        roomType: searchParams.get('roomType') || 'Executive Studio',
        roomPrice: parseInt(searchParams.get('roomPrice') || '10224', 10),
        checkIn: searchParams.get('checkIn') || '2025-10-14',
        checkOut: searchParams.get('checkOut') || '2025-11-21',
        initialRooms: parseInt(searchParams.get('rooms') || '1', 10)
    }

    useEffect(() => {
        if (!bookingParams.initialRooms || bookingParams.initialRooms <= 0) {
            router.push('/');
        }
    }, [bookingParams.initialRooms, router]);

    return <HotelBookingForm {...bookingParams} />
}

const ReserveBookingPage = () => {
    return (
        <div className="bg-gray-50 pt-4 mt-14">
            {/* Suspense boundary with loading fallback */}
            <Suspense fallback={<div className="text-center p-8">Loading booking details...</div>}>
                <BookingContent />
            </Suspense>
        </div>
    )
}

export default ReserveBookingPage