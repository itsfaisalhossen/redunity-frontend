import { Phone, Mail, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";
import Container from "./Container";

const ContactUsSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
  };
  return (
    <div>
      <Container>
        <section className="py-24 bg-white">
          <div>
            <div className="bg-gray-50 rounded-[40px] overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row">
              <div className="w-full md:w-2/5 bg-black p-10 md:p-16 text-white flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-red-100 mb-10 leading-relaxed">
                    Have questions or need urgent blood support? Reach out to
                    us, our team is ready to help you 24/7.
                  </p>

                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="text-red-500 text-xs font-bold uppercase tracking-widest">
                          Call Us
                        </p>
                        <p className="text-lg font-semibold">
                          +880 1234 567 890
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="text-red-500 text-xs font-bold uppercase tracking-widest">
                          Email Us
                        </p>
                        <p className="text-lg font-semibold">
                          support@bloodhero.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="text-red-500 text-xs font-bold uppercase tracking-widest">
                          Location
                        </p>
                        <p className="text-lg font-semibold">
                          Chattogram, Bangladesh
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative element */}
                <div className="mt-12 opacity-40 text-xs font-medium tracking-tighter uppercase leading-none select-none">
                  Blood Donor Network • Save Lives • Community
                </div>
              </div>
              <div className="w-full md:w-3/5 p-10 md:p-16 bg-white">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 transition-all outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 transition-all outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      Message
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Write your message here..."
                      className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 transition-all outline-none resize-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 shadow-lg shadow-red-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    Send Message <Send size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};
export default ContactUsSection;
