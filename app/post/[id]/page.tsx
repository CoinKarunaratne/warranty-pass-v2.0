"use client";

import { PostType } from "../../../lib/types/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { DetailedCard } from "@/app/components/DetailedCard";

type URL = {
  params: {
    id: string;
  };
};

const fetchDetails = async (id: string) => {
  const response = await axios.get(`/api/posts/${id}`);
  return response.data;
};

const PostDetails = (url: URL) => {
  const { data, isLoading } = useQuery<PostType[]>({
    queryFn: () => fetchDetails(url.params.id),
    queryKey: ["detail-post"],
  });
  if (isLoading) return "Loading...";
  return (
    <div className="relative h-screen flex items-center justify-center overflow-x-hidden">
      <div className="container pt-32 max-w-7xl w-full mx-auto h-full">
        <div className="h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start">
          <div className="relative w-full max-w-xl lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute">
            <Image
              priority
              quality={100}
              style={{ objectFit: "contain" }}
              className="scale-125 img-shadow hidden lg:inline-block"
              fill
              src={`/ps5.png`}
              alt="controller"
            />
          </div>
          <DetailedCard
            key={data?.id}
            id={data?.id}
            createdAt={data?.createdAt}
            date={data?.date}
            expiryDate={data?.expiryDate}
            period={data?.period}
            product={data?.product}
            store={data?.store}
            type={data?.type}
            userId={data?.user.id}
            picture={data?.picture}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
