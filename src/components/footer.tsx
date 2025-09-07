'use client'

import { usePropertyStore } from '@/hooks/usePropertyInfo'
import React from 'react'

const Footer = () => {
    const { property } = usePropertyStore()
    return (
        <div
            translate='no'
            className="bg-[#dedede] text-[#008ace] px-4 py-4 font-[400] leading-[21px] text-[14px] flex justify-center items-center text-center mb-3"
        >
            {property?.address}
        </div>
    )
}

export default Footer
