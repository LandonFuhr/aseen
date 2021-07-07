import React, { ChangeEvent } from "react";
import { Switch, Box, Typography } from "@material-ui/core";

export const ArenaVisibilityToggle = (props: ArenaVisibilityToggleProps) => {
  function handleArenaVisibilityChange(
    _event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) {
    props.setShouldShowArena(checked);
  }

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1">Show Arena Overlay</Typography>
      <Switch
        checked={props.shouldShowArena}
        color="primary"
        onChange={handleArenaVisibilityChange}
      />
    </Box>
  );
};

interface ArenaVisibilityToggleProps {
  shouldShowArena: boolean;
  setShouldShowArena: React.Dispatch<React.SetStateAction<boolean>>;
}
