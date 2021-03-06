import { Button } from "@material-ui/core";
import { CustomButtonProps } from ".";

const DestructiveButton = (props: CustomButtonProps) => {
  return (
    <Button
      style={{ fill: "#ba3e3e", color: "#ba3e3e" }}
      onClick={props.onClick}
    >
      {props.icon}
      <div style={{ minWidth: "10px" }} />
      {props.text}
    </Button>
  );
};

export default DestructiveButton;
