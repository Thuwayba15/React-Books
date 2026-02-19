import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthStateContext } from "../providers/auth/context";

export const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const auth = useContext(AuthStateContext);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};