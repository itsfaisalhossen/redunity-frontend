import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../ui/Loading";
import Forbidden from "../ui/Forbidden";

const RoleRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Forbidden />;
  }

  return children;
};

export default RoleRoute;
