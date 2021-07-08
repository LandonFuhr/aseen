import { ShapeColorPalette } from "../../components/ShapeEditor/Shapes/types";

const blueDark: ShapeColorPalette = {
  active: {
    fill: "rgba(0, 89, 222, 0.2)",
    border: "rgba(0, 89, 222, 1)",
  },
  inactive: {
    fill: "rgba(0, 89, 222, 0.05)",
    border: "rgba(0, 89, 222, 0.2)",
  },
};

const blueLight: ShapeColorPalette = {
  active: {
    fill: "rgba(0, 222, 222, 0.4)",
    border: "rgba(0, 222, 222, 1)",
  },
  inactive: {
    fill: "rgba(0, 222, 222, 0.15)",
    border: "rgba(0, 222, 222, 0.5)",
  },
};

const greenDark: ShapeColorPalette = {
  active: {
    fill: "rgba(0, 130, 44, 0.3)",
    border: "rgba(0, 130, 44, 1)",
  },
  inactive: {
    fill: "rgba(0, 130, 44, 0.1)",
    border: "rgba(0, 130, 44, 0.3)",
  },
};

const greenLight: ShapeColorPalette = {
  active: {
    fill: "rgba(134, 222, 0, 0.2)",
    border: "rgba(134, 222, 0, 1.0)",
  },
  inactive: {
    fill: "rgba(134, 222, 0, 0.15)",
    border: "rgba(134, 222, 0, 0.5)",
  },
};

const pink: ShapeColorPalette = {
  active: {
    fill: "rgba(255, 0, 168, 0.2)",
    border: "rgba(255, 0, 168, 1)",
  },
  inactive: {
    fill: "rgba(255, 0, 168, 0.05)",
    border: "rgba(255, 0, 168, 0.2)",
  },
};

export const colorPalettePresets = {
  blueDark,
  blueLight,
  pink,
  greenDark,
  greenLight,
};
