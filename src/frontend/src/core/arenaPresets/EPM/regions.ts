import {
  RectangleProperties,
  ShapeType,
} from "../../../components/ShapeEditor/Shapes/types";
import { ShapePurpose, ShapeWithPurpose } from "../../types";
import { colorPalettePresets } from "../colorPalettes";

export const EpmRegionIds = {
  closedArm1: "Closed Arm 1",
  closedArm2: "Closed Arm 2",
  openArm1: "Open Arm 1",
  openArm2: "Open Arm 2",
  center: "Center",
};

const closedArm1: RectangleProperties = {
  topLeft: { x: 10, y: 10 },
  width: 100,
  height: 100,
  colorPalette: colorPalettePresets.blueDark,
  id: EpmRegionIds.closedArm1,
  rotation: 0,
  type: ShapeType.rectangle,
};

const closedArm2: RectangleProperties = {
  topLeft: { x: 10, y: 10 },
  width: 100,
  height: 100,
  colorPalette: colorPalettePresets.blueDark,
  id: EpmRegionIds.closedArm2,
  rotation: 0,
  type: ShapeType.rectangle,
};

const openArm1: RectangleProperties = {
  topLeft: { x: 10, y: 10 },
  width: 100,
  height: 100,
  colorPalette: colorPalettePresets.greenDark,
  id: EpmRegionIds.openArm1,
  rotation: 0,
  type: ShapeType.rectangle,
};

const openArm2: RectangleProperties = {
  topLeft: { x: 10, y: 10 },
  width: 100,
  height: 100,
  colorPalette: colorPalettePresets.greenDark,
  id: EpmRegionIds.openArm2,
  rotation: 0,
  type: ShapeType.rectangle,
};

const center: RectangleProperties = {
  topLeft: { x: 10, y: 10 },
  width: 100,
  height: 100,
  colorPalette: colorPalettePresets.blueLight,
  id: EpmRegionIds.center,
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
