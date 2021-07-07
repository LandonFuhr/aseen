import { KonvaEventObject } from "konva/lib/Node";

export interface EditableShapeProps<T = ShapeProperties> {
  shape: T;
  isSelected?: boolean;
  onSelect: (e: KonvaEventObject<globalThis.MouseEvent>) => void;
  onChange: (updatedShape: T) => void;
  onMove?: () => void;
}

export type ShapeProperties = RectangleProperties | EllipseProperties;

export type RectangleProperties = {
  topLeft: Point;
  width: number;
  height: number;
  rotation: number;
  colorPalette: ShapeColorPalette;
  id: string;
  type: ShapeType.rectangle;
};

export type EllipseProperties = {
  center: Point;
  radiusX: number;
  radiusY: number;
  rotation: number;
  colorPalette: ShapeColorPalette;
  id: string;
  type: ShapeType.ellipse;
};

export interface ShapeColorPalette {
  active: ShapeColor;
  inactive: ShapeColor;
}

interface ShapeColor {
  fill: string;
  border: string;
}

interface Point {
  x: number;
  y: number;
}

export enum ShapeType {
  rectangle,
  ellipse,
}
