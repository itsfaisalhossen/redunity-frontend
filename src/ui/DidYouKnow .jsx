import { FaHeartbeat, FaClock, FaHandsHelping } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";

const facts = [
  {
    icon: <MdBloodtype />,
    number: "1",
    text: "donation can save 3 lives",
  },
  {
    icon: <FaClock />,
    number: "2s",
    text: "every 2 seconds someone needs blood",
  },
  {
    icon: <FaHeartbeat />,
    number: "",
    text: "Safe & simple process supervised by professionals",
  },
  {
    icon: <FaHandsHelping />,
    number: "",
    text: "Strengthen community and create real impact",
  },
];

const DidYouKnow = () => {
  return (
    <section className="bg[#111] py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-10">
          Did You Know? <span className="text-red-600">Blood Facts</span>
        </h2>

        {/* Horizontal Carousel */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide py-4">
          {facts.map((fact, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-64 md:w-72 p-6 bg-black rounded-2xl border border-red-600/30 hover:bg-red-600/10 transition duration-300 cursor-pointer flex flex-col items-center text-center"
            >
              <div className="text-red-600 text-5xl mb-3">{fact.icon}</div>
              {fact.number && (
                <div className="text-4xl font-bold text-white mb-2">
                  {fact.number}
                </div>
              )}
              <p className="text-gray-300">{fact.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DidYouKnow;
