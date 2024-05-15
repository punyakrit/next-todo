import Appbar from '@/components/ui/Appbar'
import SignUp from '@/pages/SignUp'
import React from 'react'

export default function page() {
  return (
    <div className='h-screen w-full bg-gray-900 text-white'>
      <Appbar/>
        <SignUp/>
    </div>
  )
}
