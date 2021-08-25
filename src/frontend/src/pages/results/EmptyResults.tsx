import { Typography, Box, Container } from "@material-ui/core";
import { DonutSmallOutlined } from "@material-ui/icons";
import { HomeButton } from "./HomeButton";

export const EmptyResults = ({ onHomeClick }: EmptyResultsProps) => {
  return (
    <Container maxWidth="sm">
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
        marginX="auto"
        paddingTop={4}
      >
        <DonutSmallOutlined color="primary" style={{ fontSize: "150px" }} />
        <Box paddingBottom={1}>
          <Typography variant="h4">No Mice Detected</Typography>
        </Box>
        <Typography variant="subtitle1" align="center">
          The tracking model was not able to detect any mice in this video. This
          is usually due to the video having low contrast or extremely high or
          low resolution. Try changing your preprocessing parameters and then
          re-running the analysis.
        </Typography>
        <Box paddingTop={4}>
          <HomeButton onClick={onHomeClick} />
        </Box>
      </Box>
    </Container>
  );
};

interface EmptyResultsProps {
  onHomeClick: () => void;
}
