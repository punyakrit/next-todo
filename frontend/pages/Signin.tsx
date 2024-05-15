"use client";
import { url } from "@/config";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import React, { useState } from "react";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errmsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handler(event:any) {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/auth/signin`, {
        username,
        password
      },{
        withCredentials:true
      });
      console.log('signed in');
      router.push('/dashboard');
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
    <div className="flex h-screen w-full items-center justify-center bg-gray-950">
      <div className="w-full max-w-md rounded-lg p-6 shadow-lg bg-gray-900">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>
        <form className="space-y-9" onSubmit={handler}>
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              className="mt-2 text-xl text-white px-4 border-b py-1 bg-transparent"
              id="username"
              placeholder="@John_Doe"
              type="text"
              required
              onChange={(e) => setUsername(e.target.value)}
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
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button className="w-max cursor-pointer border px-6 py-2 rounded-md bg-gray-800 text-white">
              Sign in
            </button>
          </div>
          {error && (
            <div className="text-red-500 text-center mt-4">
              {errmsg}
            </div>
          )}
        </form>
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?
          <Link href="/signup">
            <div className="font-medium text-gray-900 hover:underline dark:text-gray-400">
              Register
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
