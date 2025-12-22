import { Helmet } from "react-helmet";
import ContactUsSection from "../../ui/ContactUsSection";
import FeaturedSection from "../../ui/FeaturedSection";
import HomeBanner from "../../ui/HomeBanner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>RedUnity | Home</title>
      </Helmet>
      <HomeBanner />
      <FeaturedSection />
      <ContactUsSection />
    </div>
  );
};
export default Home;
