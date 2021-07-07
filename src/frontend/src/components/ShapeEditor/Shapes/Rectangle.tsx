import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import { Rect as RectType } from "konva/lib/shapes/Rect";
import { useEffect, useRef } from "react";
import { Rect, Transformer } from "react-konva";
import { EditableShapeProps, RectangleProperties } from "./types";

export const EditableRectangle = ({
  shape,
  isSelected,
  onSelect,
  onChange,
  onMove,
}: EditableShapeProps<RectangleProperties>) => {
  const shapeRef = useRef<RectType>(null);
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
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        x={shape.topLeft.x}
        y={shape.topLeft.y}
        width={shape.width}
        height={shape.height}
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
            topLeft: { x: e.target.x(), y: e.target.y() },
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
            topLeft: { x: node.x(), y: node.y() },
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          });
        }}
      />
      {isSelected && <Transformer ref={trRef} ignoreStroke={true} />}
    </>
  );
};
