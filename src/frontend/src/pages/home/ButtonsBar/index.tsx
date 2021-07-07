import { Grid } from "@material-ui/core";
import {
  DemoButton,
  GithubButton,
  HelpAndDocsButton,
  SavedResultsButton,
} from "./ButtonsImpl";
import "../styles.css";

const ButtonsBar = () => {
  function handleSavedResultsClick() {}
  function handleHelpClick() {}
  function handleDemoClick() {}
  function handleGithubClick() {}
  const buttons = [
    <SavedResultsButton onClick={handleSavedResultsClick} />,
    <HelpAndDocsButton onClick={handleHelpClick} />,
    <DemoButton onClick={handleDemoClick} />,
    <GithubButton onClick={handleGithubClick} />,
  ];
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
