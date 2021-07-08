import { ShapeType } from "../../../components/ShapeEditor/Shapes/types";
import { BuilderShapeProps, VideoArenaFitter } from "../../../pages/builder";
import { NortRegionIds } from "./regions";

const OBJECT_SIZE_PROPORTION = 0.1;

export const fitNortShapes: VideoArenaFitter = ({ shapes, rawVideoSize }) => {
  for (const shape of shapes) {
    switch (shape.shape.id) {
      case NortRegionIds.object1:
        fitObject1({ shape, rawVideoSize });
        break;
      case NortRegionIds.object2:
        fitObject2({ shape, rawVideoSize });
        break;
    }
  }
  return shapes;
};

function fitObject1({
  shape,
  rawVideoSize,
}: {
  shape: BuilderShapeProps;
  rawVideoSize: { width: number; height: number };
}) {
  if (shape.shape.type === ShapeType.ellipse) {
    const objectSize =
      Math.min(rawVideoSize.height, rawVideoSize.width) *
      OBJECT_SIZE_PROPORTION;
    shape.shape.radiusX = objectSize;
    shape.shape.radiusY = objectSize;
    shape.shape.center = {
      x: rawVideoSize.width / 3,
      y: rawVideoSize.height / 2,
    };
  }
}

function fitObject2({
  shape,
  rawVideoSize,
}: {
  shape: BuilderShapeProps;
  rawVideoSize: { width: number; height: number };
}) {
  if (shape.shape.type === ShapeType.ellipse) {
    const objectSize =
      Math.min(rawVideoSize.height, rawVideoSize.width) *
      OBJECT_SIZE_PROPORTION;
    shape.shape.radiusX = objectSize;
    shape.shape.radiusY = objectSize;
    shape.shape.center = {
      x: rawVideoSize.width - rawVideoSize.width / 3,
      y: rawVideoSize.height / 2,
    };
  }
}
