import { BuilderShapeProps } from ".";
import { ShapePurpose } from "../../core/types";

export function compareShapes(a: BuilderShapeProps, b: BuilderShapeProps) {
  if (a.isSelected) {
    return 1;
  }
  if (b.isSelected) {
    return -1;
  }
  if (a.purpose === ShapePurpose.interactionZone) {
    return 1;
  }
  return -1;
}

export function sortBuilderShapes({
  idsInCorrectOrder,
  shapes,
}: {
  idsInCorrectOrder: string[];
  shapes: BuilderShapeProps[];
}): BuilderShapeProps[] {
  return shapes.sort((a, b) => {
    return (
      idsInCorrectOrder.findIndex((id) => a.shape.id === id) -
      idsInCorrectOrder.findIndex((id) => b.shape.id === id)
    );
  });
}

export function getShapeSortingInfo(
  shape: BuilderShapeProps
): ShapeSortingInfo {
  return {
    id: shape.shape.id,
    isSelected: Boolean(shape.isSelected),
    purpose: shape.purpose,
  };
}

export function getShapesIdsInLayeredOrder(
  shapes: ShapeSortingInfo[]
): string[] {
  shapes.sort((a, b) => {
    if (a.isSelected) {
      return 1;
    }
    if (b.isSelected) {
      return -1;
    }
    if (a.purpose === ShapePurpose.interactionZone) {
      return 1;
    }
    return -1;
  });

  return shapes.map((shape) => shape.id);
}

interface ShapeSortingInfo {
  id: string;
  isSelected: boolean;
  purpose: ShapePurpose;
}

export function getScaleFactor2D({
  actualSize,
  targetSize,
}: {
  actualSize: Size;
  targetSize: Size;
}): ScaleFactor2D {
  return {
    x: targetSize.width / actualSize.width,
    y: targetSize.height / actualSize.height,
  };
}

export interface ScaleFactor2D {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}
