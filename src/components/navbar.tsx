'use client'
import React from 'react'
import { usePropertyStore } from '@/hooks/usePropertyInfo'

const Navbar = () => {
    const { property } = usePropertyStore()
    return (
        <div translate='no' className="bg-[#dedede] mb-4 text-[#008ace] leading-[21px] px-4 py-4 font-[500]">
            {property?.name}
        </div>
    )
}

export default Navbar
