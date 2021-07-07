import { ShapeType } from "../../../components/ShapeEditor/Shapes/types";
import { BuilderShapeProps, VideoArenaFitter } from "../../../pages/builder";
import { ThreeChamberRegionIds } from "./regions";

const OUTER_BUFFER_PROPORTION = 0.05;

export const fitThreeChamberShapes: VideoArenaFitter = ({
  shapes,
  rawVideoSize,
}) => {
  const fittedShapes = shapes.slice();
  for (const shape of fittedShapes) {
    switch (shape.shape.id) {
      case ThreeChamberRegionIds.chamber1:
        fitChamber({ shape, rawVideoSize, chamberNumber: 1 });
        break;
      case ThreeChamberRegionIds.chamber2:
        fitChamber({ shape, rawVideoSize, chamberNumber: 2 });
        break;
      case ThreeChamberRegionIds.chamber3:
        fitChamber({ shape, rawVideoSize, chamberNumber: 3 });
        break;
      case ThreeChamberRegionIds.cup1:
        fitCup1({ shape, rawVideoSize });
        break;
      case ThreeChamberRegionIds.cup2:
        fitCup2({ shape, rawVideoSize });
        break;
    }
  }
  return fittedShapes;
};

function getChamberX({
  videoWidth,
  chamberNumber,
}: {
  videoWidth: number;
  chamberNumber: number;
}) {
  const horizontalOuterBuffer = getHorizontalOuterBuffer({ videoWidth });
  const singleSidedBuffer = horizontalOuterBuffer / 2;
  const zeroIndexedChamberIndex = chamberNumber - 1;
  const chamberWidth = getChamberWidth({ videoWidth });
  return singleSidedBuffer + chamberWidth * zeroIndexedChamberIndex;
}

function getChamberY({ videoHeight }: { videoHeight: number }) {
  const verticalOuterBuffer = getVerticalOuterBuffer({ videoHeight });
  const singleSidedBuffer = verticalOuterBuffer / 2;
  return singleSidedBuffer;
}

function getHorizontalOuterBuffer({ videoWidth }: { videoWidth: number }) {
  return videoWidth * OUTER_BUFFER_PROPORTION * 2;
}

function getVerticalOuterBuffer({ videoHeight }: { videoHeight: number }) {
  return videoHeight * OUTER_BUFFER_PROPORTION * 2;
}

function getChamberWidth({ videoWidth }: { videoWidth: number }) {
  const horizontalOuterBuffer = getHorizontalOuterBuffer({ videoWidth });
  return (videoWidth - horizontalOuterBuffer) / 3;
}

function getChamberHeight({ videoHeight }: { videoHeight: number }) {
  const verticalOuterBuffer = getVerticalOuterBuffer({ videoHeight });
  return videoHeight - verticalOuterBuffer;
}

function fitChamber({
  shape,
  rawVideoSize,
  chamberNumber,
}: {
  shape: BuilderShapeProps;
  rawVideoSize: { width: number; height: number };
  chamberNumber: number;
}) {
  if (shape.shape.type === ShapeType.rectangle) {
    const { width: videoWidth, height: videoHeight } = rawVideoSize;
    shape.shape.width = getChamberWidth({ videoWidth });
    shape.shape.height = getChamberHeight({ videoHeight });
    shape.shape.topLeft = {
      x: getChamberX({
        videoWidth,
        chamberNumber,
      }),
      y: getChamberY({ videoHeight }),
    };
    shape.shape.rotation = 0;
  }
}

function getCupWidth({ videoWidth }: { videoWidth: number }) {
  return videoWidth / 10.0;
}

function getCupHeight({ videoWidth }: { videoWidth: number }) {
  return videoWidth / 10.0;
}

const fitCup1: RegionVideoFitter = ({ shape, rawVideoSize }) => {
  if (shape.shape.type === ShapeType.ellipse) {
    const { width: videoWidth } = rawVideoSize;
    shape.shape.radiusX = getCupWidth({ videoWidth });
    shape.shape.radiusY = getCupHeight({ videoWidth });
    shape.shape.center = {
      x: rawVideoSize.width / 6.0,
      y: rawVideoSize.height / 5.0,
    };
    shape.shape.rotation = 0;
  }
};

const fitCup2: RegionVideoFitter = ({ shape, rawVideoSize }) => {
  if (shape.shape.type === ShapeType.ellipse) {
    const { width: videoWidth } = rawVideoSize;
    shape.shape.radiusX = getCupWidth({ videoWidth });
    shape.shape.radiusY = getCupHeight({ videoWidth });
    shape.shape.center = {
      x: rawVideoSize.width - rawVideoSize.width / 6.0,
      y: rawVideoSize.height / 5.0,
    };
    shape.shape.rotation = 0;
  }
};

type RegionVideoFitter = (args: {
  shape: BuilderShapeProps;
  rawVideoSize: { width: number; height: number };
}) => void;
