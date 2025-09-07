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

export interface RoomImage {
    image_url: string;
    caption: string;
}

export interface Room {
    id: string;
    room_name: string;
    room_description: string;
    room_size: string;
    max_guests: number;
    price: number; // latest or base price
    prices: Record<string, number>; // date => price mapping
    images: RoomImage[];
    amenities: string[];
    beds: Record<string, string[]>; // e.g. { "Room 1": ["1 King Bed", "1 Super Single Bed"] }
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