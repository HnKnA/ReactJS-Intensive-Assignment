import { Outlet, Navigate, useLocation } from "react-router-dom";
import { getUserFromLocalStorage } from "../../services/auth.service";

function AuthenticatedRoute() {
  const location = useLocation();

  const user = getUserFromLocalStorage();

  const isAuthenticated = Boolean(user?.userName);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default AuthenticatedRoute;
