"use client";

import { useState, useRef, useEffect } from "react";
import { Home, LogOut, Expand, Plus, Building, Wallet } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import CreatePost from "./CreatePost";
import { getSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface SidebarIconProps {
  icon: React.ReactNode;
  text: string;
}

const Sidebar = () => {
  const [expand, setExpand] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const createPostRef = useRef<HTMLButtonElement>(null);

  const getUser = async () => {
    const user = await getSession();
    await setSession(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  const { toast } = useToast();

  const signUserOut = async () => {
    try {
      toast({
        title: "Signing you out !",
      });
      await signOut({
        callbackUrl: `${window.location.origin}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

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
    if (createPostRef.current) {
      createPostRef.current.click();
    }
  };

  return (
    <div className="w-44 h-screen">
      <div
        className={`fixed z-20 top-0 left-0 h-screen ${
          expand ? "w-44" : "w-20"
        } transition-all duration-300 m-0 flex flex-col justify-between bg-gray-100 dark:bg-gray-900 text-white p-5 shadow-lg`}
      >
        <div className="flex flex-row gap-4">
          <Avatar>
            <AvatarImage src={session?.user?.image || "default-image.jpg"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {expand && <div className="text-sm">{session?.user?.name}</div>}
        </div>
        <div>
          <Link href="/">
            <SidebarIcon icon={<Home size={26} />} text="Home" />
          </Link>
          <CreatePost buttonRef={createPostRef} />
          <div onClick={handleClick}>
            <SidebarIcon icon={<Plus size={26} />} text="Add-New" />
          </div>
          <Link href="/dashboard">
            <SidebarIcon icon={<Wallet size={26} />} text="Wallet" />
          </Link>
          <Link href="/stores">
            <SidebarIcon icon={<Building size={26} />} text="Stores" />
          </Link>
          <div onClick={signUserOut}>
            <SidebarIcon icon={<LogOut size={26} />} text="Log-out" />
          </div>
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
