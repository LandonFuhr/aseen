import { createContext } from "react";
import { Page } from "../../../core/types";
import { useSessionState } from "../../SessionStorage";

export const RouterProvider = (props: RouterProviderProps) => {
  const [page, setPage] = useSessionState({
    key: "page",
    defaultValue: Page.home,
  });
  const router: Router = {
    page,
    setPage,
  };
  return (
    <RouterContext.Provider value={router}>
      {props.children}
    </RouterContext.Provider>
  );
};

export const RouterContext = createContext<Router>({
  page: Page.home,
  setPage: () => {
    throw new Error("Router provider not found.");
  },
});

interface Router {
  page: Page;
  setPage: (newPage: Page) => void;
}

interface RouterProviderProps {
  children: React.ReactNode;
}
