import { Helmet } from "react-helmet";
import ContactUsSection from "../../ui/ContactUsSection";
import FeaturedSection from "../../ui/FeaturedSection";
import HomeBanner from "../../ui/HomeBanner";
import WhyDonateBlood from "../../ui/WhyDonateBlood ";
import HowItWorks from "../../ui/HowItWorks ";

const Home = () => {
  return (
    <div className="dark:bg-primary-dark">
      <Helmet>
        <title>RedUnity | Home</title>
        <meta
          name="description"
          content="Join RedUnity Blood Donation Platform. Register as a donor, find blood requests, and help save lives."
        />
      </Helmet>

      {/* Banner (Join / Search) */}
      <HomeBanner />

      {/* Featured Section */}
      <FeaturedSection />

      {/* Why Donate Blood? */}
      <WhyDonateBlood />

      {/* How It Works */}
      <HowItWorks />

      {/* Contact Us */}
      <ContactUsSection />
    </div>
  );
};
export default Home;
