"use client";

import { useGetSongById } from "@/hooks/client/useGetSongById";
import { useLoadSongUrl } from "@/hooks/client/useLoadSongUrl";
import { usePlayer } from "@/hooks/usePlayer";

export default function Player() {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  console.log(song, songUrl, player.activeId);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div
      className="
        fixed
        bottom-0
        bg-black
        w-full
        py-2
        h-[80px]
        px-4
      "
    >
      Player
    </div>
  );
}
