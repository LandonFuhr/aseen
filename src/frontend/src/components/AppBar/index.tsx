import { AppBar, Container, Box, Typography } from "@material-ui/core";

export const AppBarCustom = (props: AppBarCustomProps) => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Box p={1.3} pl={3}>
          <Typography variant="h4">{props.text}</Typography>
        </Box>
      </Container>
    </AppBar>
  );
};

export interface AppBarCustomProps {
  text: string;
}
