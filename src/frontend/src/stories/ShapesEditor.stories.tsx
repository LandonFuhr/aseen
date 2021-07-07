import { Story } from "@storybook/react";
import { ShapesEditor, ShapesEditorProps } from "../components/ShapeEditor";
import {
  ShapeProperties,
  ShapeType,
} from "../components/ShapeEditor/Shapes/types";
import { colorPalettePresets } from "../core/arenaPresets/colorPalettes";

export default {
  title: "Shapes Editor",
  component: ShapesEditor,
};

const rectangles: ShapeProperties[] = [
  {
    topLeft: { x: 10, y: 10 },
    width: 100,
    height: 100,
    colorPalette: colorPalettePresets.blueDark,
    id: "rect1",
    rotation: 0,
    type: ShapeType.rectangle,
  },
  {
    topLeft: { x: 150, y: 150 },
    rotation: 0,
    width: 100,
    height: 100,
    colorPalette: colorPalettePresets.blueDark,
    id: "rect2",
    type: ShapeType.rectangle,
  },
];

const Template: Story<ShapesEditorProps> = (args) => <ShapesEditor {...args} />;

export const Default = Template.bind({});
Default.args = {
  shapes: rectangles.map((rect) => {
    return {
      shape: rect,
      isSelected: false,
      onSelect: () => {},
      onChange: () => {},
    };
  }),
};
