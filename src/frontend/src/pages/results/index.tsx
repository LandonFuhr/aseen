import { Box, Grid } from "@material-ui/core";
import { AppBarCustom } from "../../components/AppBar";
import { OutlineButton } from "../../components/Buttons";
import { useResultsPaths } from "../../components/PersistentProviders/ResultsPaths";
import { FolderOutlined, HomeRounded } from "@material-ui/icons";
import { useRouter } from "../../components/PersistentProviders/Router";
import { Page } from "../../core/types";
import { openFolder } from "../../core/electron/shell";

const Results = () => {
  const resultsPaths = useResultsPaths();
  const router = useRouter();
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

  return (
    <>
      <AppBarCustom text="Results" />
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item>
            <OutlineButton
              text="Back Home"
              icon={<HomeRounded />}
              onClick={() => router.setPage(Page.home)}
            />
          </Grid>
          {resultsPaths && (
            <Grid item>
              <OutlineButton
                text="Open Results Folder"
                icon={<FolderOutlined />}
                onClick={handleOpenResultsFolder}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Results;
