import { Grid } from "@material-ui/core";
import "../styles.css";

const ButtonsBar = ({ buttons }: ButtonsBarProps) => {
  return (
    <Grid container spacing={4}>
      {buttons.map((button, i) => {
        return (
          <Grid key={i} item>
            {button}
          </Grid>
        );
      })}
    </Grid>
  );
};

interface ButtonsBarProps {
  buttons: React.ReactNodeArray;
}

export default ButtonsBar;
