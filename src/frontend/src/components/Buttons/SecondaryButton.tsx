import { Button } from "@material-ui/core";
import { CustomButtonProps } from ".";

export const SecondaryButton = (props: CustomButtonProps) => {
  return (
    <Button color="primary" onClick={props.onClick} disabled={props.disabled}>
      {props.icon}
      <div style={{ minWidth: "10px" }} />
      {props.text}
    </Button>
  );
};
