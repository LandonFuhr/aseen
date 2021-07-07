import { Grid } from "@material-ui/core";
import { ChevronLeft, DoneAll } from "@material-ui/icons";
import React from "react";
import { PrimaryButton } from "../../components/Buttons";
import DestructiveButton from "../../components/Buttons/DestructiveButton";

const BuilderActions = (props: BuilderHeaderProps) => {
  return (
    <Grid container justify="space-between">
      <Grid item>
        <DestructiveButton
          icon={<ChevronLeft />}
          text="Discard and Exit"
          onClick={props.onExitClick}
        />
      </Grid>
      <Grid item>
        <PrimaryButton
          icon={<DoneAll />}
          text="Save and Analyze"
          onClick={props.onSaveClick}
          disabled={!props.onSaveClick}
        />
      </Grid>
    </Grid>
  );
};

interface BuilderHeaderProps {
  onSaveClick?: () => void;
  onExitClick: () => void;
}

export { BuilderActions };
