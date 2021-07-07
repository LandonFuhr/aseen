import { parseDlcProgressUpdate } from "../parser";

describe("Dlc Progress Parser", () => {
  it("returns null when message is not a progress update", () => {
    const result = parseDlcProgressUpdate(
      "2021-06-21 19:08:20.008736: W tensorflow/stream_executor/platform/default/dso_loader.cc:55] Could not load dynamic library 'nvcuda.dll'; dlerror: nvcuda.dll not found"
    );

    expect(result).toBeNull();
  });

  it("returns null time remaining when initializing", () => {
    const result = parseDlcProgressUpdate(
      "  0%|          | 0/66 [00:00<?, ?it/s]"
    );

    expect(result?.timeRemainingInMs).toBeNull();
  });

  it("returns correct time remaining when processing with only seconds", () => {
    const result = parseDlcProgressUpdate(
      " 61%|######    | 40/66 [00:04<00:02,  9.05it/s]"
    );

    expect(result?.timeRemainingInMs).toEqual(2e3);
  });

  it("returns correct time remaining when given minutes and seconds", () => {
    const result = parseDlcProgressUpdate(
      "  5%|4         | 745/14956 [01:59<41:19,  5.73it/s]"
    );

    expect(result?.timeRemainingInMs).toEqual(2479e3);
  });

  it("returns correct time remaining when given hours, minutes, and seconds", () => {
    const result = parseDlcProgressUpdate(
      "  3%|2         | 552/18408 [03:11<1:49:46,  2.71it/s]"
    );

    expect(result?.timeRemainingInMs).toEqual(6586e3);
  });

  it("returns progress percentage", () => {
    const result = parseDlcProgressUpdate(
      " 61%|######    | 40/66 [00:04<00:02,  9.05it/s]"
    );

    expect(result?.percentComplete).toEqual(61);
  });
});
