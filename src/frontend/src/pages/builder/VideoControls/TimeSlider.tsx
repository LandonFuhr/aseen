import { ChangeEvent, useState } from "react";
import { Slider, withStyles } from "@material-ui/core";
import { useEffectEveryFrame } from "./utils";

export const VideoTimeSlider = ({ video }: VideoTimeSliderProps) => {
  const [progress, setProgress] = useState(0);

  useEffectEveryFrame(() => {
    setProgress((video.currentTime / video.duration) * 100);
  }, [video]);

  function handleTimeChange(event: ChangeEvent<{}>, value: number | number[]) {
    event.stopPropagation();
    if (typeof value === "number") {
      video.pause();
      video.currentTime = video.duration * (value / 100);
    }
  }

  return <CustomSlider value={progress} onChange={handleTimeChange} />;
};

const CustomSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -4,
    marginLeft: -8,
  },
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

interface VideoTimeSliderProps {
  video: HTMLVideoElement;
}
