import { UserPlus, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import Container from "./Container";

const JoinUs = () => {
  return (
    <section className="py-16 md:py-24 transition-colors duration-300">
      <Container>
        <div className="relative bg-rose-600 back-drop-b rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-2xl shadow-rose-200 dark:shadow-none">
          {/* Background Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-900/20 rounded-full -ml-20 -mb-20 blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-bold uppercase tracking-widest">
                <Heart size={16} className="fill-white" />
                <span>Become a Life Saver</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Ready to save lives? <br />
                <span className="text-rose-100">Join our community today.</span>
              </h2>

              <p className="text-rose-50 text-lg opacity-90">
                Register as a blood donor and be the reason for someone's
                heartbeat. Your simple act of kindness can make a world of
                difference.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <Link
                to="/register"
                className="w-full sm:w-auto px-10 py-5 bg-white text-rose-600 font-bold rounded-2xl shadow-xl hover:bg-rose-50 transition-all flex items-center justify-center gap-2 group"
              >
                <UserPlus size={20} />
                Register Now
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                to="/about"
                className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Impact Stats (Optional) */}
          <div className="mt-12 pt-8 border-t border-white/20 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Active Donors", value: "2.5k+" },
              { label: "Lives Saved", value: "10k+" },
              { label: "Cities covered", value: "45+" },
              { label: "Success Rate", value: "99.9%" },
            ].map((stat, i) => (
              <div key={i} className="text-white">
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-xs text-rose-200 uppercase font-bold tracking-tighter">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default JoinUs;
