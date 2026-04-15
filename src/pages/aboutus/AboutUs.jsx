import Container from "../../ui/Container";
import { Helmet } from "react-helmet";
// import useAuth from "../../hooks/useAuth";
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
 

const AboutUs = () => {
  // const { user } = useAuth();
  return (
    <div className="dark:bg-primary-dark min-h-screen py-10 md:py-24 transition-colors duration-300 overflow-hidden">
      <Helmet>
        <title>RedUnity | About Us</title>
      </Helmet>

      <Container>
        {/* --- Hero Section --- */}
        <div className="text-center mb-10 md:mb-16 relative animate-fade-in-up">
          <h1
            className="text-4xl md:text-6xl leading-tight font-black dark:text-white mb-6 relative z-10 opacity-0 animate-[fadeSlideUp_0.7s_ease_0.1s_forwards]"
          >
            Connecting <span className="text-rose-600 inline-block animate-[pulse_3s_ease-in-out_infinite]">Hearts</span>,{" "}
            <br className="hidden sm:block" />
            Saving <span className="text-rose-600 inline-block animate-[pulse_3s_ease-in-out_0.5s_infinite]">Lives</span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed relative z-10 opacity-0 animate-[fadeSlideUp_0.7s_ease_0.35s_forwards]">
            RedUnity is a state-of-the-art MERN-stack platform designed to
            bridge the gap between blood donors and recipients. We believe that
            technology can be the ultimate tool in making life-saving
            contributions accessible to everyone.
          </p>
        </div>

        {/* --- Vision & Mission Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20">
          <div className="opacity-0 animate-[fadeSlideUp_0.6s_ease_0.2s_forwards] bg-white back-drop-b dark:bg-slate-900/40 backdrop-blur-md p-6 md:p-10 rounded-[1.5rem] shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-rose-300 dark:hover:border-rose-900 hover:-translate-y-2 hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-500 flex flex-col">
            <div className="w-14 h-14 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center text-rose-600 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <Target size={30} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-4">
              Our Mission
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              To build a reliable, efficient, and transparent ecosystem for
              blood donation. We aim to reduce the time it takes to find a donor
              by providing real-time data and direct communication channels.
            </p>
          </div>

          <div className="opacity-0 animate-[fadeSlideUp_0.6s_ease_0.4s_forwards] bg-white back-drop-b dark:bg-slate-900/40 backdrop-blur-md p-6 md:p-10 rounded-[1.5rem] shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-rose-300 dark:hover:border-rose-900 hover:-translate-y-2 hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-500 flex flex-col">
            <div className="w-14 h-14 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center text-rose-600 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <Heart size={30} className="group-hover:fill-rose-500 transition-colors duration-300" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-4">
              Our Vision
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              A world where no life is lost due to the lack of blood. We
              envision a community-driven platform where every citizen is
              empowered to be a hero through regular donation.
            </p>
          </div>
        </div>

        {/* --- Why RedUnity? (COOL & MODERN GRID) --- */}
        <div className="mb-24 px-4 relative">
          <div className="text-center mb-16 opacity-0 animate-[fadeSlideUp_0.6s_ease_0.1s_forwards]">
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white">
              Why <span className="text-rose-600">RedUnity?</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Next-gen features for life-saving efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ShieldCheck size={28} />,
                title: "Secure Data",
                desc: "Role-based access control ensuring maximum privacy.",
                color: "bg-blue-500/10 text-blue-600",
                delay: "0.15s",
              },
              {
                icon: <Zap size={28} />,
                title: "Instant Alerts",
                desc: "Real-time push notifications for urgent requests.",
                color: "bg-amber-500/10 text-amber-600",
                delay: "0.3s",
              },
              {
                icon: <Users size={28} />,
                title: "Donor Tracking",
                desc: "Advanced tracking and scheduling for loyal donors.",
                color: "bg-emerald-500/10 text-emerald-600",
                delay: "0.45s",
              },
              {
                icon: <Code2 size={28} />,
                title: "Modern Tech",
                desc: "Built with a high-performance MERN architecture.",
                color: "bg-purple-500/10 text-purple-600",
                delay: "0.6s",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{ animationDelay: feature.delay }}
                className="opacity-0 w-full animate-[fadeSlideUp_0.6s_ease_forwards] group relative bg-white dark:bg-slate-900/60 p-6 md:p-8 rounded-[1rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-rose-500/10 hover:-translate-y-3 transition-all duration-500 cursor-default"
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-[1rem] transition-opacity duration-500"></div>

                <div
                  className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>

                <div className="relative z-10">
                  <h4 className="font-black text-slate-800 dark:text-white mb-3 text-lg">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Statistics/Impact Section --- */}
        <div className="opacity-0 animate-[fadeSlideUp_0.7s_ease_0.2s_forwards]">
          <div className="bg-rose-600 back-drop-b rounded-[3rem] p-8 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-rose-500/30 transition-transform duration-500 hover:scale-[1.01]">
            {/* Abstract Background Shapes */}
            <Droplets className="absolute -right-16 -bottom-16 w-64 h-64 text-white/10 rotate-12 animate-[spin_20s_linear_infinite]" />
            <div className="absolute -left-16 -top-16 w-48 h-48 bg-white/5 rounded-full animate-[ping_4s_ease-in-out_infinite]"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="w-full lg:max-w-xl text-center lg:text-left">
                <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                  The Impact of Your <br className="hidden md:block" />{" "}
                  Contribution
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    "Real-time fulfillment",
                    "Verified donor database",
                    "Seamless coordination",
                    "24/7 Emergency Support",
                  ].map((text, i) => (
                    <div
                      key={i}
                      style={{ animationDelay: `${0.1 + i * 0.15}s` }}
                      className="flex items-center gap-3 justify-center lg:justify-start opacity-0 animate-[fadeSlideUp_0.5s_ease_forwards] group/item"
                    >
                      <div className="bg-white/20 p-1 rounded-full group-hover/item:scale-110 group-hover/item:bg-white/30 transition-all duration-300">
                        <CheckCircle2 size={18} className="text-rose-200" />
                      </div>
                      <span className="text-sm md:text-base font-medium">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Footer Note --- */}
        <div className="mt-20 text-center px-4 pb-10 opacity-0 animate-[fadeSlideUp_0.6s_ease_0.3s_forwards]">
          <p className="text-slate-400 dark:text-slate-600 text-xs md:text-sm font-medium">
            Developed with ❤️ for a better humanity.{" "}
            <br className="md:hidden" /> &copy; 2026 RedUnity Network.
          </p>
        </div>
      </Container>

      {/* --- Keyframe Animations (injected as a style tag) --- */}
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;