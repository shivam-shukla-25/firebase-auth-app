import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import { Loader } from "../components/Loader";
import { ROUTES } from "../constants/routes";
import type { JSX } from "react";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, status } = useAuth();

  if (status === "loading") {
    return <Loader label="Preparing sign-in..." />;
  }

  if (user) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children;
};
