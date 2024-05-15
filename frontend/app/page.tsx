import Appbar from '@/components/ui/Appbar'
import Home from '@/pages/Home'
import React from 'react'

function page() {
  return (
    <div className='h-screen w-full bg-gray-900 text-white'>
      <Appbar/>
      <Home/>
    </div>
  )
}

export default page
