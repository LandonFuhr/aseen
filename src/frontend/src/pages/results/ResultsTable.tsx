import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Box,
  Paper,
  Grid,
} from "@material-ui/core";
import {
  FindInPageOutlined,
  SpeedRounded,
  WarningRounded,
} from "@material-ui/icons";
import {
  BehaviourResultsData,
  RegionOverallStats,
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
        <OverallStats
          animalId={data.animalId}
          statsOverall={data.statsOverall}
        />
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

const OverallStats = ({
  statsOverall: {
    fractionOfFramesWithAnimalDetected,
    totalDistanceTravelledInPixels,
    averageSpeedInPixelsPerSecond,
  },
  animalId,
}: OverallStatsProps) => {
  const statCards = [
    <OverallStatCard
      title="Total Distance Travelled"
      value={`${totalDistanceTravelledInPixels.toFixed(1)} px`}
      icon={<DistanceIcon />}
    />,
    <OverallStatCard
      title="Average Speed"
      value={`${averageSpeedInPixelsPerSecond.toFixed(1)} px/s`}
      icon={<SpeedRounded />}
    />,
    <OverallStatCard
      title={`Frames Detecting ${animalId}`}
      value={`${(fractionOfFramesWithAnimalDetected * 100).toFixed(1)} %`}
      icon={<FindInPageOutlined />}
      isWarning={isLowTrackingAccuracy({ fractionOfFramesWithAnimalDetected })}
    />,
  ];
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {statCards.map((statCard, i) => (
          <Grid key={i} item xs={6} sm={4} md={3}>
            {statCard}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

function isLowTrackingAccuracy({
  fractionOfFramesWithAnimalDetected,
}: {
  fractionOfFramesWithAnimalDetected: number;
}) {
  return fractionOfFramesWithAnimalDetected < 0.9;
}

interface OverallStatsProps {
  animalId: string;
  statsOverall: RegionOverallStats;
}

const OverallStatCard = ({
  icon,
  title,
  value,
  isWarning,
}: OverallStatRowProps) => {
  return (
    <Paper variant="outlined">
      <Box
        m={1}
        p={1}
        display="flex"
        alignItems="center"
        flexDirection="column"
        position="relative"
      >
        {isWarning && <WarningRounded color="error" className="warning-icon" />}
        {icon}
        <Typography variant="h6">{value}</Typography>
        <Typography variant="caption">{title}</Typography>
      </Box>
    </Paper>
  );
};

interface OverallStatRowProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  isWarning?: boolean;
}

const DistanceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
  >
    <rect fill="none" height="24" width="24" />
    <path d="M20,9.42V12h2V6h-6v2h2.58l-4.46,4.46c-0.39,0.39-1.02,0.39-1.41,0l-1.17-1.17c-1.17-1.17-3.07-1.17-4.24,0L2,16.59L3.41,18 l5.29-5.29c0.39-0.39,1.02-0.39,1.41,0l1.17,1.17c1.17,1.17,3.07,1.17,4.24,0L20,9.42z" />
  </svg>
);

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
