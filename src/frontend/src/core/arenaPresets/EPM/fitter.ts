import { ShapeType } from "../../../components/ShapeEditor/Shapes/types";
import { BuilderShapeProps, VideoArenaFitter } from "../../../pages/builder";
import { EpmRegionIds } from "./regions";

const OUTER_BUFFER_PROPORTION = 0.05;
const CENTER_SIDE_LENGTH_PROPORTION = 0.17;

export const fitEpmShapes: VideoArenaFitter = ({ shapes, rawVideoSize }) => {
  const fittedShapes = shapes.slice();
  for (const shape of fittedShapes) {
    switch (shape.shape.id) {
      case EpmRegionIds.closedArm1:
        fitClosedArm1({ shape, rawVideoSize });
        break;
      case EpmRegionIds.closedArm2:
        fitClosedArm2({ shape, rawVideoSize });
        break;
      case EpmRegionIds.openArm1:
        fitOpenArm1({ shape, rawVideoSize });
        break;
      case EpmRegionIds.openArm2:
        fitOpenArm2({ shape, rawVideoSize });
        break;
      case EpmRegionIds.center:
        fitCenter({ shape, rawVideoSize });
        break;
    }
  }
  return fittedShapes;
};

function fitClosedArm1({
  shape,
  rawVideoSize,
}: {
  shape: BuilderShapeProps;
  rawVideoSize: { width: number; height: number };
}) {
  if (shape.shape.type === ShapeType.rectangle) {
    const width = getArmMajorLength({ rawVideoSize });
    const height = getArmMinorLength({ rawVideoSize });
    const {
      halfVideoWidth,
      halfCenter,
      halfVideoHeight,
      halfShapeHeight,
    } = getHalfLengths({ rawVideoSize, shapeSize: { width, height } });
    shape.shape.topLeft = {
      x: halfVideoWidth - halfCenter - width,
      y: halfVideoHeight - halfShapeHeight,
    };
    shape.shape.height = height;
    shape.shape.width = width;
  }
}

function fitClosedArm2({
  shape,
  rawVideoSize,
}: {
  shape: BuilderShapeProps;
  rawVideoSize: { width: number; height: number };
}) {
  if (shape.shape.type === ShapeType.rectangle) {
    const height = getArmMinorLength({ rawVideoSize });
    const width = getArmMajorLength({ rawVideoSize });
    const {
      halfVideoWidth,
      halfCenter,
      halfVideoHeight,
      halfShapeHeight,
    } = getHalfLengths({ rawVideoSize, shapeSize: { width, height } });
    shape.shape.topLeft = {
      x: halfVideoWidth + halfCenter,
      y: halfVideoHeight - halfShapeHeight,
    };
    shape.shape.height = height;
    shape.shape.width = width;
  }
}

function fitOpenArm1({
  shape,
  rawVideoSize,
}: {
  shape: BuilderShapeProps;
  rawVideoSize: { width: number; height: number };
}) {
  if (shape.shape.type === ShapeType.rectangle) {
    const height = getArmMajorLength({ rawVideoSize });
    const width = getArmMinorLength({ rawVideoSize });
    const {
      halfVideoWidth,
      halfVideoHeight,
      halfCenter,
      halfShapeWidth,
    } = getHalfLengths({
      rawVideoSize,
      shapeSize: { width, height },
    });
    shape.shape.topLeft = {
      x: halfVideoWidth - halfShapeWidth,
      y: halfVideoHeight - halfCenter - height,
    };
    shape.shape.height = height;
    shape.shape.width = width;
  }
}

function fitOpenArm2({
  shape,
  rawVideoSize,
}: {
  shape: BuilderShapeProps;
  rawVideoSize: { width: number; height: number };
}) {
  if (shape.shape.type === ShapeType.rectangle) {
    const height = getArmMajorLength({ rawVideoSize });
    const width = getArmMinorLength({ rawVideoSize });
    const {
      halfVideoWidth,
      halfVideoHeight,
      halfCenter,
      halfShapeWidth,
    } = getHalfLengths({
      rawVideoSize,
      shapeSize: { width, height },
    });
    shape.shape.topLeft = {
      x: halfVideoWidth - halfShapeWidth,
      y: halfVideoHeight + halfCenter,
    };
    shape.shape.height = height;
    shape.shape.width = width;
  }
}

function fitCenter({
  shape,
  rawVideoSize,
}: {
  shape: BuilderShapeProps;
  rawVideoSize: { width: number; height: number };
}) {
  if (shape.shape.type === ShapeType.rectangle) {
    const { width: videoWidth, height: videoHeight } = rawVideoSize;
    const height = getCenterSideLength({ rawVideoSize });
    const width = getCenterSideLength({ rawVideoSize });
    shape.shape.topLeft = {
      x: (videoWidth - width) / 2,
      y: (videoHeight - height) / 2,
    };
    shape.shape.height = height;
    shape.shape.width = width;
  }
}

function getArmMinorLength({
  rawVideoSize,
}: {
  rawVideoSize: { width: number; height: number };
}): number {
  return getCenterSideLength({ rawVideoSize });
}

function getArmMajorLength({
  rawVideoSize,
}: {
  rawVideoSize: { width: number; height: number };
}): number {
  const dim = Math.min(rawVideoSize.width, rawVideoSize.height);
  return (
    (dim -
      getOuterBuffer({ rawVideoSize }) * 2 -
      getCenterSideLength({ rawVideoSize })) /
    2
  );
}

function getCenterSideLength({
  rawVideoSize,
}: {
  rawVideoSize: { width: number; height: number };
}): number {
  const dim = Math.min(rawVideoSize.width, rawVideoSize.height);
  return (
    (dim - getOuterBuffer({ rawVideoSize }) * 2) * CENTER_SIDE_LENGTH_PROPORTION
  );
}

function getOuterBuffer({
  rawVideoSize,
}: {
  rawVideoSize: { width: number; height: number };
}): number {
  const dim = Math.min(rawVideoSize.width, rawVideoSize.height);
  return dim * OUTER_BUFFER_PROPORTION;
}

function getHalfLengths({
  rawVideoSize,
  shapeSize,
}: {
  rawVideoSize: { width: number; height: number };
  shapeSize: { width: number; height: number };
}) {
  const { width: videoWidth, height: videoHeight } = rawVideoSize;
  const halfCenter = getCenterSideLength({ rawVideoSize }) / 2;
  const halfVideoHeight = videoHeight / 2;
  const halfVideoWidth = videoWidth / 2;
  const halfShapeHeight = shapeSize.height / 2;
  const halfShapeWidth = shapeSize.width / 2;
  return {
    halfCenter,
    halfVideoHeight,
    halfVideoWidth,
    halfShapeHeight,
    halfShapeWidth,
  };
}
