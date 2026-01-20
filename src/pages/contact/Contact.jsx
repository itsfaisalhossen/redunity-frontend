import { Phone, Mail, MapPin, Send, MessageCircle, Heart } from "lucide-react";
import Container from "../../ui/Container";
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";
import ContactLottie from "../../animationLotties/contactus.json";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message Sent");
  };

  return (
    <div className="dark:bg-primary-dark min-h-screen transition-colors duration-300">
      <Helmet>
        <title>RedUnity | Contact Us</title>
      </Helmet>

      {/* --- New Unique Hero Section --- */}
      <div className="relative overflow-hidden dark:bg-primary-dark py-12 md:py-24">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Left Content */}
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-bold tracking-wide">
                <MessageCircle size={16} />
                <span>WE ARE HERE FOR YOU</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-800 dark:text-white leading-tight">
                Let's Start a <br className="hidden sm:block" />
                <span className="text-rose-600">Conversation</span>
              </h1>
              <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
                Whether you have a question about blood donation, need technical
                support, or just want to share your hero story—we're all ears.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 overflow-hidden"
                    >
                      <img
                        src={`https://i.pravatar.cc/150?u=${i + 10}`}
                        alt="Support Team"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Our support team is{" "}
                  <span className="text-green-500 font-bold underline">
                    Online
                  </span>
                </p>
              </div>
            </div>

            {/* Right Lottie Area */}
            <div className="w-full md:w-1/2 relative order-1 md:order-2 flex justify-center">
              <div className="relative z-10 w-full max-w-[320px] sm:max-w-100 md:max-w-none transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-auto">
                  <Lottie animationData={ContactLottie} loop={true} />
                </div>
              </div>

              {/* Floating Badge - Hidden on very small screens or positioned carefully */}
              <div className="absolute w-75 max-sm:hidden -bottom-4 right-4 md:-bottom-6 md:-left-6 z-20 bg-red-50 back-drop-b text-center p-4 md:p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-bounce-slow">
                <div className="flex items-center justify-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-rose-600 rounded-xl text-white">
                    <Heart size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-slate-400 uppercase font-bold">
                      Quick Response
                    </p>
                    <p className="text-sm md:text-lg font-bold text-slate-800 dark:text-white">
                      Under 24 Hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* --- Main Contact Section --- */}
      <Container>
        <section className="py-12 md:py-20 px-4 md:px-0">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white mb-4">
              Send Us a <span className="text-rose-600">Message</span>
            </h2>
            <div className="w-20 h-1.5 bg-rose-600 mx-auto rounded-full"></div>
          </div>

          <div className="bg-gray-50 rounded-[30px] md:rounded-[40px] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row">
            {/* Left Side: Contact Information */}
            <div className="w-full md:w-2/5 bg-black p-8 md:p-16 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Contact Info
                </h2>
                <p className="text-red-100/80 mb-10 leading-relaxed text-sm md:text-base">
                  Have questions or need urgent blood support? Reach out to us,
                  our team is ready to help you 24/7.
                </p>

                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-md">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                        Call Us
                      </p>
                      <p className="text-base md:text-lg font-semibold">
                        +880 1234 567 890
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-md">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                        Email Us
                      </p>
                      <p className="text-base md:text-lg font-semibold break-all">
                        support@bloodhero.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-md">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                        Location
                      </p>
                      <p className="text-base md:text-lg font-semibold">
                        Chattogram, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 hidden md:block opacity-40 text-[10px] font-medium tracking-tighter uppercase leading-none select-none">
                Blood Donor Network • Save Lives • Community
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="w-full md:w-3/5 p-8 md:p-16 dark:bg-primary-dark bg-white">
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-5 py-3 md:py-4 bg-gray-50 back-drop-b dark:text-white border border-transparent rounded-xl md:rounded-2xl focus:ring-2 focus:ring-red-500 transition-all outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="back-drop-b w-full px-5 py-3 md:py-4 bg-gray-50 dark:bg-gray-950 dark:text-white border border-transparent rounded-xl md:rounded-2xl focus:ring-2 focus:ring-red-500 transition-all outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="back-drop-b w-full px-5 py-3 md:py-4 bg-gray-50 dark:bg-gray-950 dark:text-white border border-transparent rounded-xl md:rounded-2xl focus:ring-2 focus:ring-red-500 transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Write your message here..."
                    className="back-drop-b w-full px-5 py-3 md:py-4 bg-gray-50 dark:bg-gray-950 dark:text-white border border-transparent rounded-xl md:rounded-2xl focus:ring-2 focus:ring-red-500 transition-all outline-none resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-red-700 text-white font-bold rounded-xl md:rounded-2xl hover:bg-red-800 shadow-lg shadow-red-100 dark:shadow-none transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Contact;
