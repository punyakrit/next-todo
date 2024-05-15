"use client";
import { url } from "@/config";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Appbar() {
  const router = useRouter();
  const [data, setData] = useState(false);

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
  console.log(data);

  const handleLogout = () => {
    // Remove the cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to the login page or any other desired page
    router.push("/signin");
  };

  return (
    <div className="h-20 backdrop-blur-md fixed w-screen flex justify-between px-40 items-center">
      <Link href={"/"}>
        <div className="text-3xl font-bold italic">EasyTasks</div>
      </Link>
      <div className="flex space-x-10">
        <Link href={"/"}>
          <div>Home</div>
        </Link>
        <Link href={"/dashboard"}>
          <div>Dashboard</div>
        </Link>
        {data ? (
          <div className="cursor-pointer" onClick={handleLogout}>Logout</div>
        ) : (
          <Link href={"/signup"}>
            <div>Register</div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Appbar;
