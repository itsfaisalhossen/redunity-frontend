import { Helmet } from "react-helmet";
import useAuth from "../../../../hooks/useAuth";
import SectionTitle from "../../../../ui/SectionTitle ";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="my-14 md:my-24">
      <Helmet>
        <title>RedUnity | Admin Dashboard</title>
      </Helmet>
      {/* Welcome Section */}
      <header className="mb-8">
        <SectionTitle
          title={` Welcome back, ${user?.displayName}!`}
          subTitle={" Here is a summary of your recent activity."}
        />
      </header>
    </div>
  );
};
export default AdminDashboard;
