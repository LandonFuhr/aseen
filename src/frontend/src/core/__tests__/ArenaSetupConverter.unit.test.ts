import { ShapeType } from "../../components/ShapeEditor/Shapes/types";
import { getArenaSetup } from "../ArenaSetupConverter";
import { ShapePurpose, ShapeWithPurpose } from "../types";

describe("Arena Setup Converter", () => {
  it("converts list of shapes into object that fits arena json schema", () => {
    const converted = getArenaSetup({
      shapes: [area1, interactionZone1, area2],
    });

    expect(converted).toEqual(expectedSetup);
  });
});

const area1: ShapeWithPurpose = {
  purpose: ShapePurpose.area,
  shape: {
    id: "Chamber 1",
    type: ShapeType.ellipse,
    center: {
      x: 100,
      y: 200,
    },
    radiusX: 50,
    radiusY: 75,
    rotation: 0,
    colorPalette: {
      active: {
        fill: "rgba(0,0,0,0.2)",
        border: "rgba(0,0,0,1)",
      },
      inactive: {
        fill: "rgba(0,0,0,0.05)",
        border: "rgba(0,0,0,0.2)",
      },
    },
  },
};

const area2: ShapeWithPurpose = {
  purpose: ShapePurpose.area,
  shape: {
    id: "Chamber 3",
    type: ShapeType.ellipse,
    center: {
      x: 40,
      y: 50,
    },
    radiusX: 10,
    radiusY: 10,
    rotation: 10,
    colorPalette: {
      active: {
        fill: "rgba(255,0,0,0.2)",
        border: "rgba(255,0,0,1)",
      },
      inactive: {
        fill: "rgba(255,0,0,0.05)",
        border: "rgba(255,0,0,0.2)",
      },
    },
  },
};

const interactionZone1: ShapeWithPurpose = {
  purpose: ShapePurpose.interactionZone,
  shape: {
    id: "Chamber 2",
    type: ShapeType.rectangle,
    topLeft: {
      x: 100,
      y: 200,
    },
    width: 50,
    height: 75,
    rotation: 0,
    colorPalette: {
      active: {
        fill: "rgba(0,0,0,0.2)",
        border: "rgba(0,0,0,1)",
      },
      inactive: {
        fill: "rgba(0,0,0,0.05)",
        border: "rgba(0,0,0,0.2)",
      },
    },
  },
};

const expectedSetup = {
  areas: [
    {
      id: "Chamber 1",
      geometry: {
        type: "circle",
        center: {
          x: 100,
          y: 200,
        },
        radiusX: 50,
        radiusY: 75,
        rotation: 0,
      },
      colorPalette: {
        active: {
          fill: "rgba(0,0,0,0.2)",
          border: "rgba(0,0,0,1)",
        },
        inactive: {
          fill: "rgba(0,0,0,0.05)",
          border: "rgba(0,0,0,0.2)",
        },
      },
    },
    {
      id: "Chamber 3",
      geometry: {
        type: "circle",
        center: {
          x: 40,
          y: 50,
        },
        radiusX: 10,
        radiusY: 10,
        rotation: 10,
      },
      colorPalette: {
        active: {
          fill: "rgba(255,0,0,0.2)",
          border: "rgba(255,0,0,1)",
        },
        inactive: {
          fill: "rgba(255,0,0,0.05)",
          border: "rgba(255,0,0,0.2)",
        },
      },
    },
  ],
  interactionZones: [
    {
      id: "Chamber 2",
      geometry: {
        type: "rectangle",
        topLeft: {
          x: 100,
          y: 200,
        },
        width: 50,
        height: 75,
        rotation: 0,
      },
      colorPalette: {
        active: {
          fill: "rgba(0,0,0,0.2)",
          border: "rgba(0,0,0,1)",
        },
        inactive: {
          fill: "rgba(0,0,0,0.05)",
          border: "rgba(0,0,0,0.2)",
        },
      },
    },
  ],
};
