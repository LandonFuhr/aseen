import { ShapeComponentProps, ShapeInstanceProps } from ".";

export const Circle = (props: ShapeComponentProps) => {
  return props.active ? (
    <DashedCircle {...props.colorPallete.active} />
  ) : (
    <SolidCircle {...props.colorPallete.inactive} />
  );
};

const SolidCircle = (props: ShapeInstanceProps) => {
  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="35" cy="35" r="35" fill={props.fill} />
      <circle cx="35" cy="35" r="32.5" stroke={props.border} strokeWidth="5" />
    </svg>
  );
};

const DashedCircle = (props: ShapeInstanceProps) => {
  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="35"
        cy="35"
        r="32.5"
        fill={props.fill}
        stroke={props.border}
        strokeWidth="5"
        strokeDasharray="10 3"
      />
    </svg>
  );
};
