import { X } from 'lucide-react'

export default function BookingLegend() {
    return (
        <div className=" grid grid-cols-2  md:flex items-center gap-2 py-2 px-6">
            {/* No check-ins */}
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-cyan-500 rounded-sm"></div>
                <span className="text-sm text-gray-700">No check-ins</span>
            </div>

            {/* No check-outs */}
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-pink-500 rounded-sm"></div>
                <span className="text-[12px] text-gray-700">No check-outs</span>
            </div>

            {/* Min length of stay required */}
            <div className="flex items-center gap-2">
                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-orange-500"></div>
                <span className="text-[12px] text-gray-700">Min length of stay required</span>
            </div>

            {/* Sold Out */}
            <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-gray-500" strokeWidth={2} />
                <span className="text-[12px] text-gray-700">Sold Out</span>
            </div>
        </div>
    )
}
