export function parseDlcProgressUpdate(
  dlcOutput: string
): DlcProgressUpdate | null {
  try {
    const percentComplete = getPercentComplete(dlcOutput);
    const timeRemainingInMs = getTimeRemaining(dlcOutput);
    return { percentComplete, timeRemainingInMs };
  } catch {
    return null;
  }
}

function getTimeRemaining(dlcOutput: string): number | null {
  const timeRemainingMatch = dlcOutput.match(/\[.*<.*,/);
  if (timeRemainingMatch === null) {
    throw new Error("No time remaining match in dlc output");
  }
  const timeString = timeRemainingMatch[0]?.split("<")[1]?.split(",")[0];
  if (timeString === "?" || timeString === undefined) {
    return null;
  }
  const parts = timeString.split(":");
  const seconds = Number(parts[parts.length - 1]);
  const minutes = Number(parts[parts.length - 2]);
  const hours = Number(parts[parts.length - 3]);
  if (isNaN(seconds) || isNaN(minutes)) {
    throw new Error(`Error parsing time remaining string ${timeString}`);
  }

  const timeFromSecondsAndMinutes = seconds * 1000 + minutes * 60e3;
  if (isNaN(hours)) {
    return timeFromSecondsAndMinutes;
  } else {
    return timeFromSecondsAndMinutes + hours * 3600e3;
  }
}

function getPercentComplete(dlcOutput: string): number {
  const percentCompleteMatch = dlcOutput.match(/[0-9]+%/);
  if (percentCompleteMatch === null) {
    throw new Error("No percentage in dlc output");
  }
  return Number(percentCompleteMatch[0]?.split("%")[0]);
}

interface DlcProgressUpdate {
  percentComplete: number;
  timeRemainingInMs: number | null;
}
