import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useState } from "react";
import { BuilderShapeProps } from "..";
import { ShapeProperties } from "../../../components/ShapeEditor/Shapes/types";
import { ShapeWithPurpose } from "../../../core/types";

export function useShapeController({
  initialShapes,
}: {
  initialShapes: ShapeWithPurpose[];
}): ShapeControlledResults {
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [shapes, setShapes] = useState<BuilderShapeProps[]>(() => {
    return initialShapes.map((shape) => getEditableShapeFromShape(shape));
  });

  useEffect(() => {
    setShapes((shapes) =>
      shapes.map((shape) => {
        return { ...shape, isSelected: selectedShapeId === shape.shape.id };
      })
    );
  }, [selectedShapeId]);

  function getEditableShapeFromShape(
    shape: ShapeWithPurpose
  ): BuilderShapeProps {
    return {
      ...shape,
      onChange: handleShapeChange,
      onSelect: (e) => handleShapeSelect({ id: shape.shape.id, e }),
    };
  }

  function handleShapeChange(updatedShape: ShapeProperties) {
    setShapes((shapes) =>
      shapes.map((shape) =>
        shape.shape.id === updatedShape.id
          ? { ...shape, shape: updatedShape }
          : shape
      )
    );
  }
  function handleShapeSelect({
    id,
  }: {
    id: string;
    e: KonvaEventObject<MouseEvent>;
  }) {
    setSelectedShapeId(id);
  }

  return {
    shapes,
    setShapes,
    selectedShapeIdState: [selectedShapeId, setSelectedShapeId],
  };
}

interface ShapeControlledResults {
  shapes: BuilderShapeProps[];
  setShapes: React.Dispatch<React.SetStateAction<BuilderShapeProps[]>>;
  selectedShapeIdState: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ];
}
