import Sidebar from "./Sidebar";

const Error = ({ error }: any) => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="h-screen py-10 w-full overflow-y-scroll grid relative">
        <p className="absolute top-5 left-5 text-black dark:text-white text-lg">
          Server-side error occured
        </p>
        <p className="absolute top-5 left-5 text-black dark:text-white text-lg">
          {error}
        </p>
      </div>
    </div>
  );
};

export default Error;
