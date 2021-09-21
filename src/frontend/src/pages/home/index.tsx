import { Grid, Box, Container } from "@material-ui/core";
import { useState } from "react";
import { AppBarCustom } from "../../components/AppBar";
import ArenaCards from "./ArenaCards";
import ButtonsBar from "./ButtonsBar";
import {
  GithubButton,
  HelpAndDocsButton,
  SavedResultsButton,
} from "./ButtonsBar/ButtonsImpl";
import SavedResults from "./SavedResults";
import "./styles.css";

const Home = () => {
  const [shouldShowSavedResults, setShouldShowSavedResults] = useState(false);

  function handleOpenSavedResults() {
    setShouldShowSavedResults(true);
  }

  function handleCloseSavedResults() {
    setShouldShowSavedResults(false);
  }

  return (
    <>
      <AppBarCustom text="Choose Your Arena Type" />
      <Box p={6}>
        <Container maxWidth="lg">
          <Grid container justify="center" spacing={8}>
            <Grid item xs={12}>
              <ButtonsBar
                buttons={[
                  <SavedResultsButton onClick={handleOpenSavedResults} />,
                  <HelpAndDocsButton />,
                  <GithubButton />,
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <ArenaCards />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <SavedResults
        show={shouldShowSavedResults}
        onClose={handleCloseSavedResults}
      />
    </>
  );
};

export default Home;
