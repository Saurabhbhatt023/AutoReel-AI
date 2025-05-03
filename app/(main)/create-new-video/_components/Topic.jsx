import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import React from 'react'

const Topic = () => {
  return (
    <div>
        <h2 className='mb-1'>Project Title</h2>
        <Input placeholder = "Enter Project Title"/>

         <div className='mt-5'> 
       <h2>Video Topic</h2>
       <p className='text-sm text-gray-600'>Select topic for your video</p>

       <Tabs defaultValue="suggestion" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
    <TabsTrigger value="your_topic">Your Topic</TabsTrigger>
  </TabsList>
  <TabsContent value="suggestion">Make changes to your account here.</TabsContent>
  <TabsContent value="your_topic">Change your password here.</TabsContent>
</Tabs>

       </div>
    </div>
  )
}

export default Topic 
