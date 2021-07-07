import { RouterContext } from "./provider";
import { useContext } from "react";

export function useRouter() {
  return useContext(RouterContext);
}
