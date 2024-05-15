import Appbar from '@/components/ui/Appbar'
import Dashboard from '@/pages/Dashboard'
import React from 'react'

export default function page() {
  return (
    <div className='h-screen w-full bg-gray-900 text-white'>
      <Appbar/>
      <Dashboard/>
    </div>
  )
}
