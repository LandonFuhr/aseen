import { Typography } from "@material-ui/core";

export const Section = (props: SectionProps) => {
  return (
    <>
      <Typography variant="h6">{props.title}</Typography>
      {props.children}
    </>
  );
};

export interface SectionProps {
  title: string;
  children?: React.ReactNode;
}
