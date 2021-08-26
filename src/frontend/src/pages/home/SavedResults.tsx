import {
  Box,
  Modal,
  Typography,
  Card,
  CardContent,
  Container,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

const SavedResults = ({ show, onClose }: SavedResultsProps) => {
  return (
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
                <Box display="flex" justifyContent="center" alignItems="center">
                  <IconButton onClick={onClose}>
                    <Close />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Modal>
  );
};

interface SavedResultsProps {
  show: boolean;
  onClose: () => void;
}

export default SavedResults;
