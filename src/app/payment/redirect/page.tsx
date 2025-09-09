'use client'

import React, { useEffect, useState, Suspense } from 'react';
import { useCheckBookingStatus } from '@/API/useCheckBookingStatus';
import { useRouter, useSearchParams } from 'next/navigation';

const PaymentRedirectContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderid = searchParams.get('orderid');
    const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'failed'>('loading');
    const [errorMessage, setErrorMessage] = useState('');

    const { data, isLoading, isError, error, failureCount } = useCheckBookingStatus(orderid || '');

    useEffect(() => {
        if (data?.success) {
            console.log("✅ Booking success:", data);
            setPaymentStatus('success');
        }
    }, [data]);

    useEffect(() => {
        if (isError && failureCount >= 4) {
            setPaymentStatus('failed');
            setErrorMessage(error?.message || 'Payment verification failed. Please contact support.');
        }
    }, [isError, failureCount, error]);

    const Loader = () => (
        <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600 text-lg">Verifying your payment...</p>
        </div>
    );

    if (paymentStatus === 'loading' || isLoading) {
        return (
            <div className="min-h-[79vh] flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <Loader />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[79vh] flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
                {paymentStatus === 'success' ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
                        <p className="text-gray-600">Your booking has been confirmed successfully.</p>
                        <button
                            onClick={() => router.push('/')}
                            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-200"
                        >
                            Continue
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h2>
                        <p className="text-gray-600 mb-4">{errorMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const PaymentRedirectPage = () => {
    return (
        <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
            <PaymentRedirectContent />
        </Suspense>
    );
};

export default PaymentRedirectPage;
