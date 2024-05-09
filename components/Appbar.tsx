"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
function Appbar() {
  const { data: session, status } = useSession();

  return (
    <div className=" bg-gray-900 h-20 items-center px-44 text-white flex justify-between ">
      <Link href={"/"}>
        <div className="text-3xl cursor-pointer">Appbar</div>
      </Link>
      <div className="">
        {status == "authenticated" ? (
          <div
            className="cursor-pointer"
            onClick={() => {
              signOut();
            }}
          >
            SignOut
          </div>
        ) : (
          <div
            className="cursor-pointer"
            onClick={() => {
              signIn("google");
            }}
          >
            SignIn
          </div>
        )}
      </div>
    </div>
  );
}

export default Appbar;
