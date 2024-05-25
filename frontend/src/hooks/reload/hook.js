import { useContext } from "react";
import Context from "./Context";

function useReload() {
  return useContext(Context);
}

export default useReload;
