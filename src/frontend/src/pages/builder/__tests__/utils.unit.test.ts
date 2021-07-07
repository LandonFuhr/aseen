import { ShapePurpose } from "../../../core/types";
import {
  getScaleFactor2D,
  getShapesIdsInLayeredOrder,
  getShapeSortingInfo,
  sortBuilderShapes,
} from "../utils";

describe("Scale Factor Calculator", () => {
  it("returns 1.0 when actual and target are same size", () => {
    expect(
      getScaleFactor2D({
        actualSize: { width: 100, height: 200 },
        targetSize: { width: 100, height: 200 },
      })
    ).toEqual({
      x: 1.0,
      y: 1.0,
    });
  });

  it("scales x up", () => {
    expect(
      getScaleFactor2D({
        actualSize: { width: 30, height: 200 },
        targetSize: { width: 100, height: 200 },
      })
    ).toEqual({
      x: 3.3333333333333335,
      y: 1.0,
    });
  });

  it("scales y up", () => {
    expect(
      getScaleFactor2D({
        actualSize: { width: 100, height: 50 },
        targetSize: { width: 100, height: 200 },
      })
    ).toEqual({
      x: 1.0,
      y: 4.0,
    });
  });

  it("scales x down", () => {
    expect(
      getScaleFactor2D({
        actualSize: { width: 350, height: 200 },
        targetSize: { width: 100, height: 200 },
      })
    ).toEqual({
      x: 1 / 3.5,
      y: 1.0,
    });
  });

  it("scales y down", () => {
    expect(
      getScaleFactor2D({
        actualSize: { width: 100, height: 220 },
        targetSize: { width: 100, height: 200 },
      })
    ).toEqual({
      x: 1.0,
      y: 1 / 1.1,
    });
  });

  it("scales x up and y down", () => {
    expect(
      getScaleFactor2D({
        actualSize: { width: 40, height: 300 },
        targetSize: { width: 100, height: 200 },
      })
    ).toEqual({
      x: 2.5,
      y: 2.0 / 3,
    });
  });

  it("scales x down and y up", () => {
    expect(
      getScaleFactor2D({
        actualSize: { width: 500, height: 180 },
        targetSize: { width: 100, height: 200 },
      })
    ).toEqual({
      x: 1.0 / 5,
      y: 1.1111111111111112,
    });
  });

  it("scales both x and y up", () => {
    expect(
      getScaleFactor2D({
        actualSize: { width: 50, height: 8 },
        targetSize: { width: 100, height: 200 },
      })
    ).toEqual({
      x: 2.0,
      y: 25.0,
    });
  });

  it("scales both x and y down", () => {
    expect(
      getScaleFactor2D({
        actualSize: { width: 1000, height: 900 },
        targetSize: { width: 100, height: 200 },
      })
    ).toEqual({
      x: 0.1,
      y: 1 / 4.5,
    });
  });
});

describe("Shape layer orderer", () => {
  it("returns empty list when no shapes given", () => {
    expect(getShapesIdsInLayeredOrder([])).toEqual([]);
  });

  it("returns single shape when single shape given", () => {
    const shape = {
      id: "shape1",
      isSelected: false,
      purpose: ShapePurpose.area,
    };
    expect(getShapesIdsInLayeredOrder([shape])).toEqual(["shape1"]);
  });

  it("orders selected shapes after unselected shapes of same purpose", () => {
    const shape1 = {
      id: "shape1",
      isSelected: false,
      purpose: ShapePurpose.area,
    };
    const shape2 = {
      id: "shape2",
      isSelected: true,
      purpose: ShapePurpose.area,
    };

    const correctOrder = ["shape1", "shape2"];

    expect(getShapesIdsInLayeredOrder([shape1, shape2])).toEqual(correctOrder);
    expect(getShapesIdsInLayeredOrder([shape2, shape1])).toEqual(correctOrder);
  });

  it("orders selected after unselected of any purpose", () => {
    const shape1 = {
      id: "shape1",
      isSelected: false,
      purpose: ShapePurpose.interactionZone,
    };
    const shape2 = {
      id: "shape2",
      isSelected: true,
      purpose: ShapePurpose.area,
    };

    const correctOrder = ["shape1", "shape2"];

    expect(getShapesIdsInLayeredOrder([shape1, shape2])).toEqual(correctOrder);
    expect(getShapesIdsInLayeredOrder([shape2, shape1])).toEqual(correctOrder);
  });

  it("orders interaction zones after area shapes", () => {
    const shape1 = {
      id: "shape1",
      isSelected: false,
      purpose: ShapePurpose.interactionZone,
    };
    const shape2 = {
      id: "shape2",
      isSelected: false,
      purpose: ShapePurpose.area,
    };

    const correctOrder = ["shape2", "shape1"];

    expect(getShapesIdsInLayeredOrder([shape1, shape2])).toEqual(correctOrder);
    expect(getShapesIdsInLayeredOrder([shape2, shape1])).toEqual(correctOrder);
  });

  it("orders many shapes properly", () => {
    const shape1 = {
      id: "shape1",
      isSelected: false,
      purpose: ShapePurpose.interactionZone,
    };
    const shape2 = {
      id: "shape2",
      isSelected: false,
      purpose: ShapePurpose.area,
    };
    const shape3 = {
      id: "shape3",
      isSelected: true,
      purpose: ShapePurpose.area,
    };

    const correctOrder = ["shape2", "shape1", "shape3"];

    expect(getShapesIdsInLayeredOrder([shape1, shape2, shape3])).toEqual(
      correctOrder
    );
    expect(getShapesIdsInLayeredOrder([shape3, shape2, shape1])).toEqual(
      correctOrder
    );
  });
});

describe("Shape sorting info from builder shape props", () => {
  it("converts builder shape props to sorting info", () => {
    expect(
      getShapeSortingInfo({
        shape: {
          id: "shape_id",
        },
        isSelected: true,
        purpose: ShapePurpose.area,
      } as any)
    ).toEqual({
      id: "shape_id",
      purpose: ShapePurpose.area,
      isSelected: true,
    });
  });

  it("provides false for undefined selected", () => {
    expect(
      getShapeSortingInfo({
        shape: {
          id: "shape_id",
        },
        purpose: ShapePurpose.interactionZone,
      } as any)
    ).toEqual({
      id: "shape_id",
      purpose: ShapePurpose.interactionZone,
      isSelected: false,
    });
  });
});

describe("Sort Builder shapes", () => {
  it("returns empty array when no shapes given", () => {
    expect(sortBuilderShapes({ shapes: [], idsInCorrectOrder: [] })).toEqual(
      []
    );
  });

  it("returns single shape when single shape given", () => {
    const shape1 = {
      shape: {
        id: "shape_1",
      },
    } as any;
    expect(
      sortBuilderShapes({
        shapes: [shape1],
        idsInCorrectOrder: ["shape_1"],
      })
    ).toEqual([shape1]);
  });

  it("sorts shapes according to the id list given", () => {
    const shape1 = {
      shape: {
        id: "shape_1",
      },
    } as any;
    const shape2 = {
      shape: {
        id: "shape_2",
      },
    } as any;
    const shape3 = {
      shape: {
        id: "shape_3",
      },
    } as any;
    expect(
      sortBuilderShapes({
        shapes: [shape1, shape2, shape3],
        idsInCorrectOrder: ["shape_2", "shape_1", "shape_3"],
      })
    ).toEqual([shape2, shape1, shape3]);
    expect(
      sortBuilderShapes({
        shapes: [shape3, shape2, shape1],
        idsInCorrectOrder: ["shape_2", "shape_1", "shape_3"],
      })
    ).toEqual([shape2, shape1, shape3]);
  });
});
