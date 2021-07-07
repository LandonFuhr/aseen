import { ArenaType } from "./types";

export function getStringFromMemorySize(bytes: number): string {
  const unit = 1024;
  if (bytes < unit) {
    return `${bytes} bytes`;
  }
  const kb = bytes / unit;
  if (kb < unit) {
    return `${kb.toFixed(1)} KB`;
  }
  const mb = kb / unit;
  if (mb < unit) {
    return `${mb.toFixed(1)} MB`;
  }
  const gb = mb / unit;
  return `${gb.toFixed(1)} GB`;
}

export function arenaTypeToString(arenaType: ArenaType): string {
  switch (arenaType) {
    case ArenaType.ThreeChamber:
      return "Three-Chamber";
    case ArenaType.PlusMaze:
      return "Elevated Plus Maze";
    case ArenaType.NORT:
      return "Novel Object Recognition";
    case ArenaType.Custom:
      return "Custom";
  }
}

export function numberWithinLimits(
  num: number,
  { high, low }: { high: number; low: number }
): number {
  if (num > high) {
    return high;
  }
  if (num < low) {
    return low;
  }
  return num;
}

const msInASecond = 1000;
const msInAMinute = 60000;
const msInAnHour = 3600000;

export function durationToString(durationInMilliseconds: number): string {
  if (durationInMilliseconds < msInASecond) {
    return "less than a second";
  }
  if (durationInMilliseconds < msInAMinute) {
    return durationToSecondsString(durationInMilliseconds);
  }
  const totalMinutes = Math.floor(durationInMilliseconds / msInAMinute);
  if (totalMinutes < 60) {
    return durationToMinutesString(durationInMilliseconds);
  }
  if (isAWholeNumberHour(totalMinutes)) {
    return durationToHoursString(durationInMilliseconds);
  }
  return [
    durationToHoursString(durationInMilliseconds),
    durationToMinutesString(durationInMilliseconds % msInAnHour),
  ].join(" ");
}

function isAWholeNumberHour(minutes: number): boolean {
  return minutes % 60 === 0;
}

function durationToSecondsString(durationInMilliseconds: number): string {
  const seconds = Math.floor(durationInMilliseconds / 1000);
  return `${seconds} second${seconds > 1 ? "s" : ""}`;
}

function durationToMinutesString(durationInMilliseconds: number): string {
  const minutes = Math.floor(durationInMilliseconds / msInAMinute);
  return `${minutes} minute${minutes > 1 ? "s" : ""}`;
}

function durationToHoursString(durationInMilliseconds: number): string {
  const hours = Math.floor(durationInMilliseconds / msInAnHour);
  return `${hours} hour${hours > 1 ? "s" : ""}`;
}
