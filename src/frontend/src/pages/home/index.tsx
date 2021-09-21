import { Grid, Box, Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { AppBarCustom } from "../../components/AppBar";
import { saveResults } from "../../core/electron/ipc";
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

  useEffect(() => {
    saveResults({
      savedResults: {
        arenaSetupPath: "test.setup",
        createdAtDate: new Date(),
        resultsPaths: {
          outputVideoPath: "TEST.mp4",
          trackingResultsH5Path: "TEST.h5",
          behaviourAssayResultsJsonPath: "TEST.json",
          resultsFolder: "test/",
        },
      },
    });
  }, []);

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
