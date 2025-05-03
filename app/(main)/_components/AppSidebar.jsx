import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"

  import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { HomeIcon, LucideFileVideo, Search, WalletCards } from 'lucide-react'
import Link from 'next/link'

const MenuItems = [

    {
        title: 'Home',
        url: '/dashboard',
        icon: HomeIcon

    },
    {
        title : 'Create New  Vidoe',
         url: "/create-new-video",
         icon: LucideFileVideo

    },
    {
        title : 'Explore',
        url: '/explore',
        icon: Search,
    },
    {
        title : 'Billing',
        url: '/billing',
        icon:WalletCards
    },
]
const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div>

       
        <div className='flex items-center gap-3 w-full justify-center mt-5 '> 
     
        <Image src = {'/logo.svg'} alt = 'logo' width = {40} height= {40} />
        <h2 className='font-bold text-2xl '>Video Gen</h2>
        </div>
        <h2 className='text-lg text-gray-400 text-center mt-3'> AI Short Video Generator</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
         <SidebarGroup>
            <div className='mx-5 mt-10'>
                <Button className= "w-full">+Create New video</Button>
            </div>
            <SidebarMenu>
                {MenuItems.map((menu, index) => (
                 

                    <SidebarMenuItem className= "mt-3">
                        <SidebarMenuButton className= "p-5" >
                            <Link href= {menu.url} className='flex items-center gap-4 p-3'>
                              <menu.icon/>
                              <span>{menu?.title}</span>
                            </Link>

                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
         </SidebarGroup> 
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar