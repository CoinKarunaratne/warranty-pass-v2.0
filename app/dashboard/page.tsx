// "use client";

// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import { PostType } from "../../lib/types/Post";
// import { CardDemo } from "../components/Post";
// import Sidebar from "../components/Sidebar";
// import Error from "../components/Error";
// import Loading from "../components/Loading";
// import Search from "../components/Search";
// import { useState } from "react";
// import { Button } from "../components/ui/button";

// const allPosts = async () => {
//   const response = await axios.get("api/posts/getPost");
//   return response.data;
// };

// const Dashboard = ({}) => {
//   const [search, setSearch] = useState("");
//   const { data, error, isLoading } = useQuery<PostType[]>({
//     queryFn: allPosts,
//     queryKey: ["posts"],
//   });
//   if (error) return <Error error={error} />;
//   if (isLoading) return <Loading />;
//   const handleSearch = async (value: string) => {
//     await setSearch(value);

//     console.log(search);
//   };
//   const clearSearch = () => {
//     setSearch("");
//   };
//   return (
//     <div className="flex flex-row gap-1">
//       <Sidebar />
//       <div className="flex flex-col w-full">
//         <Search handleSearch={handleSearch} />
//         {search !== "" && (
//           <Button onClick={clearSearch} variant="link" className="mt-1">
//             Clear search
//           </Button>
//         )}
//         <div className="h-auto min-h-screen p-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
//           {search !== ""
//             ? data
//                 ?.filter((posts) => posts.product === search)
//                 .map((posts) => (
//                   <CardDemo
//                     key={posts.id}
//                     id={posts.id}
//                     createdAt={posts.createdAt}
//                     date={posts.date}
//                     expiryDate={posts.expiryDate}
//                     period={posts.period}
//                     product={posts.product}
//                     store={posts.store}
//                     type={posts.type}
//                   />
//                 ))
//             : data?.map((posts) => (
//                 <CardDemo
//                   key={posts.id}
//                   id={posts.id}
//                   createdAt={posts.createdAt}
//                   date={posts.date}
//                   expiryDate={posts.expiryDate}
//                   period={posts.period}
//                   product={posts.product}
//                   store={posts.store}
//                   type={posts.type}
//                 />
//               ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
