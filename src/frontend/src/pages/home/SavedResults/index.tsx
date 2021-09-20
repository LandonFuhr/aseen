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
} from "@material-ui/core";
import {
  SavedResultsState,
  useHandleOpenResults,
  useSavedResults,
} from "./controller";
import { Close } from "@material-ui/icons";
import { arenaTypeToString } from "../../../core/utils";
import { SavedResult } from "../../../shared/ipc/SavedResults";
import { ErrorToast } from "../../../components/Toast/ErrorToast";
import { useState } from "react";

const SavedResults = ({ show, onClose }: SavedResultsProps) => {
  const savedResultsState = useSavedResults();
  const handleOpenResults = useHandleOpenResults();
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  function handleOpenResultsWrapper({
    savedResult,
  }: {
    savedResult: SavedResult;
  }) {
    handleOpenResults({ savedResult }).catch((e) => {
      console.error(e);
      setError(
        `Unable to open results folder for video "${savedResult.videoPath}". Please check that the results folder is still located at "${savedResult.resultsFolderPath}".`
      );
      setShowError(true);
    });
  }

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
            <Card style={{ height: "80vh" }}>
              <CardContent>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
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
                  savedResultsState={savedResultsState}
                  handleOpenResults={handleOpenResultsWrapper}
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
  savedResultsState,
  handleOpenResults,
}: {
  savedResultsState: SavedResultsState;
  handleOpenResults: (args: { savedResult: SavedResult }) => void;
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
    <Table>
      <TableHead>
        <TableRow>
          <TableCell width="45%">Video</TableCell>
          <TableCell>Type</TableCell>
          <TableCell width="20%">Created</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {savedResultsState.savedResults.map((result, i) => (
          <TableRow
            key={i}
            hover={true}
            onClick={() => handleOpenResults({ savedResult: result })}
            style={{ cursor: "pointer" }}
          >
            <TableCell>{result.videoPath}</TableCell>
            <TableCell>{arenaTypeToString(result.arenaType)}</TableCell>
            <TableCell>
              {result.createdAtDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

interface SavedResultsProps {
  show: boolean;
  onClose: () => void;
}

export default SavedResults;
