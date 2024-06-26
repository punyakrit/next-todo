import tt from "@/public/assets/tt.png";
import Image from "next/image";
import Link from "next/link";

 function Home() {
 
  
  return (
    
    <div className=" h-full items-center flex px-10 xl:px-40">
      <div className="w-2/3">
        <div className="text-7xl font-bold">
          Stay on top of your tasks with our Todo App
        </div>
        <div className="text-xl py-6">
          Organize your life, increase productivity, and never forget a task
          again with our powerful todo app.
        </div>
        <div className="flex space-x-11">
          <Link href={'signup'}>
          <div className="bg-black text-white px-7 cursor-pointer py-3 rounded-xl text-xl">
            SignUp
          </div>
          </Link>
          <Link href={'/signin'}>
          <div className="bg-white text-black px-7 py-3 rounded-xl cursor-pointer text-xl">
            Login
          </div>
          </Link>
        </div>
      </div>
      <div className="w-1/3">
        <Image className="w-[400px]" src={tt} alt="image" />
      </div>
    </div>
  );
}

export default Home;
