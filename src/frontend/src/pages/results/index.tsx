import { Box, Grid, Container } from "@material-ui/core";
import { AppBarCustom } from "../../components/AppBar";
import { OutlineButton } from "../../components/Buttons";
import { FolderOutlined } from "@material-ui/icons";
import { ResultsCard } from "./ResultsCard";
import { mouseColors } from "../../core/mouseColors";
import { useResultsController } from "./controller";
import { BehaviourResults } from "../../shared/ipc";
import { EmptyResults } from "./EmptyResults";
import { HomeButton } from "./HomeButton";

export const Results = ({
  onHomeClick,
  handleOpenResultsFolder,
  behaviourResults,
}: ResultsPageProps) => {
  const resultsWithoutUntrackedMice = behaviourResults
    ? behaviourResults.data.filter(
        (data) => data.statsOverall.fractionOfFramesWithAnimalPartlyDetected > 0
      )
    : null;

  return (
    <>
      <AppBarCustom text="Results" />
      <Box p={4}>
        <Container maxWidth="lg">
          {resultsWithoutUntrackedMice &&
          resultsWithoutUntrackedMice.length > 0 ? (
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item>
                    <HomeButton onClick={onHomeClick} />
                  </Grid>
                  <Grid item>
                    <OutlineButton
                      text="Open Results Folder"
                      icon={<FolderOutlined />}
                      onClick={handleOpenResultsFolder}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  {resultsWithoutUntrackedMice.map((data, i) => (
                    <Grid key={i} item xs={12}>
                      <ResultsCard
                        data={data}
                        backgroundColor={mouseColors[i]?.translucent}
                        dotColor={mouseColors[i]?.opaque}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <EmptyResults onHomeClick={onHomeClick} />
          )}
        </Container>
      </Box>
    </>
  );
};

export interface ResultsPageProps {
  handleOpenResultsFolder: () => void;
  onHomeClick: () => void;
  behaviourResults?: BehaviourResults;
}

const ResultsWithController = () => {
  const props = useResultsController();

  return <Results {...props} />;
};

export default ResultsWithController;
