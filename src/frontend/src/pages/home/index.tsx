import { Grid, Box, Container } from "@material-ui/core";
import { AppBarCustom } from "../../components/AppBar";
import ArenaCards from "./ArenaCards";
import ButtonsBar from "./ButtonsBar";
import "./styles.css";

const Home = () => {
  return (
    <>
      <AppBarCustom text="Choose Your Arena Type" />
      <Box p={6}>
        <Container maxWidth="lg">
          <Grid container justify="center" spacing={8}>
            <Grid item xs={12}>
              <ButtonsBar />
            </Grid>
            <Grid item xs={12}>
              <ArenaCards />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
