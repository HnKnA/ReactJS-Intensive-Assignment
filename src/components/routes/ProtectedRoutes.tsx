import { Outlet, Navigate, useLocation } from "react-router-dom";
import { getUserFromLocalStorage } from "../../services/auth.service";

interface ProtectedRoutesProps {
  allowedRole: string[];
}

function ProtectedRoutes({ allowedRole }: ProtectedRoutesProps) {
  const location = useLocation();

  // Check if the user has the required role
  const user = getUserFromLocalStorage();
  const isAuthenticated = Boolean(user?.userName);
  // const isRole = !!user?.userName?.some((role: { name: string }) =>
  //   allowedRole.includes(role.name)
  // );
  const isRole = allowedRole.includes(user?.userName);

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Render the component if the user has the required role
  return isRole ? (
    <Outlet />
  ) : (
    // Redirect to login page if the user does not have the required role
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
}

export default ProtectedRoutes;
