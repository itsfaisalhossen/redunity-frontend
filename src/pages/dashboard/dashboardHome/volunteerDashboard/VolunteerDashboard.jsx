import { Helmet } from "react-helmet";
import SectionTitle from "../../../../ui/SectionTitle ";
import useAuth from "../../../../hooks/useAuth";

const VolunteerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="my-14 md:my-24">
      <Helmet>
        <title>RedUnity | Volunteer Dashboard</title>
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
export default VolunteerDashboard;
