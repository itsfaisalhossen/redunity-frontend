import { Clock, Droplets, ShieldCheck, Users } from "lucide-react";
import Container from "./Container";

const FeaturedSection = () => {
  return (
    <div>
      <Container>
        <section className="my-12 lg:my-24 ">
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Left Side: Text Content */}
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white/80 mb-6 leading-snug">
                Why our platform is <br />
                <span className="text-red-600 underline decoration-red-100 underline-offset-8">
                  Different
                </span>{" "}
                from others
              </h2>
              <p className="text-gray-500 dark:text-white/60 mb-8 text-lg">
                We focus on speed and transparency. When every second counts, we
                ensure the connection between donor and recipient is seamless.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="group">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <Clock size={24} />
                  </div>
                  <h4 className="font-bold md:text-2xl dark:text-white/90 text-gray-800 mb-2">
                    Real-time Alert
                  </h4>
                  <p className="text-sm text-gray-400">
                    Get notified instantly when someone nearby needs your blood
                    group.
                  </p>
                </div>

                <div className="group">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <ShieldCheck size={24} />
                  </div>
                  <h4 className="font-bold md:text-2xl dark:text-white/90 text-gray-800 mb-2">
                    Verified Donors
                  </h4>
                  <p className="text-sm text-gray-400">
                    Every donor profile is verified to ensure the highest safety
                    standards.
                  </p>
                </div>
              </div>
            </div>
            {/* Right Side: Visual Feature Cards */}
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-red-600 p-8 rounded-[40px] text-white flex flex-col justify-center items-center text-center space-y-3 transform translate-y-8 hover:-translate-y-2 transition-transform duration-500">
                <Droplets size={40} className="mb-2" />
                <h3 className="text-3xl font-black">1k+</h3>
                <p className="text-red-100 text-sm font-medium">
                  Successful Donations
                </p>
              </div>

              <div className="bg-gray-900 p-8 rounded-[40px] text-white flex flex-col justify-center items-center text-center space-y-3 hover:-translate-y-2 transition-transform duration-500">
                <Users size={40} className="mb-2 text-red-500" />
                <h3 className="text-3xl font-black">3k+</h3>
                <p className="text-gray-400 text-sm font-medium">
                  Registered Heroes
                </p>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};
export default FeaturedSection;
