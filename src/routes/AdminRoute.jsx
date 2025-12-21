import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "../ui/Forbidden";

import Loading from "../ui/Loading";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "Admin") {
    return <Forbidden />;
  }

  return children;
};

export default AdminRoute;
