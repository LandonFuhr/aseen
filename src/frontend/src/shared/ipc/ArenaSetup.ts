export interface ArenaSetup {
  areas: ArenaRegion[];
  interactionZones: ArenaRegion[];
}

export interface ArenaRegion {
  id: string;
  geometry: ShapeGeometry;
  colorPalette: ColorPalette;
}

export type ShapeGeometry = CircleGeometry | RectangleGeometry;

export interface CircleGeometry {
  type: "circle";
  center: {
    x: number;
    y: number;
  };
  radiusX: number;
  radiusY: number;
  rotation: number;
}

export interface RectangleGeometry {
  type: "rectangle";
  topLeft: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  rotation: number;
}

export interface ColorPalette {
  active: ColorData;
  inactive: ColorData;
}

export interface ColorData {
  fill: string;
  border: string;
}
