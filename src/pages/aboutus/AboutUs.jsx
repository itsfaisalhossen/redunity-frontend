import {
  Users,
  Heart,
  ShieldCheck,
  Zap,
  Target,
  Droplets,
  Code2,
  CheckCircle2,
} from "lucide-react";
import Container from "../../ui/Container";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  return (
    <div className="bg-primary dark:bg-primary-dark min-h-screen py-10 md:py-20 transition-colors duration-300">
      <Helmet>
        <title>RedUnity | About Us</title>
      </Helmet>

      <Container>
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white mb-6">
            Connecting <span className="text-rose-600">Hearts</span>, <br />
            Saving <span className="text-rose-600">Lives</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            RedUnity is a state-of-the-art MERN-stack platform designed to
            bridge the gap between blood donors and recipients. We believe that
            technology can be the ultimate tool in making life-saving
            contributions accessible to everyone.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white back-drop-b p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-rose-200 transition-all">
            <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-600 mb-6">
              <Target size={30} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              Our Mission
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              To build a reliable, efficient, and transparent ecosystem for
              blood donation. We aim to reduce the time it takes to find a donor
              by providing real-time data and direct communication channels.
            </p>
          </div>

          <div className="bg-white back-drop-b p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-rose-200 transition-all">
            <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-600 mb-6">
              <Heart size={30} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              Our Vision
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              A world where no life is lost due to the lack of blood. We
              envision a community-driven platform where every citizen is
              empowered to be a hero through regular donation.
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
              Why RedUnity?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <ShieldCheck />,
                title: "Secure Data",
                desc: "Role-based access control ensuring privacy.",
              },
              {
                icon: <Zap />,
                title: "Instant Alerts",
                desc: "Immediate notification for urgent requests.",
              },
              {
                icon: <Users />,
                title: "Donor Management",
                desc: "Easy tracking and scheduling for donors.",
              },
              {
                icon: <Code2 />,
                title: "Modern Tech",
                desc: "Built with the robust MERN stack.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-50 back-drop-b p-6 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all text-center"
              >
                <div className="text-rose-600 flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics/Impact Section */}
        <div className="bg-rose-600 rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden">
          <Droplets className="absolute -right-10 -bottom-10 w-64 h-64 text-rose-500/20 rotate-12" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-md">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Impact of Your Contribution
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-rose-200" />
                  <span>Real-time blood request fulfillment</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-rose-200" />
                  <span>Verified donor database</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-rose-200" />
                  <span>Seamless hospital coordination</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center flex-1 w-full max-w-sm">
              <p className="text-rose-100 text-sm uppercase tracking-widest mb-2 font-bold">
                Total Donors
              </p>
              <h3 className="text-5xl font-black mb-4">10,000+</h3>
              <p className="text-rose-100/80 italic">
                "Technology is just a tool. People save people."
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-20 text-center">
          <p className="text-slate-400 dark:text-slate-500 text-sm">
            Developed with ❤️ for a better humanity. &copy; 2026 RedUnity
            Network.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
