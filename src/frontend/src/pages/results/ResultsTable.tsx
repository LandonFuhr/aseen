import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Box,
  Paper,
} from "@material-ui/core";
import {
  BehaviourResultsData,
  RegionStats,
} from "../../shared/ipc/BehaviourResults";
import "./ResultsTable.css";

export const ResultsTable = ({
  data,
  backgroundColor,
  dotColor,
}: ResultsTableProps) => {
  return (
    <Paper>
      <Box pt={2}>
        <Box
          ml={2}
          mb={1}
          style={{ backgroundColor }}
          className="mouse-name-container"
          display="flex"
          alignItems="center"
        >
          <ColorDot color={dotColor} />
          <Typography variant="h6">{data.animalId}</Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Region</TableCell>
              <TableCell>Time Fully Inside (s)</TableCell>
              <TableCell>Time Partly Inside (s)</TableCell>
              <TableCell>Interaction Time (s)</TableCell>
              <TableCell># of Entries</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.statsPerRegion.map((regionStats, i) => (
              <ResultsRow key={i} regionStats={regionStats} />
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

const ColorDot = ({ color }: { color?: string }) => {
  if (!color) {
    return null;
  }

  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        marginRight: "15px",
        backgroundColor: color,
        borderRadius: "50%",
      }}
    />
  );
};

const ResultsRow = ({ regionStats }: ResultsRowProps) => {
  return (
    <TableRow>
      <TableCell>{regionStats.regionId}</TableCell>
      <TableCell>{regionStats.secondsFullyInside.toFixed(1)}</TableCell>
      <TableCell>{regionStats.secondsPartlyInside.toFixed(1)}</TableCell>
      <TableCell>{regionStats.secondsOfInteraction.toFixed(1)}</TableCell>
      <TableCell>{regionStats.nEntries}</TableCell>
    </TableRow>
  );
};

export interface ResultsTableProps {
  data: BehaviourResultsData;
  backgroundColor?: string;
  dotColor?: string;
}

interface ResultsRowProps {
  regionStats: RegionStats;
}
