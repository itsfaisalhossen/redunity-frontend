import { FaUserPlus, FaSearch, FaHandshake, FaHeartbeat } from "react-icons/fa";
import Container from "./Container";
import useAuth from "../hooks/useAuth";
import { Heart } from "lucide-react";
import BtnPrimary from "./BtnPrimary";
import BtnOutLine from "./BtnOutline";

const steps = [
  {
    id: "01",
    title: "Register as a Donor",
    desc: "Create your donor profile and make yourself available to save lives.",
    icon: <FaUserPlus />,
  },
  {
    id: "02",
    title: "Find Blood Requests",
    desc: "Browse emergency blood requests near your location in real time.",
    icon: <FaSearch />,
  },
  {
    id: "03",
    title: "Connect with Recipient",
    desc: "Communicate securely and confirm donation details with recipients.",
    icon: <FaHandshake />,
  },
  {
    id: "04",
    title: "Donate & Save Lives",
    desc: "Donate blood and become a real-life hero in your community.",
    icon: <FaHeartbeat />,
  },
];

const HowItWorks = () => {
  const { user } = useAuth();
  return (
    <section className="relative dark:bg-primary-dark bg-linearto-b from-black via[#0c0c0c] toblack py-20 overflow-hidden">
      <Container>
        {/* Glow Background */}
        <div className="absolute inset-0 bg[radial-gradient(circle_at_top,rgba(220,38,38,0.15),transparent_60%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black dark:text-white tracking-tight">
              How It <span className="text-red-600">Works</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              A simple, transparent process designed to build trust and save
              lives efficiently.
            </p>
          </div>

          {/* Steps Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {steps.map((step) => (
              <div
                key={step.id}
                className="group relative bg-white/5 backdropblur-xl border border-black/10 dark:border-white/10 rounded-2xl p-8 hover:border-red-600/60 transition duration-500"
              >
                {/* Step Number */}
                <span className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.id}
                </span>

                {/* Icon */}
                <div className="text-4xl text-red-600 group-hover:text-black dark:group-hover:text-white transition mb-6">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-black dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 group-hover:text-gray-600  dakr:group-hover:text-gray-200 transition">
                  {step.desc}
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-r from-red-600/10 to-transparent pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10 md:mt-14">
             {user ? (
            <>
                <BtnPrimary text={'Donation Requests'} link={'/donation-requests'}/>
            </>
          ) : (
            <>
                <BtnPrimary text={'Become a Donor'} link={'/auth/register'}/>
            </>
          )}
            <BtnOutLine text={'Search Blood'} link={'/donation-requests'}/> 
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
