import Search from "./Search";
import Sidebar from "./Sidebar";
import { Skeleton } from "./ui/skeleton";

const Loading = ({}) => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Search />
        <div className="h-screen py-10 pl-[50px] lg:pl-[100px] w-full overflow-y-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Skeleton className="w-[300px] h-[400px]" />
          <Skeleton className="w-[300px] h-[400px]" />
          <Skeleton className="w-[300px] h-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
