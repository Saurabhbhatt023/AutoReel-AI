"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Authentication from './Authentication'

const Header = () => {
  return (
    <div className='p-4 flex items-center justify-between '> 
    <div className='flex items-center gap-3'>
      <Image 
        src="/logo.svg"  // should be in public folder
        alt="Logo"
        width={40}
        height={40}
        priority  // optional, improves LCP (use only if logo is crucial above the fold)
      />
      <h2 className='text-2xl font-bold'>Video Gen</h2>
    </div>

     <div>
      <Authentication> 
        <Button>Get Started </Button>
      </Authentication>
     </div>
    </div>
  )
}

export default Header
