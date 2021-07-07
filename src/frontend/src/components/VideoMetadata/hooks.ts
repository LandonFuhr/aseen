import { getFileData } from "../../core/electron/ipc";
import { FileMetadata } from "../../shared/ipc";
import { useEffect, useState } from "react";
import { getMockLevel, MockLevel, WebMock } from "../../mocks/mocks";

export function useVideoMetadata(
  videoPath: string | null
): FileMetadata | null {
  const [metadata, setMetadata] = useState<FileMetadata | null>(null);

  useEffect(() => {
    if (videoPath === null) return;
    let cancelled = false;
    _getFileMetadata({ path: videoPath })
      .then((metadata) => {
        if (cancelled) return;
        setMetadata(metadata);
      })
      .catch((e) => {
        console.error(e);
        if (cancelled) return;
        setMetadata(null);
      });
    return () => {
      cancelled = true;
    };
  }, [videoPath]);

  return metadata;
}

async function _getFileMetadata({
  path,
}: {
  path: string;
}): Promise<FileMetadata> {
  switch (getMockLevel()) {
    case MockLevel.WEB:
      return WebMock.videoMetadata;
    default:
      return getFileData({ path });
  }
}
