import { Grid, Container, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Close, InfoOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { OutlineButton } from "../../components/Buttons";
import DestructiveButton from "../../components/Buttons/DestructiveButton";
import { useVideoPathState } from "../../components/PersistentProviders/VideoPath";
import { AnalyzingProgressCard } from "./ProgressCard";
import { useRouter } from "../../components/PersistentProviders/Router";
import { AppBarCustom } from "../../components/AppBar";
import { Page } from "../../core/types";
import { VideoCard } from "./VideoCard";
import { useArenaSetupPath } from "../../components/PersistentProviders/ArenaSetupPath";
import { ProgressUpdate, SavedResult } from "../../shared/ipc";
import { runAnalyzer, stopAllAnalyzers } from "../../core/Analyzer";
import { useCreateResultsPaths } from "./useCreateResultsPaths";
import { useVideoMetadata } from "../../components/VideoMetadata/hooks";
import { useSetResultsPaths } from "../../components/PersistentProviders/ResultsPaths";
import { ErrorToast } from "../../components/Toast/ErrorToast";
import { saveResults } from "../../core/electron/ipc";

const Analyzing = () => {
  const vidPathState = useVideoPathState();
  const arenaSetupPath = useArenaSetupPath();
  const router = useRouter();
  const [progressUpdate, setProgressUpdate] = useState<ProgressUpdate | null>(
    null
  );
  const metadata = useVideoMetadata(vidPathState.path);
  const resultsPaths = useCreateResultsPaths({ arenaSetupPath });
  const setResultsPaths = useSetResultsPaths();
  const [errorMessage, setErrorMessage] = useState("");
  const [errorToastIsOpen, setErrorToastIsOpen] = useState(false);

  useEffect(() => {
    const videoPath = vidPathState.path;
    if (
      videoPath === null ||
      arenaSetupPath === null ||
      resultsPaths === null ||
      metadata === null
    )
      return;
    function handleError(e: any) {
      console.error(e);
      setErrorMessage(`An error occured while analyzing the video: ${e}`);
      setErrorToastIsOpen(true);
    }
    setErrorToastIsOpen(false);
    let cancelled = false;
    runAnalyzer({
      videoPath,
      arenaSetupPath,
      resultsPaths,
      videoAverageFramerate: metadata.averageFramerate,
      onProgressUpdate: (progressUpdate) => {
        if (cancelled) return;
        setProgressUpdate(progressUpdate);
      },
    })
      .then((exitInfo) => {
        if (cancelled) return;
        switch (exitInfo.type) {
          case "SUCCESS":
            const savedResults: SavedResult = {
              arenaSetupPath,
              resultsPaths,
              createdAtDate: new Date(),
            };
            saveResults({ savedResults }).then(() => {
              if (cancelled) return;
              setResultsPaths(resultsPaths);
              router.setPage(Page.results);
            });
            break;
          case "ERROR":
            throw new Error(exitInfo.data.error);
          case "KILLED":
            console.log("Analyzer killed");
            break;
        }
      })
      .catch((e) => {
        if (cancelled) return;
        handleError(e);
      });
    return () => {
      cancelled = true;
      stopAllAnalyzers();
    };
  }, [
    router,
    vidPathState,
    arenaSetupPath,
    resultsPaths,
    metadata,
    setResultsPaths,
  ]);

  function handleCancel() {
    router.setPage(Page.home);
  }

  return (
    <>
      <AppBarCustom text="Analyzing" />
      <Container maxWidth="lg">
        <Box p={4}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box mb={2}>
                <Grid container justify="space-between">
                  <Grid item>
                    <DestructiveButton
                      icon={<Close />}
                      text="Cancel Analysis"
                      onClick={handleCancel}
                    />
                  </Grid>
                  <Grid item>
                    <OutlineButton text="Learn More" icon={<InfoOutlined />} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <AnalyzingProgressCard progressUpdate={progressUpdate} />
            </Grid>
            <Grid item md={6} xs={12}>
              <VideoCard videoPath={vidPathState.path} />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <ErrorToast
        isOpen={errorToastIsOpen}
        setIsOpen={setErrorToastIsOpen}
        action={
          <Button color="inherit" size="small" onClick={handleCancel}>
            BACK HOME
          </Button>
        }
        errorMessage={errorMessage}
      />
    </>
  );
};

export default Analyzing;
