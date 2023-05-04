"use client";

import { useState, useRef, useEffect } from "react";
import { Home, LogOut, Expand, Plus, Building } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import CreatePost from "./CreatePost";
import { getSession } from "next-auth/react";

interface SidebarIconProps {
  icon: React.ReactNode;
  text: string;
}

const Sidebar = () => {
  const [expand, setExpand] = useState(false);
  const [session, setSession] = useState(null);
  const createPostRef = useRef(null);

  const getUser = async () => {
    const user = await getSession();
    await setSession(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  const SidebarIcon = ({ icon, text }: SidebarIconProps) => (
    <div
      className={`relative left-0 flex items-center self-start justify-center h-12 w-12 mt-2 mb-2 shadow-lg bg-gray-800 text-green-500 hover:bg-green-600 hover:text-white rounded-3xl hover:rounded-xl transition-all duration-300 ease-linear cursor-pointer group`}
    >
      {icon}
      <span
        className={`absolute w-auto p-2 m-4 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900 text-sm ${
          expand ? "scale-100" : "scale-0"
        } origin-left group-hover:scale-100 transition-all duration-300`}
      >
        {text}
      </span>
    </div>
  );

  const handleClick = () => {
    createPostRef.current.click();
  };

  return (
    <div className="w-60 h-screen">
      <div
        className={`fixed top-0 left-0 h-screen ${
          expand ? "w-44" : "w-20"
        } transition-all duration-300 m-0 flex flex-col justify-between bg-gray-100 dark:bg-gray-900 text-white p-5 shadow-lg`}
      >
        <div className="flex flex-row gap-4">
          <Avatar>
            <AvatarImage src={session?.user?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {expand && <div className="text-sm">{session?.user?.name}</div>}
        </div>
        <div>
          <Link href="/">
            <SidebarIcon icon={<Home size={26} />} text="Home" />
          </Link>
          <CreatePost ref={createPostRef} />
          <div onClick={handleClick}>
            <SidebarIcon icon={<Plus size={26} />} text="Add-New" />
          </div>

          <SidebarIcon icon={<Building size={26} />} text="Stores" />
          <SidebarIcon icon={<LogOut size={26} />} text="Log-out" />
        </div>
        <div
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <SidebarIcon icon={<Expand size={26} />} text="Expand" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
