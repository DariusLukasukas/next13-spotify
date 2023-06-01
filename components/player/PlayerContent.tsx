"use client";

import { useEffect, useState } from "react";
import { Song } from "@/types/types";

import MediaItem from "../sidebar/MediaItem";
import Slider from "../ui/slider/Slider";
import LikeButton from "@/app/search/components/LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import { usePlayer } from "@/hooks/usePlayer";
import useSound from "use-sound";
import { AudioSlider } from "./AudioSlider";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

export default function PlayerContent({ song, songUrl }: PlayerContentProps) {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  //   BACK AND FORWARD LOGIC
  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  //   MUSIC PLAYER LOGIC
  const [play, { pause, sound, duration }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false), onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };
  //   TRACK TIMELINE
  useEffect(() => {
    if (sound && !isSeeking) {
      const interval = setInterval(() => {
        setCurrentTime(sound.seek() || 0);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [sound, isSeeking]);

  const formatTime = (timeInMilliseconds: number) => {
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  //   VOLUME CONTROL
  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  const handleSliderChangeStart = () => {
    setIsSeeking(true);
  };

  const handleSliderChange = (event: any) => {
    const newTime = Number(event.target.value);
    setCurrentTime(newTime);
    if (sound) {
      sound.seek(newTime);
    }
  };

  const handleSliderChangeEnd = () => {
    if (sound) {
      sound.seek(currentTime);
    }
    setIsSeeking(false);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={() => {}}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={onPlayPrevious}
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center rounded-full bg-white h-10 w-10 p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition space-x-4"
          onClick={onPlayNext}
        />

        <div className="flex items-center w-full text-xs">
          <div>{formatTime(currentTime * 1000)}</div>
          <AudioSlider
            min={0}
            max={duration || 0}
            value={currentTime}
            onChangeStart={handleSliderChangeStart}
            onChange={handleSliderChange}
            onChangeEnd={handleSliderChangeEnd}
          />
          <div>{formatTime(duration!)}</div>
        </div>
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            size={34}
            onClick={toggleMute}
            className="cursor-pointer"
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
}
