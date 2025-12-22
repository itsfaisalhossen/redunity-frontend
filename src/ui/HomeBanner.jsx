import { useNavigate } from "react-router";
import { Heart, Search } from "lucide-react";

const HomeBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-12 flex items-center justify-center overflow-hidden bg-white">
      {/* Background Decorative Elements - Red Shades */}
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-70"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex my-20 items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-6 border border-red-300">
          <Heart size={16} fill="currentColor" />
          <span>Save a Life, Donate Blood</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
          Your Small Effort Can <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-400">
            Bring a New Life
          </span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl mb-10 leading-relaxed">
          Connecting heroes with those in need. Join our community of lifesavers
          or find a donor near you instantly.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Join as Donor Button */}
          <button
            onClick={() => navigate("/auth/register")}
            className="group relative px-8 py-4 bg-red-600 text-white font-bold rounded-2xl transition-all duration-300 hover:bg-red-700 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.3)] active:scale-95 flex items-center gap-2"
          >
            Join as a Donor
            <Heart size={18} className="group-hover:animate-bounce" />
          </button>

          {/* Search Donor Button */}
          <button
            onClick={() => navigate("/search-donation")}
            className="px-8 py-4 bg-white text-gray-800 font-bold rounded-2xl border-2 border-gray-100 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95 flex items-center gap-2"
          >
            Search Donors
            <Search size={18} />
          </button>
        </div>

        {/* Floating Stats or Minimal Info */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-center gap-8 md:gap-16">
          <div className="text-center">
            <h4 className="text-2xl font-bold text-gray-800">24/7</h4>
            <p className="text-gray-400 text-sm">Emergency Support</p>
          </div>
          <div className="text-center">
            <h4 className="text-2xl font-bold text-gray-800">100%</h4>
            <p className="text-gray-400 text-sm">Free Service</p>
          </div>
          <div className="text-center">
            <h4 className="text-2xl font-bold text-gray-800">Secure</h4>
            <p className="text-gray-400 text-sm">Donor Privacy</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
