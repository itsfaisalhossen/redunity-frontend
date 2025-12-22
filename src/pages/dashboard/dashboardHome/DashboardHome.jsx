import useRole from "../../../hooks/useRole";
import Loading from "../../../ui/Loading";
import AdminDashboard from "./adminDashboard/adminDashboard";
import DonorDashboard from "./donorDashboard/DonorDashboard";
import VolunteerDashboard from "./volunteerDashboard/volunteerDashboard";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();
  if (roleLoading) {
    return <Loading />;
  }

  if (role === "Admin") {
    return <AdminDashboard />;
  } else if (role === "Volunteer") {
    return <VolunteerDashboard />;
  } else {
    return <DonorDashboard />;
  }
};
export default DashboardHome;
