export interface Room {
    id: string;
    name: string;
    maxGuests: number;
    area: string;
    maxRooms: number;
    price: number;
    discountPrice: number;
    discountPercent: number;
    images: string[];
    description: string;
}

export const hotelRooms: Room[] = [
    {
        id: "executive-studio",
        name: "Executive Studio",
        maxGuests: 2,
        area: "622 sq ft",
        maxRooms: 5,
        price: 360,
        discountPrice: 324,
        discountPercent: 10,
        images: [
            "/slider-img-1.jpg",
            "/slider-img-2.jpg",
            "/slider-img-3.jpg",
            "/slider-img-4.jpg",
        ],
        description: "Spacious studio with modern amenities and city view"
    },
    {
        id: "deluxe-suite",
        name: "Deluxe Suite",
        maxGuests: 3,
        area: "850 sq ft",
        maxRooms: 3,
        price: 480,
        discountPrice: 432,
        discountPercent: 10,
        images: [
            "/slider-img-1.jpg",
            "/slider-img-2.jpg",
            "/slider-img-3.jpg",
            "/slider-img-4.jpg",
        ],
        description: "Luxurious suite with separate living area"
    },
    {
        id: "premium-room",
        name: "Premium Room",
        maxGuests: 2,
        area: "550 sq ft",
        maxRooms: 7,
        price: 420,
        discountPrice: 378,
        discountPercent: 10,
        images: [
            "/slider-img-1.jpg",
            "/slider-img-2.jpg",
            "/slider-img-3.jpg",
            "/slider-img-4.jpg",
        ],
        description: "Premium room with balcony and mountain view"
    },
    {
        id: "family-apartment",
        name: "Family Apartment",
        maxGuests: 4,
        area: "1200 sq ft",
        maxRooms: 2,
        price: 680,
        discountPrice: 612,
        discountPercent: 10,
        images: [
            "/slider-img-1.jpg",
            "/slider-img-2.jpg",
            "/slider-img-3.jpg",
            "/slider-img-4.jpg",
        ],
        description: "Spacious apartment perfect for families"
    },
    {
        id: "presidential-suite",
        name: "Presidential Suite",
        maxGuests: 4,
        area: "2000 sq ft",
        maxRooms: 1,
        price: 1200,
        discountPrice: 1080,
        discountPercent: 10,
        images: [
            "/slider-img-1.jpg",
            "/slider-img-2.jpg",
            "/slider-img-3.jpg",
            "/slider-img-4.jpg",
        ],
        description: "Luxurious presidential suite with premium amenities"
    }
];