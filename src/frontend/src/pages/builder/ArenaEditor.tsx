import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { ShapesEditor } from "../../components/ShapeEditor";
import { useSizeOfRefEl } from "../../components/SizeOfRefEl";
import { useVideoMetadata } from "../../components/VideoMetadata/hooks";
import { FileMetadata } from "../../shared/ipc";
import { compareShapes, getScaleFactor2D } from "./utils";
import { BuilderShapeProps, VideoArenaFitter } from ".";
import { VideoControls } from "./VideoControls";
import { ArenaVisibilityToggle } from "./VisibilityToggle";

export const ArenaEditor = (props: ArenaEditorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSize = useSizeOfRefEl(videoRef);
  const metadata = useVideoMetadata(props.videoPath);
  const editorScale = useMemo(() => getEditorScale({ videoSize, metadata }), [
    videoSize,
    metadata,
  ]);
  const [shouldShowArena, setShouldShowArena] = useState(true);

  const shapesInOrder = useMemo(
    () => props.shapes.slice().sort(compareShapes),
    [props.shapes]
  );

  useEffect(() => {
    if (!metadata) return;
    props.setShapes((shapes) => {
      const fittedShapes = props.smartShapeFitter({
        shapes,
        rawVideoSize: metadata.dimensionsInPx,
      });
      return fittedShapes;
    });
  }, [metadata]);

  return (
    <div style={{ width: "100%" }}>
      <ArenaVisibilityToggle
        shouldShowArena={shouldShowArena}
        setShouldShowArena={setShouldShowArena}
      />
      <div
        ref={props.shapeEditorRef}
        style={{
          position: "relative",
          height: videoSize.height,
        }}
      >
        <video
          ref={videoRef}
          style={{ position: "absolute" }}
          src={props.videoPath}
          width="100%"
        />
        {shouldShowArena && (
          <div style={{ position: "absolute" }}>
            <ShapesEditor
              size={videoSize}
              scale={editorScale}
              shapes={shapesInOrder}
              selectedShapeId={props.selectedShapeIdState.val}
              setSelectedShapeId={props.selectedShapeIdState.set}
            />
          </div>
        )}
      </div>
      {videoRef.current && <VideoControls video={videoRef.current} />}
    </div>
  );
};

function getEditorScale({
  videoSize,
  metadata,
}: {
  videoSize: {
    width: number | undefined;
    height: number | undefined;
  };
  metadata: FileMetadata | null;
}) {
  const width = videoSize.width;
  const height = videoSize.height;
  if (width === undefined || height === undefined || metadata === null)
    return undefined;
  return getScaleFactor2D({
    targetSize: { width, height },
    actualSize: metadata?.dimensionsInPx,
  });
}

export interface ArenaEditorProps {
  videoPath: string;
  shapes: BuilderShapeProps[];
  setShapes: React.Dispatch<React.SetStateAction<BuilderShapeProps[]>>;
  smartShapeFitter: VideoArenaFitter;
  shapeEditorRef: RefObject<HTMLDivElement>;
  selectedShapeIdState: {
    val: string | null;
    set: React.Dispatch<React.SetStateAction<string | null>>;
  };
}
