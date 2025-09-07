import axios from 'axios';

export const API = axios.create({
    baseURL: 'https://dormeodestinations.my/api',
});

API.defaults.headers.common['authorization'] = `Bearer ${`asdddddddddddddddddddd23443242342323AsaddwqeaS`}`;

// export const setAuthHeader = (token = "asdddddddddddddddddddd23443242342323AsaddwqeaS") => {
//     API.defaults.headers.common['authorization'] = `Bearer ${token}`;
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRooms = (data: any) =>
    API.post(`/get-rooms`, data);

export const getCurrencyRate = (currency: number) =>
    API.post(`/get-currency-rate`, {
        currency
    });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPayment = (data: any) =>
    API.post(`/create-payment`, data);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const applyCouponCode = (data: any) =>
    API.post(`/apply-coupon`, data);