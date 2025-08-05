export interface Hotel {
    id: string;
    name: string;
    location: string;
    rating: number;
    images: string[];
    rooms: Room[];
    amenities: string[];
    description: string;
    address: string;
}

export interface Room {
    id: string;
    name: string;
    type: string;
    size: number;
    maxGuests: number;
    price: number;
    originalPrice?: number;
    discount?: number;
    images: string[];
    amenities: string[];
    description: string;
    isAvailable: boolean;
}

export interface SearchFilters {
    checkIn: Date | null;
    checkOut: Date | null;
    rooms: number;
    guests: number;
    location?: string;
}

export interface BookingInfo {
    roomId: string;
    hotelId: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    rooms: number;
    totalPrice: number;
}