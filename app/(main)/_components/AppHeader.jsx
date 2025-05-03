"use client"
import { useAuthContext } from '@/app/provider'
import { Sidebar, SidebarTrigger } from '@/components/ui/sidebar'
import Image from 'next/image'
import React from 'react'

const AppHeader = () => {
  const {user, dbUser} = useAuthContext();
  
  // Use a fallback image if no user image is available
  const profileImage = user?.photoURL || dbUser?.pictureURL || "/default-avatar.png";

  return (
    <div className='p-3 flex justify-between items-center'>
     <SidebarTrigger/>
     <Image 
        src={profileImage} 
        alt='user' 
        width={40} 
        height={40} 
        className='rounded-full'
     />
    </div>
  )
}

export default AppHeader