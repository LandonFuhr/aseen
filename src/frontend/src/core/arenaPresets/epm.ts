import {
  RectangleProperties,
  ShapeType,
} from "../../components/ShapeEditor/Shapes/types";
import { ShapePurpose, ShapeWithPurpose } from "../types";
import { colorPalettePresets } from "./colorPalettes";

const closedArm1: RectangleProperties = {
  topLeft: { x: 10, y: 10 },
  width: 300,
  height: 200,
  colorPalette: colorPalettePresets.blueDark,
  id: "Closed Arm 1",
  rotation: 0,
  type: ShapeType.rectangle,
};

const closedArm2: RectangleProperties = {
  topLeft: { x: 10, y: 10 },
  width: 300,
  height: 200,
  colorPalette: colorPalettePresets.blueDark,
  id: "Closed Arm 2",
  rotation: 0,
  type: ShapeType.rectangle,
};

const openArm1: RectangleProperties = {
  topLeft: { x: 10, y: 10 },
  width: 300,
  height: 200,
  colorPalette: colorPalettePresets.greenDark,
  id: "Open Arm 1",
  rotation: 0,
  type: ShapeType.rectangle,
};

const openArm2: RectangleProperties = {
  topLeft: { x: 10, y: 10 },
  width: 300,
  height: 200,
  colorPalette: colorPalettePresets.greenDark,
  id: "Open Arm 2",
  rotation: 0,
  type: ShapeType.rectangle,
};

const center: RectangleProperties = {
  topLeft: { x: 10, y: 10 },
  width: 300,
  height: 200,
  colorPalette: colorPalettePresets.blueLight,
  id: "Center",
  rotation: 0,
  type: ShapeType.rectangle,
};

export const epmPresets: ShapeWithPurpose[] = [
  { shape: closedArm1, purpose: ShapePurpose.area },
  { shape: closedArm2, purpose: ShapePurpose.area },
  { shape: openArm1, purpose: ShapePurpose.area },
  { shape: openArm2, purpose: ShapePurpose.area },
  { shape: center, purpose: ShapePurpose.area },
];
