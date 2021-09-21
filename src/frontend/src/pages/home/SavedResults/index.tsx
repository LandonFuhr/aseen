import {
  Box,
  Modal,
  Typography,
  Card,
  CardContent,
  Container,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Button,
  TableContainer,
} from "@material-ui/core";
import { SavedResultsState, useSavedResults } from "./controller";
import { Close } from "@material-ui/icons";
import { SavedResult } from "../../../shared/ipc/SavedResults";
import { ErrorToast } from "../../../components/Toast/ErrorToast";
import { Dispatch, SetStateAction, useState } from "react";
import { useSetResultsPaths } from "../../../components/PersistentProviders/ResultsPaths";
import { ResultsPaths } from "../../../shared/ipc";
import { useRouter } from "../../../components/PersistentProviders/Router";
import { Page } from "../../../core/types";
import { useVideoMetadata } from "../../../components/VideoMetadata/hooks";
import { durationToString, getStringFromMemorySize } from "../../../core/utils";

const SavedResults = ({ show, onClose }: SavedResultsProps) => {
  const savedResultsState = useSavedResults({ show });
  const setResultsPaths = useSetResultsPaths();
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  function handleErrorClose() {
    setShowError(false);
    setError("");
  }

  return (
    <>
      <Modal open={show} onClose={onClose}>
        <Box
          position="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
          }}
        >
          <Container maxWidth="md">
            <Card style={{ minHeight: "80vh", width: "100%" }}>
              <CardContent>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  paddingBottom={2}
                >
                  <Typography variant="h3">Saved Results</Typography>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconButton onClick={onClose}>
                      <Close />
                    </IconButton>
                  </Box>
                </Box>
                <SavedResultsBody
                  setResultsPaths={setResultsPaths}
                  savedResultsState={savedResultsState}
                />
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Modal>
      <ErrorToast
        isOpen={showError}
        setIsOpen={setShowError}
        errorMessage={error}
        action={
          <Button color="inherit" size="small" onClick={handleErrorClose}>
            DISMISS
          </Button>
        }
      />
    </>
  );
};

const SavedResultsBody = ({
  setResultsPaths,
  savedResultsState,
}: {
  setResultsPaths: Dispatch<SetStateAction<ResultsPaths | null>>;
  savedResultsState: SavedResultsState;
}) => {
  if (savedResultsState.isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        paddingTop="80px"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (savedResultsState.hasError) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        paddingTop="80px"
      >
        <Typography color="error" variant="h4">
          Unable to get saved results.
        </Typography>
        <Typography color="error" variant="h5">
          Please try reopening the app or contact support.
        </Typography>
      </Box>
    );
  }
  return (
    <TableContainer style={{ maxHeight: "65vh" }}>
      <Table stickyHeader style={{ width: "100%", overflow: "hidden" }}>
        <TableHead>
          <TableRow>
            <TableCell width="20%">Video</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Length</TableCell>
            <TableCell width="30%">Folder</TableCell>
            <TableCell width="20%">Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {savedResultsState.savedResults.map((result, i) => (
            <SavedResultRow
              key={i}
              savedResult={result}
              setResultsPaths={setResultsPaths}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const SavedResultRow = ({
  savedResult,
  setResultsPaths,
}: {
  savedResult: SavedResult;
  setResultsPaths: Dispatch<SetStateAction<ResultsPaths | null>>;
}) => {
  const metadata = useVideoMetadata(savedResult.resultsPaths.outputVideoPath);
  const router = useRouter();

  function handleRowClick({ result }: { result: SavedResult }) {
    setResultsPaths(result.resultsPaths);
    router.setPage(Page.results);
  }

  return (
    <TableRow
      hover={true}
      onClick={() => handleRowClick({ result: savedResult })}
      style={{ cursor: "pointer" }}
    >
      <TableCell>
        <video
          width="100px"
          height="100px"
          src={savedResult.resultsPaths.outputVideoPath}
        />
      </TableCell>
      <TableCell>
        {metadata ? getStringFromMemorySize(metadata.nBytes) : "..."}
      </TableCell>
      <TableCell>
        {metadata ? durationToString(metadata.durationInMilliseconds) : "..."}
      </TableCell>
      <TableCell>{savedResult.resultsPaths.resultsFolder}</TableCell>
      <TableCell>
        {savedResult.createdAtDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </TableCell>
    </TableRow>
  );
};

interface SavedResultsProps {
  show: boolean;
  onClose: () => void;
}

export default SavedResults;
