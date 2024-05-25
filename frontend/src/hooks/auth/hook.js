import { useContext } from "react";
import Context from "./Context";

function useAuth() {
  return useContext(Context);
}

export default useAuth;
