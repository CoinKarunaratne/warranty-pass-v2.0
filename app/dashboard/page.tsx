"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../../lib/types/Post";
import { CardDemo } from "../components/Post";
import Sidebar from "../components/Sidebar";

const allPosts = async () => {
  const response = await axios.get("api/posts/getPost");
  return response.data;
};

const Dashboard = ({}) => {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return error;
  if (isLoading) return "Loading.....";
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="h-screen py-10 w-full overflow-y-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((posts) => (
          <CardDemo
            key={posts.id}
            id={posts.id}
            createdAt={posts.createdAt}
            date={posts.date}
            expiryDate={posts.expiryDate}
            period={posts.period}
            product={posts.product}
            store={posts.store}
            type={posts.type}
            userId={posts.user.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
