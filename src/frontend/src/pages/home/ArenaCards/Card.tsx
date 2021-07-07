import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

export interface ArenaCardLayoutProps {
  imgSrc: string;
  title: string;
  subtitle: string;
  onClick: () => void;
  flat?: boolean;
}

export const ArenaCard = (props: ArenaCardLayoutProps) => {
  const style = props.flat
    ? { border: "2px dashed rgba(0, 0, 0, 0.12)", boxShadow: "none" }
    : {};
  return (
    <Card style={style}>
      {props.onClick ? (
        <CardActionArea onClick={props.onClick}>
          <ArenaCardContents {...props} />
        </CardActionArea>
      ) : (
        <ArenaCardContents {...props} />
      )}
    </Card>
  );
};

interface ArenaCardContentsProps {
  title: string;
  imgSrc: string;
  subtitle: string;
  imgHeight?: string;
}

const ArenaCardContents = (props: ArenaCardContentsProps) => {
  return (
    <>
      <CardMedia
        component="img"
        alt={`Example of ${props.title}.`}
        height={props.imgHeight ? props.imgHeight : "180"}
        image={props.imgSrc}
        title={props.title}
      />
      <CardContent>
        <Typography gutterBottom={true} noWrap={true} variant="h5">
          {props.title}
        </Typography>
        <Typography variant="subtitle1">{props.subtitle}</Typography>
      </CardContent>
    </>
  );
};
