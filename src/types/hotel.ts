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
    price_per_night: string;
    quantity: number;
    room_name: string;
    room_image: string;
    slider_images: string[];
    room_description: string;
    room_size: string;
    max_guests: number;
    beds: string;
    amenities: string[];
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