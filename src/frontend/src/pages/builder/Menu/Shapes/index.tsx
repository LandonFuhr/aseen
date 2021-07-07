import {
  ShapeColorPalette,
  ShapeType,
} from "../../../../components/ShapeEditor/Shapes/types";
import { Circle } from "./Circle";
import { Square } from "./Square";

export function getShapeFromType({
  props,
  type,
}: {
  type: ShapeType;
  props: ShapeComponentProps;
}): React.ReactNode {
  switch (type) {
    case ShapeType.rectangle:
      return <Square {...props} />;
    case ShapeType.ellipse:
      return <Circle {...props} />;
  }
}

export interface ShapeComponentProps {
  colorPallete: ShapeColorPalette;
  active?: boolean;
}

export interface ShapeInstanceProps {
  fill: string;
  border: string;
}

export { Square };
