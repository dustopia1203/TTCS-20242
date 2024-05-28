import { useState, useEffect } from "react";
import Context from "./Context";

function Provider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const refreshToken = async () => {
      await fetch("http://localhost:8080/api/user/refresh", {
        method: "GET",
        credentials: "include",
      });
    };
    refreshToken();
    const userLocal = JSON.parse(localStorage.getItem("user"));
    if (userLocal && isAuthenticated === false) {
      const body = { email: userLocal.email, password: userLocal.password };
      const getUser = async () => {
        const data = await fetch("http://localhost:8080/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          credentials: "include",
        });
        const response = await data.json();
        setIsAdmin(response.user.role === "admin");
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
          setIsAdmin(response.user.role === "admin");
          setIsAuthenticated(true);
        }
      };
      getUser();
    }
  }, [isAuthenticated]);

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, isAdmin }}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
