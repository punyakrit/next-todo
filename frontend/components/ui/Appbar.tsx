import Link from 'next/link'
import React from 'react'

function Appbar() {
  return (
    <div className='h-20 fixed w-screen flex justify-between px-40 items-center'>
      <Link href={'/'}>
      <div className='text-3xl font-bold italic'>
        EasyTasks
      </div>
      </Link>
      <div className='flex space-x-10'>
        <Link href={'/'}>
        <div>Home</div>
        </Link>
        <Link href={'/dashboard'}>
        <div>Dashboard</div>
        </Link>
        <Link href={'/signup'}>
        <div>Register</div>
        </Link>

      </div>
    </div>
  )
}

export default Appbar
