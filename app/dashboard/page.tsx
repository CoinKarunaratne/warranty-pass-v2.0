import { FC } from "react";
import Sidebar from "../components/Sidebar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface pageProps {}

const page = async ({}) => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Sidebar user={session?.user} />
    </div>
  );
};

export default page;
