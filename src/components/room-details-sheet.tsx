"use client"
import { FaUser, FaBed } from "react-icons/fa"
import Image from "next/image"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Room } from "@/types/hotel"

interface RoomDetailsSheetProps {
    open: boolean
    onOpenChange: (open: boolean) => void;
    room: Room
}

export function RoomDetailsSheet({ open, onOpenChange, room }: RoomDetailsSheetProps) {


    return (
        <Sheet open={open} onOpenChange={onOpenChange} >
            <SheetContent side="right" className="w-full max-w-[900px] p-0 overflow-y-auto">
                <div className="p-6">
                    <SheetHeader className="flex flex-row items-center justify-between space-y-0 pb-6 ">
                        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4">
                            <SheetTitle className="text-[16px] font-[500] leading-[19px] text-black">{room?.room_name}</SheetTitle>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="flex items-center bg-[#dedede] font-bold text-black gap-1 px-[6px] py-[1px]">
                                    <span>{room?.max_guests}</span>
                                    <FaUser className="w-4 h-3 text-black" />
                                </div>
                                <span className="flex items-center bg-[#dedede] font-bold text-black gap-1 px-[6px] py-[1px]">{room?.room_size}</span>
                                <div className="flex items-center bg-[#dedede] font-bold text-black gap-1 px-[6px] py-[1px]">
                                    <FaBed className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </SheetHeader>

                    <div className="mt-6 space-y-8">
                        {/* Room Image Carousel */}
                        <div className="relative">
                            <Carousel className="w-full max-w-[350px]">
                                <CarouselContent>
                                    {room?.slider_images.map((image, index) => (
                                        <CarouselItem key={index}>
                                            <div className="relative h-[250px] w-full">
                                                <Image
                                                    src={image || "/placeholder.svg?height=320&width=600"}
                                                    alt={`Room view ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2" />
                                <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2" />
                            </Carousel>
                        </div>

                        {/* Facilities Section */}
                        <div>
                            <h3 className="text-[16px] font-bold leading-[19px] mb-6">Facilities</h3>
                            <div className="  gap-8">
                                <div>
                                    <ul className="space-y-2 grid grid-cols-1 md:grid-cols-3  text-gray-600">
                                        {room?.amenities.map((item, index) => (
                                            <li className=" font-[400] text-[12px] leading-[25px]" key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                {/* <div>
                                    <h4 className="font-bold leading-[21px] text-[14px] text-black mb-3">Climate control</h4>
                                    <ul className="space-y-2 text-gray-600">
                                        {facilities.climateControl.map((item, index) => (
                                            <li className=" font-[400] text-[12px] leading-[25px]" key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold leading-[21px] text-[14px] text-black mb-3">Entertainment</h4>
                                    <ul className="space-y-2 text-gray-600">
                                        {facilities.entertainment.map((item, index) => (
                                            <li className=" font-[400] text-[12px] leading-[25px]" key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold leading-[21px] text-[14px] text-black mb-3">General Amenities</h4>
                                    <ul className="space-y-2 text-gray-600">
                                        {facilities.generalAmenities.map((item, index) => (
                                            <li className=" font-[400] text-[12px] leading-[25px]" key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold leading-[21px] text-[14px] text-black mb-3">Internet</h4>
                                    <ul className="space-y-2 text-gray-600">
                                        {facilities.internet.map((item, index) => (
                                            <li className=" font-[400] text-[12px] leading-[25px]" key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold leading-[21px] text-[14px] text-black mb-3">Kitchen Features</h4>
                                    <ul className="space-y-2 text-gray-600">
                                        {facilities.kitchenFeatures.map((item, index) => (
                                            <li className=" font-[400] text-[12px] leading-[25px]" key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold leading-[21px] text-[14px] text-black mb-3">Laundry Facilities</h4>
                                    <ul className="space-y-2 text-gray-600">
                                        {facilities.laundry.map((item, index) => (
                                            <li className=" font-[400] text-[12px] leading-[25px]" key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold leading-[21px] text-[14px] text-black mb-3">Room Features & Facilities</h4>
                                    <ul className="space-y-2 text-gray-600">
                                        {facilities.roomFeatures.map((item, index) => (
                                            <li className=" font-[400] text-[12px] leading-[25px]" key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold leading-[21px] text-[14px] text-black mb-3">Bedding Configuration</h4>
                                    <ul className="space-y-2 text-gray-600">
                                        {facilities.bedding.map((item, index) => (
                                            <li className=" font-[400] text-[12px] leading-[25px]" key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
