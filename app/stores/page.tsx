"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../../lib/types/Post";
import { CardDemo } from "../components/Post";
import Sidebar from "../components/Sidebar";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { StoreCard } from "../components/StoreCard";

const allPosts = async () => {
  const response = await axios.get("api/posts/getPost");
  return response.data;
};

const Dashboard = ({}) => {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return <Error error={error} />;
  if (isLoading) return <Loading />;

  const storeCounts = data?.reduce((acc, post) => {
    const { store } = post;
    if (acc[store]) {
      acc[store]++;
    } else {
      acc[store] = 1;
    }
    return acc;
  }, {});

  const stores = Object.keys(storeCounts).map((storeName) => ({
    name: storeName,
    count: storeCounts[storeName],
  }));

  return (
    <div className="flex flex-row gap-1">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="h-[10vh]"></div>
        <div className="py-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {stores?.map((posts) => (
            <StoreCard key={posts.name} name={posts.name} count={posts.count} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
