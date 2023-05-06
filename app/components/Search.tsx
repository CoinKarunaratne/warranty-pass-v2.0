"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";

type SearchProps = {
  handleSearch: (value: string) => void;
};

const Search = ({ handleSearch }: SearchProps) => {
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (search === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please type something!",
      });
    }
    handleSearch(search);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      // 13 is the keyCode for "Enter" key
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-4 w-[50%] self-center mt-10">
      <div className="flex flex-row relative justify-center gap-4 grow">
        <input
          type="text"
          placeholder="Search your products here"
          className="h-[50px] grow border-slate-500 border-solid border-2 rounded-xl px-5 bg-transparent dark:text-white"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <span className="hidden sm:inline-block absolute right-0 rounded-xl h-full w-auto p-1">
          <Button
            onClick={handleSubmit}
            className="rounded-xl h-[50px] sm:h-full bg-transparent hover:bg-transparent dark:text-white font-bold text-[20px] text-black"
          >
            <SearchIcon />
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Search;
