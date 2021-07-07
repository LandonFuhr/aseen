import { Button } from "@material-ui/core";
import { CustomButtonProps } from ".";

export const OutlineButton = (props: CustomButtonProps) => {
  return (
    <Button
      onClick={props.onClick}
      style={{ height: "46px" }}
      variant="outlined"
      color="primary"
    >
      {props.icon}
      <div style={{ minWidth: "10px" }} />
      {props.text}
    </Button>
  );
};
