import Image from "next/image"
import Link from "next/link"

interface proprtyProps {
    id?: number;
    name?: string;
    title?: string;
    banner_img?: string;
    footer_img: string;
    description?: string;
    address?: string;
}

interface propertyDetailsProps {
    propertyData?: proprtyProps;
}


const PropertyDetails = ({ propertyData }: propertyDetailsProps) => {
    return (
        <div className="w-full overflow-hidden p-5 mt-4 bg-white rounded-md shadow-lg mb-3">
            <h2 className="text-[16px] font-[500] text-black mb-4">
                Property Details
            </h2>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Image Section */}
                <div className="relative w-full h-60 md:h-auto">
                    <Image src={propertyData?.footer_img || "/placeholder.png"} alt="Hotel" fill className="object-cover rounded-md" />
                </div>

                {/* Content Section */}
                <div className="md:col-span-2 md:ml-5">
                    <h2 translate="no" className="text-[16px] font-[500] text-[#212529] mb-2">
                        {propertyData?.name || "Property Name"}
                    </h2>

                    <p className="text-[12px] font-[400] text-[#212529] leading-[24px]">
                        {propertyData?.description || "This is a sample description of the property. It provides an overview of the amenities and features available to guests."}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm mt-6">
                        <Link href={"#"} className="text-[#008ace] underline text-[12px] font-[400]">
                            Home
                        </Link>
                        <Link href={"#"} className="text-[#008ace] underline text-[12px] font-[400]">
                            About Us
                        </Link>
                        <Link href={"#"} className="text-[#008ace] underline text-[12px] font-[400]">
                            Privacy Policy
                        </Link>
                        <Link href={"#"} className="text-[#008ace] underline text-[12px] font-[400]">
                            Manage Bookings
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyDetails