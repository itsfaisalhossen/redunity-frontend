import { FaUsers, FaHeart, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useEffect, useState } from "react";
import Container from "./Container";

const statsData = [
  {
    icon: <FaUsers />,
    label: "Donors Registered",
    value: 1500,
  },
  {
    icon: <FaHeart />,
    label: "Lives Saved",
    value: 4200,
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Cities Covered",
    value: 15,
  },
  {
    icon: <FaClock />,
    label: "Ongoing Donations",
    value: 120,
  },
];

const Counter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000; // 2 seconds
    const increment = Math.ceil(end / (duration / 50));
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(start);
    }, 50);

    return () => clearInterval(counter);
  }, [value]);

  return <span>{count.toLocaleString()}</span>;
};

const ImpactSection = () => {
  return (
    <section className="py-20">
      <Container>
        <div className="max-w-7xl mx-auto px-4 text-center">
          {/* Header */}
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Our <span className="text-red-600">Impact So Far</span>
          </h2>
          <p className="text-gray-400 mb-16 max-w-2xl mx-auto">
            Together we save lives and strengthen communities. See the real
            impact of your contributions.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {statsData.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-6 rounded-2xl bg-[#111] hover:bg-red-600/10 transition duration-300"
              >
                <div className="text-red-600 text-5xl mb-4">{stat.icon}</div>
                <h3 className="text-4xl font-bold text-white mb-2">
                  <Counter value={stat.value} />
                  {stat.label === "Cities Covered" ||
                  stat.label === "Ongoing Donations"
                    ? "+"
                    : ""}
                </h3>
                <p className="text-gray-400 text-center">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16">
            <button className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow-lg transition transform hover:-translate-y-1 duration-300">
              Join as a Donor
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ImpactSection;
