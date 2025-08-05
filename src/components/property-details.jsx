import Image from 'next/image'
import Link from 'next/link'

const PropertyDetails = () => {
    return (
        <div className='w-full  overflow-hidden  p-5 mt-4 bg-white rounded-md shadow-lg mb-3'>
            <h2 className="text-[16px] font-[500] text-black mb-4">Property Details</h2>
            <div className=" w-full grid grid-cols-3">
                {/* Image Slider Section */}
                <div className="relative col-span-1">
                    <div className=" w-full h-full">
                        <Image
                            src={"/property-details-img.jpg"}
                            alt={`Hotel`}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Content Section */}
                <div className=" col-span-2 ml-5">
                    {/* Header */}
                    <div className="flex flex-col">
                        <h2 className="text-[16px] font-[500] text-[#212529] mb-2">Pavilion Ceylon Hill Suites by Perfect Host</h2>
                        <p className=' text-[12px] font-[400] text-[#212529] leading-[24px]'>
                            Pavilion Ceylon Hill by Perfect Host offers stunning city views and free Wi-Fi, providing comfortable accommodation in the heart of Kuala Lumpur. Conveniently located near Changkat Bukit Bintang, Jalan Alor, and Pavilion Kuala Lumpur, guests have easy access to the city's vibrant attractions. Each unit features air conditioning, a fully equipped kitchen with a dining area, a flat-screen TV, and a private bathroom with a bidet, hairdryer, and complimentary toiletries. Additional amenities include a microwave, fridge, and kettle for added convenience. Guests can enjoy the year-round outdoor swimming pool, relax on the sun terrace, or stay active at the fitness center. The property also features a kid’s pool and a children’s playground for families. Pavilion Ceylon Hill by Perfect Host is just 1.5 km from Pavilion Kuala Lumpur and 2.2 km from KL Tower.
                        </p>
                        <div className="flex items-center gap-4 text-sm mt-6">
                            <Link href={"#"} className='text-[#008ace] underline text-[12px] font-[400]'>Home</Link>
                            <Link href={"#"} className='text-[#008ace] underline text-[12px] font-[400]'>About Us</Link>
                            <Link href={"#"} className='text-[#008ace] underline text-[12px] font-[400]'>Privacy Policy</Link>
                            <Link href={"#"} className='text-[#008ace] underline text-[12px] font-[400]'>Manage Bookings</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyDetails