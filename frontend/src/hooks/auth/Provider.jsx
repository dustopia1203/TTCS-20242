import { useState, useEffect } from "react";
import Context from "./Context";

function Provider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/user/refresh", {
      method: "GET",
      credentials: "include",
    });
    const userLocal = JSON.parse(localStorage.getItem("user"));
    if (userLocal && isAuthenticated === false) {
      const body = { email: userLocal.email, password: userLocal.password };
      const getUser = async () => {
        await fetch("http://localhost:8080/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          credentials: "include",
        });
      };
      getUser();
      setIsAuthenticated(true);
    } else {
      const getUser = async () => {
        const data = await fetch("http://localhost:8080/api/user/me", {
          method: "GET",
          credentials: "include",
        });
        const response = await data.json();
        if (response.success) {
          setIsAuthenticated(true);
        }
      };
      getUser();
    }
  }, [isAuthenticated]);

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
