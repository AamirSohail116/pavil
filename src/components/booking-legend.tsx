import { X } from 'lucide-react'

export default function BookingLegend() {
    return (
        // CHANGE 1: Updated grid layout and responsive spacing for better mobile display
        <div className="grid grid-cols-2 gap-1 py-2 px-3 md:flex md:items-center md:gap-3 md:px-6">
            {/* No check-ins */}
            <div className="flex items-center gap-1 md:gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-cyan-500 rounded-sm flex-shrink-0"></div>
                {/* CHANGE 2: Reduced text size and made it more responsive */}
                <span className="text-[10px] md:text-sm text-gray-700 leading-tight">No check-ins</span>
            </div>

            {/* No check-outs */}
            <div className="flex items-center gap-1 md:gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-pink-500 rounded-sm flex-shrink-0"></div>
                {/* CHANGE 3: Consistent text sizing across all legend items */}
                <span className="text-[10px] md:text-sm text-gray-700 leading-tight">No check-outs</span>
            </div>

            {/* Min length of stay required */}
            <div className="flex items-center gap-1 md:gap-2 col-span-2 md:col-span-1">
                {/* CHANGE 4: Made triangle smaller on mobile and prevented shrinking */}
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] md:border-l-[8px] md:border-r-[8px] md:border-b-[14px] border-l-transparent border-r-transparent border-b-orange-500 flex-shrink-0"></div>
                {/* CHANGE 5: Made text wrap better and smaller on mobile */}
                <span className="text-[10px] md:text-sm text-gray-700 leading-tight">Min length of stay required</span>
            </div>

            {/* Sold Out */}
            <div className="flex items-center gap-1 md:gap-2 md:col-span-1">
                {/* CHANGE 6: Made X icon smaller on mobile */}
                <X className="w-3 h-3 md:w-4 md:h-4 text-gray-500 flex-shrink-0" strokeWidth={2} />
                <span className="text-[10px] md:text-sm text-gray-700 leading-tight">Sold Out</span>
            </div>
        </div>
    )
}