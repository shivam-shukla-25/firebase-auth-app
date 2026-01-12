import { createBrowserRouter } from "react-router-dom";
import { PublicRoute } from "../auth/PublicRoute";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { NotFound } from "../pages/NotFound";
import { Dashboard } from "../pages/Dashboard";
import { SignIn } from "../pages/SignIn";
import { ROUTES } from "../constants/routes";

const protectedDashboard = (
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
);

export const router = createBrowserRouter([
  {
    path: ROUTES.SIGN_IN,
    element: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    ),
  },
  {
    path: ROUTES.DASHBOARD,
    element: protectedDashboard,
  },
  {
    path: ROUTES.ROOT,
    element: protectedDashboard,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
