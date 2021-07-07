import { Grid } from "@material-ui/core";
import { Section } from "./Section";
import { AreaSelectorItemProps, AreasSection } from "./Sections/AreasSection";
import { EditableShapeProps } from "../../../components/ShapeEditor/Shapes/types";
import React, { useMemo } from "react";
import { BuilderShapeProps } from "..";
import { ShapePurpose } from "../../../core/types";

const BuilderMenu = (props: BuilderMenuProps) => {
  const areas = useMemo(() => {
    return props.shapes.filter((shape) => shape.purpose === ShapePurpose.area);
  }, [props.shapes]);
  const interactionZones = useMemo(() => {
    return props.shapes.filter(
      (shape) => shape.purpose === ShapePurpose.interactionZone
    );
  }, [props.shapes]);

  return (
    <Grid container spacing={2}>
      <Grid item>
        <AreasSection
          title="Areas"
          areas={areas.map((shape) =>
            shapeToAreaSelectorItemProps({
              shape,
              setSelectedShapeId: props.setSelectedShapeId,
            })
          )}
        />
      </Grid>
      <Grid item>
        <AreasSection
          title="Interaction Zones"
          areas={interactionZones.map((shape) =>
            shapeToAreaSelectorItemProps({
              shape,
              setSelectedShapeId: props.setSelectedShapeId,
            })
          )}
        />
      </Grid>
    </Grid>
  );
};

function shapeToAreaSelectorItemProps({
  shape,
  setSelectedShapeId,
}: {
  shape: EditableShapeProps;
  setSelectedShapeId: React.Dispatch<React.SetStateAction<string | null>>;
}): AreaSelectorItemProps {
  return {
    title: shape.shape.id,
    colorPalette: shape.shape.colorPalette,
    isSelected: shape.isSelected,
    shapeType: shape.shape.type,
    onClick: (e) => {
      e.stopPropagation();
      setSelectedShapeId(shape.shape.id);
    },
  };
}

export interface BuilderMenuProps {
  shapes: BuilderShapeProps[];
  selectedShapeId: string | null;
  setSelectedShapeId: React.Dispatch<React.SetStateAction<string | null>>;
  isDisabled?: boolean;
}

export { BuilderMenu };
