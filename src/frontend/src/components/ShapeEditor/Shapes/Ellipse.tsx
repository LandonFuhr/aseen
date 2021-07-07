import type { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import type { Ellipse as EllipseType } from "konva/lib/shapes/Ellipse";
import { useEffect, useRef } from "react";
import { Ellipse, Transformer } from "react-konva";
import { EllipseProperties, EditableShapeProps } from "./types";

export const EditableEllipse = ({
  shape,
  isSelected,
  onSelect,
  onChange,
  onMove,
}: EditableShapeProps<EllipseProperties>) => {
  const shapeRef = useRef<EllipseType>(null);
  const trRef = useRef<TransformerType>(null);

  useEffect(() => {
    if (!trRef.current || !shapeRef.current) return;
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const colorPalette = isSelected
    ? shape.colorPalette.active
    : shape.colorPalette.inactive;

  return (
    <>
      <Ellipse
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        x={shape.center.x}
        y={shape.center.y}
        radiusX={shape.radiusX}
        radiusY={shape.radiusY}
        fill={colorPalette.fill}
        stroke={colorPalette.border}
        strokeWidth={isSelected ? 8 : 4}
        strokeScaleEnabled={false}
        dash={isSelected ? [10, 5] : undefined}
        id={shape.id}
        rotation={shape.rotation}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shape,
            center: { x: e.target.x(), y: e.target.y() },
          });
        }}
        onDragMove={onMove}
        onTransformEnd={(_e) => {
          const node = shapeRef.current;
          if (!node) return;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shape,
            rotation: node.rotation(),
            center: { x: node.x(), y: node.y() },
            radiusX: node.radiusX() * scaleX,
            radiusY: node.radiusY() * scaleY,
          });
        }}
      />
      {isSelected && <Transformer ref={trRef} ignoreStroke={true} />}
    </>
  );
};
