"use client";
import { url } from "@/config";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const route = useRouter();
  const [data, setData] = useState(null);
  const [user, setUser] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/task/`, {
          withCredentials: true,
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const userData = async () => {
      try {
        const response = await axios.get(`${url}/user`, {
          withCredentials: true,
        });
        setUser(response.data.userDetails.verified);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setUser(false);
      }
    };
    userData();

    fetchData();
  }, []);

  if (!user) {
    route.push("/signin");
  }

  return (
    <div className="pt-24 px-40">
      <div className="flex justify-between text-xl">
        <div>My Tasks</div>
        <div>Add Tasks</div>
      </div>
      <div className="py-4">
        <TaskComponent />
      </div>
    </div>
  );
};

function TaskComponent() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex">
        <div className="w-4/5">
          <input type="checkbox" className="text-xl"></input>
          <div className="text-2xl font-bold">title</div>
          <div>Description</div>
          <div className="flex space-x-16 mt-5">
            <div className="flex items-center text-xl">
              <Pencil className="mr-4 text-lg" />
              Edit
            </div>
            <div className="flex items-center text-xl text-red-500">
              <Trash className="mr-4 text-lg" /> Delete
            </div>
          </div>
        </div>
        <div className="w-1/5">
          Date
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
