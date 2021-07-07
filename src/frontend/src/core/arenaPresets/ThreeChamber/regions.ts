import {
  EllipseProperties,
  RectangleProperties,
  ShapeType,
} from "../../../components/ShapeEditor/Shapes/types";
import { ShapePurpose, ShapeWithPurpose } from "../../types";
import { colorPalettePresets } from "../colorPalettes";

export const ThreeChamberRegionIds = {
  chamber1: "Chamber 1",
  chamber2: "Chamber 2",
  chamber3: "Chamber 3",
  cup1: "Cup 1",
  cup2: "Cup 2",
};

const chamber1: RectangleProperties = {
  topLeft: { x: 0, y: 0 },
  width: 100,
  height: 100,
  colorPalette: colorPalettePresets.blueDark,
  id: ThreeChamberRegionIds.chamber1,
  rotation: 0,
  type: ShapeType.rectangle,
};

const chamber2: RectangleProperties = {
  topLeft: { x: 0, y: 0 },
  width: 100,
  height: 100,
  colorPalette: colorPalettePresets.blueDark,
  id: ThreeChamberRegionIds.chamber2,
  rotation: 0,
  type: ShapeType.rectangle,
};

const chamber3: RectangleProperties = {
  topLeft: { x: 0, y: 0 },
  width: 100,
  height: 100,
  colorPalette: colorPalettePresets.blueDark,
  id: ThreeChamberRegionIds.chamber3,
  rotation: 0,
  type: ShapeType.rectangle,
};

const cup1: EllipseProperties = {
  center: { x: 50, y: 50 },
  radiusY: 50,
  radiusX: 50,
  rotation: 0,
  colorPalette: colorPalettePresets.pink,
  id: ThreeChamberRegionIds.cup1,
  type: ShapeType.ellipse,
};

const cup2: EllipseProperties = {
  center: { x: 50, y: 50 },
  radiusY: 50,
  radiusX: 50,
  rotation: 0,
  colorPalette: colorPalettePresets.pink,
  id: ThreeChamberRegionIds.cup2,
  type: ShapeType.ellipse,
};

export const threeChamberPresetShapes: ShapeWithPurpose[] = [
  { shape: chamber1, purpose: ShapePurpose.area },
  { shape: chamber2, purpose: ShapePurpose.area },
  { shape: chamber3, purpose: ShapePurpose.area },
  { shape: cup1, purpose: ShapePurpose.interactionZone },
  { shape: cup2, purpose: ShapePurpose.interactionZone },
];
