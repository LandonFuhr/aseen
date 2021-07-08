import { Grid } from "@material-ui/core";
import { GithubButton, HelpAndDocsButton } from "./ButtonsImpl";
import "../styles.css";

const ButtonsBar = () => {
  const buttons = [<HelpAndDocsButton />, <GithubButton />];
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

export default ButtonsBar;
