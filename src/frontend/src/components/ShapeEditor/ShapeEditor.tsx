import { KonvaEventObject } from "konva/lib/Node";
import React from "react";
import { Stage, Layer } from "react-konva";
import { EditableEllipse } from "./Shapes/Ellipse";
import { EditableRectangle } from "./Shapes/Rectangle";
import {
  EditableShapeProps,
  EllipseProperties,
  RectangleProperties,
  ShapeType,
} from "./Shapes/types";

export const ShapesEditor = (props: ShapesEditorProps) => {
  const handleStageClick = (e: KonvaEventObject<globalThis.MouseEvent>) => {
    if (e.target === e.target.getStage()) {
      props.setSelectedShapeId(null);
    }
  };

  function getShapeDomElement(shape: EditableShapeProps, i: number) {
    const shapeProps: EditableShapeProps = {
      shape: shape.shape,
      isSelected: shape.shape.id === props.selectedShapeId,
      onSelect: (e) => {
        e.cancelBubble = true;
        props.setSelectedShapeId(shape.shape.id);
      },
      onChange: (updatedShape) => {
        props.setSelectedShapeId(updatedShape.id);
        shape.onChange(updatedShape);
      },
      onMove: () => {
        props.setSelectedShapeId((selectedShapeId) => {
          if (selectedShapeId === shape.shape.id) {
            return selectedShapeId;
          }
          return null;
        });
      },
    };
    switch (shape.shape.type) {
      case ShapeType.rectangle:
        return (
          <EditableRectangle
            key={i}
            {...(shapeProps as EditableShapeProps<RectangleProperties>)}
          />
        );
      case ShapeType.ellipse:
        return (
          <EditableEllipse
            key={i}
            {...(shapeProps as EditableShapeProps<EllipseProperties>)}
          />
        );
    }
  }

  return (
    <Stage
      width={props.size?.width}
      height={props.size?.height}
      scale={props.scale}
      onMouseDown={handleStageClick}
    >
      <Layer>{props.shapes.map(getShapeDomElement)}</Layer>
    </Stage>
  );
};

export interface ShapesEditorProps {
  size?: {
    width: number | undefined;
    height: number | undefined;
  };
  scale?: {
    x: number;
    y: number;
  };
  selectedShapeId: string | null;
  setSelectedShapeId: React.Dispatch<React.SetStateAction<string | null>>;
  shapes: EditableShapeProps[];
}
