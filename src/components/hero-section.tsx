

export function HeroSection() {
    return (
        <div>
            <div className="relative h-[255px] w-full overflow-hidden ">
                {/* Background Image */}
                <img
                    src="/hero-bg.jpg"
                    alt="Hotel room with teal accents and modern furnishing"
                    className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col">

                </div>
            </div>
        </div>
    )
}
