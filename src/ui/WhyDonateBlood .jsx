import { FaHeartbeat, FaClock, FaHandsHelping } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import Container from "./Container";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { Heart } from "lucide-react";

const cards = [
  {
    icon: <MdBloodtype />,
    title: "Save 3 Lives",
    desc: "One blood donation can help save up to three lives in emergency situations.",
  },
  {
    icon: <FaClock />,
    title: "Every 2 Seconds",
    desc: "Someone, somewhere needs blood every two seconds. Your help matters.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Safe & Simple",
    desc: "Blood donation is a safe, simple, and quick process supervised by professionals.",
  },
  {
    icon: <FaHandsHelping />,
    title: "Community Impact",
    desc: "Donating blood strengthens communities and creates real human connections.",
  },
];

const WhyDonateBlood = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <section className="py-16 md:py-28 relative overflow-hidden">
      <Container>
        {/* Header */}
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-4xl md:text-5xl text-black font-extrabold tracking-tight">
            Why <span className="text-red-600">Blood Donation</span> Matters
          </h2>
          <p className="text-gray-700 dark:text-white/80 mt-4 max-w-2xl mx-auto">
            Your single act of kindness can save lives, strengthen communities,
            and bring hope to those in urgent need.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group relative p-6 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-red-600/20 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-500 cursor-pointer overflow-hidden"
            >
              {/* Animated Glow */}
              <div className="absolute inset-0 bg-red-600/10 rounded-3xl opacity-0 group-hover:opacity-40 blur-xl transition duration-500 pointer-events-none"></div>

              {/* Icon */}
              <div className="text-red-600 text-5xl mb-4 flex justify-center items-center">
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2 text-center">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-center text-sm">{card.desc}</p>

              {/* Step Number Circle */}
              <div className="absolute -top-5 -right-5 w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold shadow-lg">
                {idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 flex justify-center relative z-10">
          {user ? (
            <>
              <button
                onClick={() => navigate("/donation-requests")}
                className="group relative px-8 py-4 bg-red-600 text-white font-bold rounded-2xl transition-all duration-300 hover:bg-red-700 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.3)] active:scale-95 flex items-center gap-2"
              >
                Donation Requests
                <Heart size={18} className="group-hover:animate-bounce" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/auth/register")}
                className="group relative px-8 py-4 bg-red-600 text-white font-bold rounded-2xl transition-all duration-300 hover:bg-red-700 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.3)] active:scale-95 flex items-center gap-2"
              >
                Join as a Donor
                <Heart size={18} className="group-hover:animate-bounce" />
              </button>
            </>
          )}
        </div>
      </Container>
    </section>
  );
};

export default WhyDonateBlood;
