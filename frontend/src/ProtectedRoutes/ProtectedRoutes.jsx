import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { state } = useAuth();
  return !state.isAuthenticated ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
