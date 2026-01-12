import { Helmet } from "react-helmet";
import ContactUsSection from "../../ui/ContactUsSection";
import FeaturedSection from "../../ui/FeaturedSection";
import HomeBanner from "../../ui/HomeBanner";
import WhyDonateBlood from "../../ui/WhyDonateBlood ";
import HowItWorks from "../../ui/HowItWorks ";
import FAQ from "../../ui/Faq";
import JoinUs from "../../ui/JoinUs";

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

      {/* FAQ  */}
      <FAQ />

      {/* How It Works */}
      <HowItWorks />

      {/* Join us */}
      <JoinUs />
    </div>
  );
};
export default Home;
