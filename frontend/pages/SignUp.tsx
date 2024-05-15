"use client"
import { url } from '@/config';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errmsg, setErrorMsg] = useState("");
const router = useRouter()
  async function handleSubmit(e:any){
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/auth/signup`, {
        username,
        email,
        password
      },{
        withCredentials:true
      });
      console.log('signed in');
      router.push('/otp');
    } catch (error:any) {
      console.error('Error signing in:', error);
      setError(true);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("An error occurred. Please try again.");
      }
    }
  }
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
              onChange={(e) => setUsername(e.target.value)}

              required
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
              onChange={(e) => setEmail(e.target.value)}

              required
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
              onChange={(e) => setPassword(e.target.value)}

              required
            />
          </div>
          <div className="flex justify-center">
            <div className="w-max cursor-pointer border px-6 py-2 rounded-md"
            onClick={handleSubmit}
            >
              Sign Up
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-center mt-4">
              {errmsg}
            </div>
          )}
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
