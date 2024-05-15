import Appbar from '@/components/ui/Appbar'
import Signin from '@/pages/Signin'
import React from 'react'

export default function page() {
  return (
    <div className='h-screen w-full bg-gray-900 text-white'>
      <Appbar/>
      <Signin/>
      </div>
  )
}
