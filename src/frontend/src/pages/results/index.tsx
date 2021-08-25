import { Box, Grid, Container } from "@material-ui/core";
import { AppBarCustom } from "../../components/AppBar";
import { OutlineButton } from "../../components/Buttons";
import { FolderOutlined, HomeRounded } from "@material-ui/icons";
import { ResultsCard } from "./ResultsCard";
import { mouseColors } from "../../core/mouseColors";
import { useResultsController } from "./controller";
import { BehaviourResults } from "../../shared/ipc";

export const Results = ({
  onHomeClick,
  handleOpenResultsFolder,
  behaviourResults,
}: ResultsPageProps) => {
  return (
    <>
      <AppBarCustom text="Results" />
      <Box p={4}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <OutlineButton
                    text="Back Home"
                    icon={<HomeRounded />}
                    onClick={onHomeClick}
                  />
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
                {behaviourResults?.data.map((data, i) => (
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
