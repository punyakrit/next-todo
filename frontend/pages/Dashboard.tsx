"use client";
import { url } from "@/config";
import axios from "axios";
import { Cross, Pencil, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [addTask, setAddTask] = useState(false);
  const route = useRouter();
  const [data, setData] = useState<any>([]);
  const [user, setUser] = useState(true);
  const [username, setUsername] = useState("");
  const [count, setCount] = useState(0);

  function handleTask() {
    setAddTask(!addTask);
  }

  function closeAddTask() {
    setAddTask(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/task/`, {
          withCredentials: true,
        });
        setData(response.data.task);
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
        setUsername(response.data.userDetails.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(false);
      }
    };
    userData();
    fetchData();
  }, [addTask, count]);

  useEffect(() => {
    if (!user) {
      route.push("/signin");
    }
  }, [user, route]);

  async function handleDeleteTask(id: string) {
    try {
      await axios.delete(`${url}/task/${id}`, { withCredentials: true });
      setCount((count) => count + 1);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  

  return (
    <div className="pt-24 px-40">
      {addTask && <AddTask onClose={closeAddTask} />}
      <div className="text-4xl pb-2">Welcome {username}</div>
      <div className="flex justify-between text-xl">
        <div>My Tasks</div>
        <div onClick={handleTask} className="border p-3 cursor-pointer">
          Add Tasks
        </div>
      </div>
      <div className="py-4 overflow-y-scroll h-[600px] mt-4">
        {data.map((todo: any) => (
          <TaskComponent
            key={todo._id}
            id={todo._id}
            title={todo.title}
            desc={todo.description}
            date={todo.date}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

function TaskComponent({ id, title, desc, date, onDelete }: any) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  async function handleDeleteTask() {
    onDelete(id);
  }
 

  return (
    <div className="bg-gray-800 p-6 rounded-lg my-4">
      <div className="flex">
        <div className="w-4/5">
          <input type="checkbox" className="text-xl"></input>
          <div className="text-2xl font-bold">{title}</div>
          <div>{desc}</div>
          <div className="flex space-x-16 mt-5">
            
            <div
              className="flex items-center text-xl text-red-500 cursor-pointer"
              onClick={handleDeleteTask}
            >
              <Trash className="mr-4 text-lg" /> Delete
            </div>
          </div>
        </div>
        <div className="w-1/5">{formattedDate}</div>
      </div>
    </div>
  );
}

function AddTask({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    axios
      .post(
        `${url}/task`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  }

  return (
    <div className="h-screen w-screen justify-center flex items-center top-0 left-0 z-20 fixed bg-black">
      <div className="w-full max-w-md rounded-lg p-6 shadow-lg bg-gray-900">
        <div onClick={onClose} className="flex justify-end">
          <X />
        </div>
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold">Add Your Daily Task</h2>
        </div>
        <form className="space-y-9">
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              className="mt-2 text-xl text-white px-4 border-b py-1 bg-transparent"
              id="title"
              placeholder="Demo title "
              type="text"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label htmlFor="password">Description</label>
            </div>
            <input
              className="mt-2 text-xl text-white px-4 border-b py-1 bg-transparent"
              id="description"
              placeholder="description"
              type="text"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="w-max cursor-pointer border px-6 py-2 rounded-md bg-gray-800 text-white"
              onClick={handleSubmit}
            >
              Add task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
