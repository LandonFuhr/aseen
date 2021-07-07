import { ShapeComponentProps, ShapeInstanceProps } from ".";

export const Square = (props: ShapeComponentProps) => {
  return props.active ? (
    <DashedSquare {...props.colorPallete.active} />
  ) : (
    <SolidSquare {...props.colorPallete.inactive} />
  );
};

const DashedSquare = (props: ShapeInstanceProps) => {
  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2.5"
        y="2.5"
        width="65"
        height="65"
        fill={props.fill}
        stroke={props.border}
        strokeWidth="5"
        strokeDasharray="10 3"
      />
    </svg>
  );
};

const SolidSquare = (props: ShapeInstanceProps) => {
  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="70" height="70" fill={props.fill} />
      <rect
        x="2.5"
        y="2.5"
        width="65"
        height="65"
        stroke={props.border}
        strokeWidth="5"
      />
    </svg>
  );
};
