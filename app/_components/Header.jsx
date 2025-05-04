"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Authentication from './Authentication'
import { useAuthContext } from '../provider'
import Link from 'next/link'

const Header = () => {
  const { user } = useAuthContext()
  
  return (
    <div className='p-4 flex items-center justify-between '> 
      <div className='flex items-center gap-3'>
        <Image src="/logo.svg"  // should be in public folder
          alt="Logo"
          width={40}
          height={40}
          priority  // optional, improves LCP (use only if logo is crucial above the fold)
        />
        <h2 className='text-2xl font-bold'>Video Gen</h2>
      </div>

      <div>
        {!user ? (
          <Authentication> 
            <Button>Get Started</Button>
          </Authentication>
        ) : (
          <div className="flex items-center gap-3">
              <Link href={'./dashboard'}> 
            <Button>Dashboard</Button>
            </Link>
           
            {user?.pictureURL ? (
              <Image 
                src={user.pictureURL} 
                alt="User Image" 
                width={40} 
                height={40} 
                className='rounded-full'
              />
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600">{user.email?.[0]?.toUpperCase() || 'U'}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Header