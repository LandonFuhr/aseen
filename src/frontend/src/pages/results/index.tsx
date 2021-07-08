import { Box, Grid, Container } from "@material-ui/core";
import { AppBarCustom } from "../../components/AppBar";
import { OutlineButton } from "../../components/Buttons";
import { useResultsPaths } from "../../components/PersistentProviders/ResultsPaths";
import { FolderOutlined, HomeRounded } from "@material-ui/icons";
import { useRouter } from "../../components/PersistentProviders/Router";
import { Page } from "../../core/types";
import { openFolder } from "../../core/electron/shell";
import { useEffect, useState } from "react";
import { readBehaviourResultsFile } from "../../core/electron/ipc";
import { BehaviourResults } from "../../shared/ipc";
import { ResultsTable } from "./ResultsTable";

const Results = () => {
  const resultsPaths = useResultsPaths();
  const router = useRouter();
  const [behaviourResults, setBehaviourResults] = useState<BehaviourResults>();

  useEffect(() => {
    if (resultsPaths === null) return;
    let cancelled = false;
    readBehaviourResultsFile({
      path: resultsPaths.behaviourAssayResultsJsonPath,
    }).then((behaviourResults) => {
      if (cancelled) return;
      setBehaviourResults(behaviourResults);
    });
    return () => {
      cancelled = true;
    };
  }, [resultsPaths]);

  function handleOpenResultsFolder() {
    if (resultsPaths === null) return;
    openFolder(resultsPaths.resultsFolder)
      .then((errorMessage) => {
        if (errorMessage !== "") {
          console.error("Folder open error:", errorMessage);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  if (resultsPaths === null) {
    return null;
  }

  return (
    <>
      <AppBarCustom text="Results" />
      <Box p={4}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <OutlineButton
                    text="Back Home"
                    icon={<HomeRounded />}
                    onClick={() => router.setPage(Page.home)}
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
            <Grid item>
              <Grid container spacing={4}>
                {behaviourResults?.data.map((data, i) => (
                  <Grid key={i} item xs={12}>
                    <ResultsTable data={data} />
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

export default Results;
