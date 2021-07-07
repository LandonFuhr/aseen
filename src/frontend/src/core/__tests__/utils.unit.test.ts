import {
  durationToString,
  getStringFromMemorySize,
  numberWithinLimits,
} from "../utils";

describe("Duration to string", () => {
  it("converts values less than 1000 ms to 'less than a second'", () => {
    expect(durationToString(0)).toEqual("less than a second");
    expect(durationToString(100)).toEqual("less than a second");
    expect(durationToString(999)).toEqual("less than a second");
  });

  it("converts values between 1 second and 1 minute to '__ second[s]'", () => {
    expect(durationToString(1000)).toEqual("1 second");
    expect(durationToString(1999)).toEqual("1 second");

    expect(durationToString(2000)).toEqual("2 seconds");
    expect(durationToString(2999)).toEqual("2 seconds");

    expect(durationToString(59000)).toEqual("59 seconds");
    expect(durationToString(59999)).toEqual("59 seconds");
  });

  it("converts values between 1 minute and 1 hour to '__ minute[s]'", () => {
    expect(durationToString(60000)).toEqual("1 minute");
    expect(durationToString(119999)).toEqual("1 minute");

    expect(durationToString(120000)).toEqual("2 minutes");
    expect(durationToString(179999)).toEqual("2 minutes");

    expect(durationToString(3.54e6)).toEqual("59 minutes");
    expect(durationToString(3599999)).toEqual("59 minutes");
  });

  it("converts values above 1 hour to '__ hour[s] [__ minute[s]]'", () => {
    expect(durationToString(3.6e6)).toEqual("1 hour"); // 1 hour 0 minutes 0 seconds
    expect(durationToString(3659999)).toEqual("1 hour"); // 1 hour 0 minutes 59.999... seconds

    expect(durationToString(3.66e6)).toEqual("1 hour 1 minute"); // 1 hour 1 minute 0 seconds
    expect(durationToString(3719999)).toEqual("1 hour 1 minute"); // 1 hour 1 minute 59.999... seconds

    expect(durationToString(3.72e6)).toEqual("1 hour 2 minutes"); // 1 hour 2 minutes 0 seconds
    expect(durationToString(3779999)).toEqual("1 hour 2 minutes"); // 1 hour 2 minutes 59.999.. seconds

    expect(durationToString(7.14e6)).toEqual("1 hour 59 minutes"); // 1 hour 59 minutes 0 seconds
    expect(durationToString(7199999.4)).toEqual("1 hour 59 minutes"); // 1 hour 59 minutes 59.999.. seconds

    expect(durationToString(7.2e6)).toEqual("2 hours"); // 2 hours 0 minutes 0 seconds
    expect(durationToString(7259999)).toEqual("2 hours"); // 2 hours 0 minutes 59.999... seconds

    expect(durationToString(7.26e6)).toEqual("2 hours 1 minute"); // 2 hours 1 minute 0 seconds
    expect(durationToString(7319999)).toEqual("2 hours 1 minute"); // 2 hours 1 minute 59.999... seconds

    expect(durationToString(9150000)).toEqual("2 hours 32 minutes"); // 2 hours 32 minutes 30 seconds

    expect(durationToString(6.984e8)).toEqual("194 hours"); // 194 hours 0 minutes 0 seconds
  });
});

describe("Number within limits", () => {
  it("returns the bottom limit when the input is less than the bottom limit", () => {
    const high = 100;
    for (const low of [-10, 0, 10]) {
      expect(numberWithinLimits(low - 1, { high, low })).toBe(low);
    }
  });

  it("returns the upper limit when the input is greater than the upper limit", () => {
    const low = -100;
    for (const high of [-10, 0, 10]) {
      expect(numberWithinLimits(high + 1, { high, low })).toBe(high);
    }
  });

  it("returns the input/limit when the input is exactly on a limit", () => {
    expect(numberWithinLimits(100, { high: 100, low: 10 })).toBe(100);
    expect(numberWithinLimits(30, { high: 100, low: 30 })).toBe(30);
  });

  it("returns the input when the input is within the limits", () => {
    expect(numberWithinLimits(50, { high: 100, low: 10 })).toBe(50);
    expect(numberWithinLimits(-50, { high: 100, low: -100 })).toBe(-50);
  });
});

describe("Bytes to nice string", () => {
  it("shows bytes if size is under a KB", () => {
    const result = getStringFromMemorySize(1023);
    expect(result).toEqual("1023 bytes");
  });

  it("shows KB if size exactly a KB", () => {
    const result = getStringFromMemorySize(1024);
    expect(result).toEqual("1.0 KB");
  });

  it("shows KB if size under a MB", () => {
    const result = getStringFromMemorySize(4830);
    expect(result).toEqual("4.7 KB");
  });

  it("shows MB if size is exactly a MB", () => {
    const result = getStringFromMemorySize(1048576);
    expect(result).toEqual("1.0 MB");
  });

  it("shows MB if size is under a GB", () => {
    const result = getStringFromMemorySize(71932313);
    expect(result).toEqual("68.6 MB");
  });

  it("shows GB if size is exactly a GB", () => {
    const result = getStringFromMemorySize(1073741824);
    expect(result).toEqual("1.0 GB");
  });

  it("shows GB if size is above a GB", () => {
    const result = getStringFromMemorySize(9116068085);
    expect(result).toEqual("8.5 GB");
  });
});
