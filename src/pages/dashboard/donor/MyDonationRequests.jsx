import { Helmet } from "react-helmet";
import SectionTitle from "../../../ui/SectionTitle ";

const MyDonationRequests = () => {
  return (
    <div className="my-14 md:my-24">
      <Helmet>
        <title>RedUnity | My Donations</title>
      </Helmet>
      <SectionTitle subTitle={""} title={"My Donation Requests"} />
    </div>
  );
};
export default MyDonationRequests;
