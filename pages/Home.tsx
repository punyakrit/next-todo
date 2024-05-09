"use client"
import Appbar from '@/components/Appbar'
import React from 'react'
import { useSession } from 'next-auth/react'


 function Home() {
const session  = useSession()
console.log(session)
  return (
    <div>
      <Appbar/>

      {JSON.stringify(session)} 

       </div>
  )
}

export default Home
