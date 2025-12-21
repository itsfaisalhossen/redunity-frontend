import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "../ui/Forbidden";
// import Forbidden from "../ui/Forbidden ";
import Loading from "../ui/Loading";

const DonorRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || !user || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "Donor") {
    return <Forbidden />;
  }

  return children;
};

export default DonorRoute;
