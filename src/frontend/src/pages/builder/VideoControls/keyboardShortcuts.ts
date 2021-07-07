import { useEffect } from "react";
import { togglePlayPause } from "./utils";

export function useVideoKeyboardShortcuts(video: HTMLVideoElement) {
  const ARROW_SKIP_SIZE_IN_SECONDS = 1;

  useEffect(() => {
    function handleSpace() {
      togglePlayPause(video);
    }

    function handleArrowRight() {
      video.currentTime += ARROW_SKIP_SIZE_IN_SECONDS;
    }

    function handleArrowLeft() {
      video.currentTime -= ARROW_SKIP_SIZE_IN_SECONDS;
    }

    function handleKeydown(event: KeyboardEvent) {
      switch (event.key) {
        case Keys.Space:
          event.preventDefault(); // prevent page scroll when clicking spacebar
          handleSpace();
          return;
        case Keys.ArrowRight:
          handleArrowRight();
          return;
        case Keys.ArrowLeft:
          handleArrowLeft();
          return;
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [video]);
}

const Keys = {
  Space: " ",
  ArrowRight: "ArrowRight",
  ArrowLeft: "ArrowLeft",
};
