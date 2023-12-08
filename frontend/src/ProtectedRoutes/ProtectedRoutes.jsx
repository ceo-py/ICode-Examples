import { useAuth } from "../AuthContext/AuthContext";

const ProtectedRoute = ({ authenticatedElement, unauthenticatedElement }) => {
  const { state } = useAuth();

  return state.isAuthenticated ? authenticatedElement : unauthenticatedElement;
};

export default ProtectedRoute;
