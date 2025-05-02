"use client"
import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <div>
      <Image 
        src="/logo.svg"  // should be in public folder
        alt="Logo"
        width={40}
        height={40}
        priority  // optional, improves LCP (use only if logo is crucial above the fold)
      />
    </div>
  )
}

export default Header
