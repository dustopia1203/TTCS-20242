import { useAuth } from "../../hooks/auth";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <>
        return <Navigate to="/login" />;
      </>
    );
  }
  return children;
}

export default ProtectedRoute;
