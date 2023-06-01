"use strict";
import * as Slider from "@radix-ui/react-slider";
import { useState, useEffect } from "react";

interface AudioSliderProps {
  min: number;
  max: number;
  value: number;
  onChangeStart?: () => void;
  onChange?: (value: number) => void;
  onChangeEnd?: () => void;
}

export const AudioSlider = ({
  min,
  max,
  value,
  onChangeStart,
  onChange,
  onChangeEnd,
}: AudioSliderProps) => {
  const [seekValue, setSeekValue] = useState(value);

  useEffect(() => {
    setSeekValue(value);
  }, [value]);

  const handleValueChange = (newValue: number[]) => {
    setSeekValue(newValue[0]);
    if (onChange) {
      onChange(newValue[0]);
    }
  };

  const formatDuration = (time: number) => {
    const duration = Math.floor(time / 1000);
    return duration;
  };

  return (
    <Slider.Root
      min={min}
      max={formatDuration(max)}
      value={[seekValue]}
      defaultValue={[0]}
      onValueChange={handleValueChange}
      onPointerDown={onChangeStart}
      onPointerUp={onChangeEnd}
      orientation="horizontal"
      className="relative flex items-center select-none touch-none w-full h-6"
    >
      <Slider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
        <Slider.Range className="absolute bg-white rounded-full h-full" />
      </Slider.Track>
      <Slider.Thumb />
    </Slider.Root>
  );
};
