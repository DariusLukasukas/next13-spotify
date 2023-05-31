import { useLoadImage } from "@/hooks/useLoadImage";
import { Song } from "@/types/types";
import React from "react";

interface MediaItemProps {
  data: Song;
  onClick: (id: string) => void;
}

export default function MediaItem({ data, onClick }: MediaItemProps) {
  const imageUrl = useLoadImage(data);
  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
    // TODO: Turn on player
  };
  return <div onClick={handleClick}></div>;
}
