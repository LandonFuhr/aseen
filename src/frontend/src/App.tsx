import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/core";
import PersistentProviders from "./components/PersistentProviders";
import { useRouter } from "./components/PersistentProviders/Router";
import Home from "./pages/home";
import Builder from "./pages/builder";
import Analyzing from "./pages/analyzing";
import Results from "./pages/results";
import { Page } from "./core/types";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <PersistentProviders>
        <Main />
      </PersistentProviders>
    </ThemeProvider>
  );
};

const Main = () => {
  const router = useRouter();
  switch (router.page) {
    case Page.home:
      return <Home />;
    case Page.builder:
      return <Builder />;
    case Page.analyzing:
      return <Analyzing />;
    case Page.results:
      return <Results />;
    default:
      return null;
  }
};

export default App;
