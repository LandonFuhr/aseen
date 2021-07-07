import { FileMetadata } from "../shared/ipc";

const fakeVideoMetadata: FileMetadata = {
  durationInMilliseconds: 100000,
  averageFramerate: 30,
  nBytes: 105919,
  createdAtDate: new Date("2021-05-14"),
  dimensionsInPx: {
    width: 300,
    height: 200,
  },
};

export const WebMock = {
  videoPath: "C:/path/to/fake/video.mp4",
  resultsFolder: "C:/path/to/fake/results/folder",
  videoMetadata: fakeVideoMetadata,
};

export const ElectronMock = {
  dlcConfigYamlPath: "C:/path/to/fake/config.yaml",
  resultsFolder: "C:/path/to/fake/results/folder",
};

export function getMockLevel(): MockLevel {
  const mockLevel = process.env.REACT_APP_MOCK_LEVEL;
  switch (mockLevel) {
    case "WEB":
      return MockLevel.WEB;
    case "ELECTRON":
      return MockLevel.ELECTRON;
    default:
      return MockLevel.PRODUCTION;
  }
}

export enum MockLevel {
  WEB,
  ELECTRON,
  PRODUCTION,
}
