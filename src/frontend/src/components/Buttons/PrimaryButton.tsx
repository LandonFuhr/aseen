import { Button } from "@material-ui/core";
import { CustomButtonProps } from ".";

export const PrimaryButton = (props: CustomButtonProps) => {
  return (
    <Button
      disabled={props.disabled}
      variant="contained"
      color="primary"
      onClick={props.onClick}
    >
      {props.icon}
      <div style={{ minWidth: "10px" }} />
      {props.text}
    </Button>
  );
};
