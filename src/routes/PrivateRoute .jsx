import { Navigate, useLocation } from "react-router";
import Loading from "../ui/Loading";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/auth/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
