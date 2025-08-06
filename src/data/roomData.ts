// Define the Room interface
interface Room {
    id: number;
    name: string;
    type: string;
    maxGuests: number; // Maximum number of guests (the capacity with person icon)
    area: number; // Area in sq ft
    originalPrice: number;
    discountedPrice: number;
    discount: number;
    savings: number;
    image: string;
    amenities: string[];
    description: string;
    isPopular?: boolean;
    bedType: string;
    availableRooms: number; // Number of this room type available
    selectedRooms: number; // Currently selected in booking (default 0)
}

// Create array of 6 dummy rooms
const hotelRooms: Room[] = [
    {
        id: 1,
        name: "One Bedroom Executive Suite",
        type: "Executive Suite",
        maxGuests: 2, // 2 👥
        area: 622, // 622 sq ft
        originalPrice: 460, // MYR 460
        discountedPrice: 414, // MYR 414
        discount: 10, // 10% Off
        savings: 46, // Save MYR 46
        image: "/images/executive-suite.jpg",
        amenities: ["City View", "Work Desk", "Mini Bar", "Wi-Fi", "Air Conditioning"],
        description: "Spacious executive suite with modern amenities and city views",
        isPopular: true,
        bedType: "King Bed",
        availableRooms: 3, // Available rooms of this type
        selectedRooms: 0 // Default selected (the dropdown value)
    },
    {
        id: 2,
        name: "Deluxe Ocean View Room",
        type: "Deluxe Room",
        maxGuests: 2,
        area: 485,
        originalPrice: 380,
        discountedPrice: 342,
        discount: 10,
        savings: 38,
        image: "/images/deluxe-ocean.jpg",
        amenities: ["Ocean View", "Balcony", "Mini Fridge", "Wi-Fi", "Bathtub"],
        description: "Beautiful room with stunning ocean views and private balcony",
        bedType: "Queen Bed",
        availableRooms: 5,
        selectedRooms: 0
    },
    {
        id: 3,
        name: "Premium Business Suite",
        type: "Business Suite",
        maxGuests: 3,
        area: 720,
        originalPrice: 550,
        discountedPrice: 495,
        discount: 10,
        savings: 55,
        image: "/images/business-suite.jpg",
        amenities: ["Lounge Access", "Meeting Area", "Kitchenette", "Wi-Fi", "Printer"],
        description: "Perfect for business travelers with dedicated work space",
        bedType: "King Bed + Sofa Bed",
        availableRooms: 2,
        selectedRooms: 0
    },
    {
        id: 4,
        name: "Standard City Room",
        type: "Standard Room",
        maxGuests: 2,
        area: 320,
        originalPrice: 250,
        discountedPrice: 225,
        discount: 10,
        savings: 25,
        image: "/images/standard-city.jpg",
        amenities: ["City View", "Wi-Fi", "Air Conditioning", "TV", "Safe"],
        description: "Comfortable standard room with essential amenities",
        bedType: "Double Bed",
        availableRooms: 8,
        selectedRooms: 0
    },
    {
        id: 5,
        name: "Family Garden Suite",
        type: "Family Suite",
        maxGuests: 4,
        area: 850,
        originalPrice: 680,
        discountedPrice: 612,
        discount: 10,
        savings: 68,
        image: "/images/family-garden.jpg",
        amenities: ["Garden View", "Separate Living Room", "Kitchenette", "Wi-Fi", "Kids Area"],
        description: "Spacious family suite with garden views and children's play area",
        isPopular: true,
        bedType: "2 Queen Beds",
        availableRooms: 2,
        selectedRooms: 0
    },
    {
        id: 6,
        name: "Luxury Penthouse Suite",
        type: "Penthouse Suite",
        maxGuests: 4,
        area: 1200,
        originalPrice: 950,
        discountedPrice: 855,
        discount: 10,
        savings: 95,
        image: "/images/penthouse-luxury.jpg",
        amenities: ["Panoramic Views", "Jacuzzi", "Full Kitchen", "Butler Service", "Terrace"],
        description: "Ultimate luxury with panoramic city views and premium services",
        bedType: "King Bed + Queen Bed",
        availableRooms: 1,
        selectedRooms: 0
    }
];



// Export the data and helper functions
export {
    type Room,
    hotelRooms,

};

