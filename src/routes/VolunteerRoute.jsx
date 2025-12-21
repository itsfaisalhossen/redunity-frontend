import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "../ui/Forbidden ";
import Loading from "../ui/Loading";

const VolunteerRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || !user || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "Volunteer") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default VolunteerRoute;
