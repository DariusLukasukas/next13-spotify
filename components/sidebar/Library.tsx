"use client";
import { BsMusicPlayer } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

export default function Library() {
  const handleClick = (event: any) => {};
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <BsMusicPlayer className="text-neutral-400" size={24} />
          <p className="text-neutral-400 text-md font-medium">Your library</p>
        </div>
        <AiOutlinePlus
          onClick={handleClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">List of Songs!</div>
    </div>
  );
}
