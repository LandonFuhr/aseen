import { useEffect } from "react";

export function togglePlayPause(video: HTMLVideoElement) {
  if (videoIsPaused(video)) {
    video.play();
  } else {
    video.pause();
  }
}

export function videoIsPaused(video: HTMLVideoElement) {
  return video === null || video.paused;
}

export function useEffectEveryFrame(
  effect: React.EffectCallback,
  deps?: React.DependencyList
) {
  const dependencies = deps ? deps : [];

  useEffect(() => {
    const interval = setInterval(effect, 16);
    return () => {
      clearInterval(interval);
    };
  }, [effect, ...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps
}
