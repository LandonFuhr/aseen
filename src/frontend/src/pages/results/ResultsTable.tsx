import {
  TableContainer,
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

export const ResultsTable = ({ data }: ResultsTableProps) => {
  return (
    <Box>
      <Box ml={2} mb={1}>
        <Typography variant="h5">{data.animalId}</Typography>
      </Box>
      <TableContainer component={Paper}>
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
      </TableContainer>
    </Box>
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
}

interface ResultsRowProps {
  regionStats: RegionStats;
}
