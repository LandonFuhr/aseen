import { Section } from "../Section";
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@material-ui/core";
import { getShapeFromType } from "../Shapes";
import {
  ShapeColorPalette,
  ShapeType,
} from "../../../../components/ShapeEditor/Shapes/types";
import { MouseEventHandler } from "react";

export const AreasSection = (props: AreasSectionProps) => {
  return (
    <Section title={props.title}>
      <Grid container spacing={1}>
        {props.areas.map((area, i) => (
          <Grid key={i} item>
            <AreaSelectorItem {...area} />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

const AreaSelectorItem = (props: AreaSelectorItemProps) => {
  return (
    <Card color="primary" className="area-card">
      <CardActionArea onClick={props.onClick}>
        <CardContent>
          <Grid container justify="center" spacing={1}>
            <Grid item>
              {getShapeFromType({
                type: props.shapeType,
                props: {
                  colorPallete: props.colorPalette,
                  active: props.isSelected,
                },
              })}
            </Grid>
            <Grid item>
              <Typography
                align="center"
                variant="caption"
                style={props.isSelected ? { fontWeight: 600 } : undefined}
              >
                {props.title}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export interface AreaSelectorItemProps {
  title: string;
  colorPalette: ShapeColorPalette;
  shapeType: ShapeType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isSelected?: boolean;
}

export interface AreasSectionProps {
  title: string;
  areas: AreaSelectorItemProps[];
  onAddAreaClick?: () => void;
}
