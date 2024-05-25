import { useState } from "react";
import Context from "./Context";

function Provider({ children }) {
  const [reload, setReload] = useState(false);

  return (
    <Context.Provider value={{ reload, setReload }}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
