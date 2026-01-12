import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Loader } from "../components/Loader";
import { ROUTES } from "../constants/routes";
import type { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, status } = useAuth();

  if (status === "loading") {
    return <Loader label="Checking authentication..." />;
  }

  if (!user) {
    return <Navigate to={ROUTES.SIGN_IN} replace />;
  }

  return children;
};
