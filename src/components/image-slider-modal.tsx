"use client";

import * as React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, X } from 'lucide-react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"

interface ImageSliderModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    images: string[]
    initialIndex?: number
}

export function ImageSliderModal({
    open,
    onOpenChange,
    images,
    initialIndex = 0
}: ImageSliderModalProps) {
    const [api, setApi] = useState<CarouselApi>()
    const [currentIndex, setCurrentIndex] = useState(initialIndex)
    const [zoom, setZoom] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

    const zoomIn = () => {
        setZoom((prev) => Math.min(prev + 0.5, 3))
    }

    const zoomOut = () => {
        setZoom((prev) => Math.max(prev - 0.5, 0.5))
        if (zoom <= 1) {
            setPosition({ x: 0, y: 0 })
        }
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoom > 1) {
            setIsDragging(true)
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            })
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && zoom > 1) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            })
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const resetZoom = () => {
        setZoom(1)
        setPosition({ x: 0, y: 0 })
    }

    // Set up carousel API and track current slide
    useEffect(() => {
        if (!api) return

        const onSelect = () => {
            setCurrentIndex(api.selectedScrollSnap())
            resetZoom() // Reset zoom when changing slides
        }

        api.on("select", onSelect)
        onSelect() // Set initial index

        return () => {
            api.off("select", onSelect)
        }
    }, [api])

    // Reset when modal opens
    useEffect(() => {
        if (open) {
            resetZoom()
            if (api) {
                api.scrollTo(initialIndex)
            }
        }
    }, [open, initialIndex, api])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="max-w-none w-[90vw] h-[90vh] p-0 bg-black/95 border-none rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                <div className="relative w-full h-full">
                    {/* Close Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
                        onClick={() => onOpenChange(false)}
                    >
                        <X className="h-6 w-6" />
                    </Button>

                    {/* Zoom Controls */}
                    <div className="absolute top-4 right-16 z-50 flex gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20 rounded-full"
                            onClick={zoomOut}
                            disabled={zoom === 1}
                        >
                            <ZoomOut className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20 rounded-full"
                            onClick={zoomIn}
                            disabled={zoom >= 3}
                        >
                            <ZoomIn className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Carousel Container */}
                    <Carousel
                        setApi={setApi}
                        className="w-full h-full"
                        opts={{
                            align: "center",
                            loop: true,
                        }}
                    >
                        <CarouselContent className="h-full">
                            {images.map((image, index) => (
                                <CarouselItem key={index} className="h-[100vh] w-[90vw]">
                                    <div
                                        className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
                                        onMouseDown={handleMouseDown}
                                        onMouseMove={handleMouseMove}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseUp}
                                    >
                                        {/* Fixed the container - removed flex centering */}
                                        <div
                                            className="absolute inset-0 transition-transform duration-200 ease-out"
                                            style={{
                                                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                                            }}
                                        >
                                            <Image
                                                src={image || "/placeholder.svg"}
                                                alt={`Hotel image ${index + 1}`}
                                                fill
                                                className="object-contain select-none"
                                                draggable={false}
                                                priority={index === currentIndex}
                                            />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Custom styled navigation buttons */}
                        <CarouselPrevious className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 z-50 text-white bg-white/10 hover:bg-white/20 border-white/20 h-12 w-12" />
                        <CarouselNext className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 z-50 text-white bg-white/10 hover:bg-white/20 border-white/20 h-12 w-12" />
                    </Carousel>

                    {/* Image Counter */}
                    {images.length > 1 && (
                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                            {currentIndex + 1} / {images.length}
                        </div>
                    )}

                    {/* Thumbnail Strip */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/50 p-2 rounded-lg max-w-[90%] overflow-x-auto">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    className={`relative w-12 h-8 rounded overflow-hidden border-2 transition-all flex-shrink-0 ${index === currentIndex
                                        ? 'border-white'
                                        : 'border-transparent hover:border-white/50'
                                        }`}
                                    onClick={() => {
                                        if (api) {
                                            api.scrollTo(index)
                                        }
                                    }}
                                >
                                    {/* Fixed thumbnail image */}
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}