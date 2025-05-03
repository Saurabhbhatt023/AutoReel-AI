"use client"
import React, { useEffect } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'
import { useAuthContext } from '../provider'

const DashboardProvider = ({children}) => {

    const {user} = useAuthContext();
    useEffect(() => {
user && CheckedUserAuthentication()
    } , [user])

    const CheckedUserAuthentication = () => {
        if(!user){

            router.replace('/')
        }


    }
  return (
    <SidebarProvider>
    
        <AppSidebar />
     <div className='w-full'> 
        <AppHeader/>
          {children}
          </div>
       
    </SidebarProvider>
  )
}

export default DashboardProvider