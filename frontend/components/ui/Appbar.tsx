"use client";
import { url } from "@/config";
import axios from "axios";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Appbar() {
  const router = useRouter();
  const [data, setData] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/user`, {
          withCredentials: true,
        });
        setData(true);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function toggleMenu() {
    setMenu(!menu);
  }

  const handleLogout = () => {
    // Remove the cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to the login page or any other desired page
    router.push("/signin");
  };

  return (
    <div>

   
    <div className="h-20 backdrop-blur-md fixed w-screen flex justify-between md:px-40 px-5 items-center">
      <Link href="/">
        <div className="text-3xl font-bold italic cursor-pointer">EasyTasks</div>
      </Link>
      <div className="md:hidden" onClick={toggleMenu}>
        <Menu />
      </div>
      <div className="md:flex space-x-10 hidden">
        <Link href="/">
          <div className="cursor-pointer">Home</div>
        </Link>
        <Link href="/dashboard">
          <div className="cursor-pointer">Dashboard</div>
        </Link>
        {data ? (
          <div className="cursor-pointer" onClick={handleLogout}>
            Logout
          </div>
        ) : (
          <Link href="/signup">
            <div className="cursor-pointer">Register</div>
          </Link>
        )}
      </div>
      </div>
      {menu && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-60 backdrop-blur-3xl">
          <div className="text-white h-screen w-screen  justify-center items-center p-4">
            <div
              className="flex justify-end text-3xl cursor-pointer"
              onClick={toggleMenu}
            >
              <X />
            </div>
            <div className="flex flex-col justify-center items-center h-full space-y-10">
              <div className="cursor-pointer text-2xl font-semibold  transition duration-300">
                About
              </div>
              <Link href="/services">
                <div className="cursor-pointer text-2xl font-semibold  transition duration-300">
                  Services
                </div>
              </Link>
              <div className="cursor-pointer text-2xl font-semibold transition duration-300">
                Contact Us
              </div>
            </div>
          </div>
        </div>
        
      )}
    </div>
  );
}

export default Appbar;
