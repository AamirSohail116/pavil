import { Hotel } from '@/types/hotel';

export const hotelData: Hotel[] = [
    {
        id: 'pavilion-ceylon-hill',
        name: 'Pavilion Ceylon Hill Suites by Perfect Host',
        location: 'Kuala Lumpur, Malaysia',
        rating: 4.5,
        images: ['/lovable-uploads/8aa904f3-8a5e-4a4f-9659-d9a7b77db7e3.png'],
        address: 'Changkat Bukit Bintang, Bukit Ceylon, 50200 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Bukit Bintang, Kuala Lumpur, Malaysia 50200',
        description: 'Pavilion Ceylon Hill by Perfect Host offers stunning city views and free Wi-Fi, providing comfortable accommodation in the heart of Kuala Lumpur. Conveniently located near Changkat Bukit Bintang, Jalan Jah and Pavilion Kuala Lumpur, guests have easy access to the city\'s vibrant attractions.',
        amenities: ['Wi-Fi', 'Air Conditioning', 'Kitchen', 'Flat Screen TV', 'Private Bathroom', 'Laundry', 'Fitness Center', 'Swimming Pool'],
        rooms: [
            {
                id: 'executive-studio',
                name: 'Executive Studio',
                type: 'Studio',
                size: 365,
                maxGuests: 2,
                price: 8118,
                originalPrice: 9000,
                discount: 10,
                images: ['/lovable-uploads/8aa904f3-8a5e-4a4f-9659-d9a7b77db7e3.png'],
                amenities: ['Wi-Fi', 'Air Conditioning', 'Kitchen', 'Flat Screen TV', 'Private Bathroom'],
                description: 'Spacious executive studio with modern amenities and city views.',
                isAvailable: true
            },
            {
                id: 'one-bedroom-suite',
                name: 'One Bedroom Executive Suite',
                type: 'Suite',
                size: 622,
                maxGuests: 2,
                price: 9630,
                originalPrice: 10700,
                discount: 10,
                images: ['/lovable-uploads/8aa904f3-8a5e-4a4f-9659-d9a7b77db7e3.png'],
                amenities: ['Wi-Fi', 'Air Conditioning', 'Kitchen', 'Flat Screen TV', 'Private Bathroom', 'Separate Living Area'],
                description: 'Elegant one-bedroom suite with separate living area and premium amenities.',
                isAvailable: true
            },
            {
                id: 'two-bedroom-suite',
                name: 'Two Bedroom Executive Suite',
                type: 'Suite',
                size: 622,
                maxGuests: 4,
                price: 15030,
                originalPrice: 16700,
                discount: 10,
                images: ['/lovable-uploads/8aa904f3-8a5e-4a4f-9659-d9a7b77db7e3.png'],
                amenities: ['Wi-Fi', 'Air Conditioning', 'Kitchen', 'Flat Screen TV', 'Private Bathroom', 'Separate Living Area', 'Two Bedrooms'],
                description: 'Spacious two-bedroom suite perfect for families or groups.',
                isAvailable: true
            }
        ]
    },
    {
        id: 'grand-palace-hotel',
        name: 'Grand Palace Hotel',
        location: 'Kuala Lumpur, Malaysia',
        rating: 4.8,
        images: ['/lovable-uploads/8aa904f3-8a5e-4a4f-9659-d9a7b77db7e3.png'],
        address: 'Jalan Sultan Ismail, 50250 Kuala Lumpur, Malaysia',
        description: 'Luxury hotel in the heart of Kuala Lumpur with world-class amenities and service.',
        amenities: ['Wi-Fi', 'Swimming Pool', 'Spa', 'Fitness Center', 'Restaurant', 'Room Service', 'Concierge'],
        rooms: [
            {
                id: 'deluxe-room',
                name: 'Deluxe Room',
                type: 'Room',
                size: 320,
                maxGuests: 2,
                price: 6500,
                images: ['/lovable-uploads/8aa904f3-8a5e-4a4f-9659-d9a7b77db7e3.png'],
                amenities: ['Wi-Fi', 'Air Conditioning', 'Mini Bar', 'Flat Screen TV', 'Private Bathroom'],
                description: 'Comfortable deluxe room with modern amenities.',
                isAvailable: true
            },
            {
                id: 'premium-suite',
                name: 'Premium Suite',
                type: 'Suite',
                size: 580,
                maxGuests: 3,
                price: 12000,
                images: ['/lovable-uploads/8aa904f3-8a5e-4a4f-9659-d9a7b77db7e3.png'],
                amenities: ['Wi-Fi', 'Air Conditioning', 'Mini Bar', 'Flat Screen TV', 'Private Bathroom', 'Living Area', 'City View'],
                description: 'Premium suite with stunning city views and luxury amenities.',
                isAvailable: true
            }
        ]
    }
];