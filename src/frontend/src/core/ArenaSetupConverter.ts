import {
  EllipseProperties,
  RectangleProperties,
  ShapeProperties,
  ShapeType,
} from "../components/ShapeEditor/Shapes/types";
import { ArenaRegion, ArenaSetup } from "../shared/ipc/ArenaSetup";
import { ShapePurpose, ShapeWithPurpose } from "./types";

export function getArenaSetup({
  shapes,
}: {
  shapes: ShapeWithPurpose[];
}): ArenaSetup {
  const areas: ArenaRegion[] = [];
  const interactionZones: ArenaRegion[] = [];
  for (const { shape, purpose } of shapes) {
    const region = getRegionFromShape(shape);
    switch (purpose) {
      case ShapePurpose.area:
        areas.push(region);
        break;
      case ShapePurpose.interactionZone:
        interactionZones.push(region);
        break;
    }
  }
  return {
    areas,
    interactionZones,
  };
}

function getRegionFromShape(shape: ShapeProperties): ArenaRegion {
  switch (shape.type) {
    case ShapeType.ellipse:
      return getRegionFromEllipse(shape);
    case ShapeType.rectangle:
      return getRegionFromRectangle(shape);
  }
}

function getRegionFromEllipse(ellipse: EllipseProperties): ArenaRegion {
  return {
    id: ellipse.id,
    geometry: {
      type: "circle",
      center: ellipse.center,
      rotation: ellipse.rotation,
      radiusX: ellipse.radiusX,
      radiusY: ellipse.radiusY,
    },
    colorPalette: ellipse.colorPalette,
  };
}

function getRegionFromRectangle(rect: RectangleProperties): ArenaRegion {
  return {
    id: rect.id,
    geometry: {
      type: "rectangle",
      topLeft: rect.topLeft,
      rotation: rect.rotation,
      width: rect.width,
      height: rect.height,
    },
    colorPalette: rect.colorPalette,
  };
}
