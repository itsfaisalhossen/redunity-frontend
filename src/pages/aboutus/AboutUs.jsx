// import {
//   Users,
//   Heart,
//   ShieldCheck,
//   Zap,
//   Target,
//   Droplets,
//   Code2,
//   CheckCircle2,
// } from "lucide-react";
// import Container from "../../ui/Container";
// import { Helmet } from "react-helmet";

// const AboutUs = () => {
//   return (
//     <div className=" dark:bg-primary-dark min-h-screen py-10 md:py-20 transition-colors duration-300">
//       <Helmet>
//         <title>RedUnity | About Us</title>
//       </Helmet>

//       <Container>
//         {/* Hero Section */}
//         <div className="text-center mb-16 md:mb-24">
//           <h1 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white mb-6">
//             Connecting <span className="text-rose-600">Hearts</span>, <br />
//             Saving <span className="text-rose-600">Lives</span>
//           </h1>
//           <p className="text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
//             RedUnity is a state-of-the-art MERN-stack platform designed to
//             bridge the gap between blood donors and recipients. We believe that
//             technology can be the ultimate tool in making life-saving
//             contributions accessible to everyone.
//           </p>
//         </div>

//         {/* Vision & Mission Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
//           <div className="bg-white back-drop-b p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-rose-200 transition-all">
//             <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-600 mb-6">
//               <Target size={30} />
//             </div>
//             <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
//               Our Mission
//             </h3>
//             <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
//               To build a reliable, efficient, and transparent ecosystem for
//               blood donation. We aim to reduce the time it takes to find a donor
//               by providing real-time data and direct communication channels.
//             </p>
//           </div>

//           <div className="bg-white back-drop-b p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-rose-200 transition-all">
//             <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-600 mb-6">
//               <Heart size={30} />
//             </div>
//             <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
//               Our Vision
//             </h3>
//             <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
//               A world where no life is lost due to the lack of blood. We
//               envision a community-driven platform where every citizen is
//               empowered to be a hero through regular donation.
//             </p>
//           </div>
//         </div>

//         {/* Feature Highlights */}
//         <div className="mb-24">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
//               Why RedUnity?
//             </h2>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 icon: <ShieldCheck />,
//                 title: "Secure Data",
//                 desc: "Role-based access control ensuring privacy.",
//               },
//               {
//                 icon: <Zap />,
//                 title: "Instant Alerts",
//                 desc: "Immediate notification for urgent requests.",
//               },
//               {
//                 icon: <Users />,
//                 title: "Donor Management",
//                 desc: "Easy tracking and scheduling for donors.",
//               },
//               {
//                 icon: <Code2 />,
//                 title: "Modern Tech",
//                 desc: "Built with the robust MERN stack.",
//               },
//             ].map((feature, idx) => (
//               <div
//                 key={idx}
//                 className="bg-slate-50 back-drop-b p-6 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all text-center"
//               >
//                 <div className="text-rose-600 flex justify-center mb-4">
//                   {feature.icon}
//                 </div>
//                 <h4 className="font-bold text-slate-800 dark:text-white mb-2">
//                   {feature.title}
//                 </h4>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">
//                   {feature.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Statistics/Impact Section */}
//         <div className="bg-rose-600 rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden">
//           <Droplets className="absolute -right-10 -bottom-10 w-64 h-64 text-rose-500/20 rotate-12" />
//           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
//             <div className="max-w-md">
//               <h2 className="text-3xl md:text-4xl font-bold mb-6">
//                 The Impact of Your Contribution
//               </h2>
//               <ul className="space-y-4">
//                 <li className="flex items-center gap-3">
//                   <CheckCircle2 size={20} className="text-rose-200" />
//                   <span>Real-time blood request fulfillment</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <CheckCircle2 size={20} className="text-rose-200" />
//                   <span>Verified donor database</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <CheckCircle2 size={20} className="text-rose-200" />
//                   <span>Seamless hospital coordination</span>
//                 </li>
//               </ul>
//             </div>
//             <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center flex-1 w-full max-w-sm">
//               <p className="text-rose-100 text-sm uppercase tracking-widest mb-2 font-bold">
//                 Total Donors
//               </p>
//               <h3 className="text-5xl font-black mb-4">10,000+</h3>
//               <p className="text-rose-100/80 italic">
//                 "Technology is just a tool. People save people."
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Footer Note */}
//         <div className="mt-20 text-center">
//           <p className="text-slate-400 dark:text-slate-500 text-sm">
//             Developed with ❤️ for a better humanity. &copy; 2026 RedUnity
//             Network.
//           </p>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default AboutUs;

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
    <div className="dark:bg-primary-dark min-h-screen py-10 md:py-24 transition-colors duration-300 overflow-hidden">
      <Helmet>
        <title>RedUnity | About Us</title>
      </Helmet>

      <Container>
        {/* --- Hero Section --- */}
        <div className="text-center mb-16 md:mb-24 px-4 relative">
          {/* Decorative Background Blur */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-rose-500/10 blur-[100px] rounded-full pointer-events-none"></div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-800 dark:text-white mb-6 leading-tight relative z-10">
            Connecting <span className="text-rose-600">Hearts</span>,{" "}
            <br className="hidden sm:block" />
            Saving <span className="text-rose-600">Lives</span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed relative z-10">
            RedUnity is a state-of-the-art MERN-stack platform designed to
            bridge the gap between blood donors and recipients. We believe that
            technology can be the ultimate tool in making life-saving
            contributions accessible to everyone.
          </p>
        </div>

        {/* --- Vision & Mission Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20 px-4 md:px-0">
          <div className="bg-white back-drop-b dark:bg-slate-900/40 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-rose-300 dark:hover:border-rose-900 transition-all duration-500 flex flex-col">
            <div className="w-14 h-14 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center text-rose-600 mb-6 group-hover:scale-110 transition-transform">
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

          <div className="bg-white back-drop-b dark:bg-slate-900/40 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-rose-300 dark:hover:border-rose-900 transition-all duration-500 flex flex-col">
            <div className="w-14 h-14 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center text-rose-600 mb-6 group-hover:scale-110 transition-transform">
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

        {/* --- Why RedUnity? (COOL & MODERN GRID) --- */}
        <div className="mb-24 px-4 relative">
          <div className="text-center mb-16">
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
              },
              {
                icon: <Zap size={28} />,
                title: "Instant Alerts",
                desc: "Real-time push notifications for urgent requests.",
                color: "bg-amber-500/10 text-amber-600",
              },
              {
                icon: <Users size={28} />,
                title: "Donor Tracking",
                desc: "Advanced tracking and scheduling for loyal donors.",
                color: "bg-emerald-500/10 text-emerald-600",
              },
              {
                icon: <Code2 size={28} />,
                title: "Modern Tech",
                desc: "Built with a high-performance MERN architecture.",
                color: "bg-purple-500/10 text-purple-600",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white dark:bg-slate-900/60 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-rose-500/10 hover:-translate-y-2 transition-all duration-500"
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity"></div>

                <div
                  className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:rotate-6 transition-transform`}
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
        <div className="mx-4 md:mx-0">
          <div className="bg-rose-600 back-drop-b rounded-[3rem] p-8 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-rose-500/30">
            {/* Abstract Background Shapes */}
            <Droplets className="absolute -right-16 -bottom-16 w-64 h-64 text-white/10 rotate-12" />
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
                      className="flex items-center gap-3 justify-center lg:justify-start"
                    >
                      <div className="bg-white/20 p-1 rounded-full">
                        <CheckCircle2 size={18} className="text-rose-200" />
                      </div>
                      <span className="text-sm md:text-base font-medium">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20 text-center w-full max-w-sm shadow-inner transform hover:scale-105 transition-transform duration-500">
                <p className="text-rose-100 text-xs uppercase tracking-[0.2em] mb-4 font-black">
                  Total Community Heroes
                </p>
                <h3 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                  200+
                </h3>
                <div className="h-px w-12 bg-rose-300 mx-auto mb-6"></div>
                <p className="text-rose-100/90 italic text-sm leading-relaxed font-medium">
                  "Technology is just the tool. <br /> People are the heroes."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Footer Note --- */}
        <div className="mt-20 text-center px-4 pb-10">
          <p className="text-slate-400 dark:text-slate-600 text-xs md:text-sm font-medium">
            Developed with ❤️ for a better humanity.{" "}
            <br className="md:hidden" /> &copy; 2026 RedUnity Network.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
