import Link from 'next/link'
import React from 'react'

function SignUp() {
  return (
    <div className="flex text-white h-screen w-full items-center justify-center bg-gray-950">
      <div className="w-full max-w-md rounded-lg  p-6 shadow-lg bg-gray-900">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold">New User!</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Register to create your account to continue
          </p>
        </div>
        <form className="space-y-9">
          <div className="flex flex-col">
            <label htmlFor="username" className="">
              Username
            </label>
            <input
              className="mt-2 text-xl text-white px-4 border-b py-1 bg-transparent"
              id="username"
              placeholder="@John_Doe"
              type="username"
            />
            </div>
            <div className="flex flex-col">
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              className="mt-2 text-xl text-white px-4 border-b py-1 bg-transparent"
              id="email"
              placeholder="johndoe@gmail.com"
              type="email"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label htmlFor="password">Password</label>
            </div>
            <input
              className="mt-2 text-xl text-white px-4 border-b py-1 bg-transparent"
              id="password"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <div className="flex justify-center">
            <div className="w-max cursor-pointer border px-6 py-2 rounded-md">
              Sign Up
            </div>
          </div>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
         Already have an Account 
         <Link href={'/signin'}>
          <div className="font-medium text-gray-900 hover:underline dark:text-gray-400">
            Login
          </div>
         </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
