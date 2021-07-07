import path from "path";
import { handleFileMetadataRequest } from "../handlers";

describe("File metadata request handler", () => {
  it("returns number of bytes", async () => {
    const vidPath = path.join(__dirname, "assets", "test_video.mp4");
    const nBytes = 9200598;

    const metadata = await handleFileMetadataRequest({} as any, {
      path: vidPath,
    });
    expect(metadata?.nBytes).toEqual(nBytes);
  });

  it("returns average framerate", async () => {
    const vidPath = path.join(__dirname, "assets", "test_video.mp4");
    const averageFramerate = 23.976;

    const metadata = await handleFileMetadataRequest({} as any, {
      path: vidPath,
    });
    expect(metadata?.averageFramerate).toEqual(averageFramerate);
  });

  it("returns duration in milliseconds", async () => {
    const vidPath = path.join(__dirname, "assets", "test_video.mp4");
    const durationInMilliseconds = 623791;

    const metadata = await handleFileMetadataRequest({} as any, {
      path: vidPath,
    });
    expect(metadata?.durationInMilliseconds).toEqual(durationInMilliseconds);
  });

  it("returns video dimensions in pixels", async () => {
    const vidPath = path.join(__dirname, "assets", "test_video.mp4");
    const dimensionsInPx = {
      width: 376,
      height: 256,
    };

    const metadata = await handleFileMetadataRequest({} as any, {
      path: vidPath,
    });

    expect(metadata?.dimensionsInPx).toEqual(dimensionsInPx);
  });

  it("returns null for file that doesn't exist", async () => {
    const vidPath = path.join(
      __dirname,
      "assets",
      "some-video-that-doesnt-exist.mp4"
    );
    expect(
      await handleFileMetadataRequest({} as any, { path: vidPath })
    ).toBeNull();
  });
});
