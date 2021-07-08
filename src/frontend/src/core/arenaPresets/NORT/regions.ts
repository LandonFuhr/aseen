import {
  EllipseProperties,
  ShapeType,
} from "../../../components/ShapeEditor/Shapes/types";
import { ShapePurpose, ShapeWithPurpose } from "../../types";
import { colorPalettePresets } from "../colorPalettes";

export const NortRegionIds = {
  object1: "Object 1",
  object2: "Object 2",
};

const object1: EllipseProperties = {
  center: { x: 50, y: 50 },
  radiusY: 50,
  radiusX: 50,
  rotation: 0,
  colorPalette: colorPalettePresets.pink,
  id: NortRegionIds.object1,
  type: ShapeType.ellipse,
};

const object2: EllipseProperties = {
  center: { x: 50, y: 50 },
  radiusY: 50,
  radiusX: 50,
  rotation: 0,
  colorPalette: colorPalettePresets.greenLight,
  id: NortRegionIds.object2,
  type: ShapeType.ellipse,
};

export const nortPresetShapes: ShapeWithPurpose[] = [
  { shape: object1, purpose: ShapePurpose.interactionZone },
  { shape: object2, purpose: ShapePurpose.interactionZone },
];
