import { Container } from "lucide-react";
import { FaMapMarkerAlt, FaTint } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

const EmergencyRequests = () => {
  // Dummy data (later replace with API)
  const requests = [
    {
      id: 1,
      bloodGroup: "A+",
      location: "Dhaka Medical College",
      urgency: "High",
      date: "10 Jan 2026",
    },
    {
      id: 2,
      bloodGroup: "O-",
      location: "Chattogram",
      urgency: "Critical",
      date: "09 Jan 2026",
    },
    {
      id: 3,
      bloodGroup: "B+",
      location: "Rajshahi",
      urgency: "Medium",
      date: "08 Jan 2026",
    },
    {
      id: 4,
      bloodGroup: "AB+",
      location: "Sylhet",
      urgency: "High",
      date: "07 Jan 2026",
    },
  ];

  const urgencyColor = (level) => {
    if (level === "Critical") return "bg-red-700";
    if (level === "High") return "bg-red-600";
    return "bg-red-500/70";
  };

  return (
    <section className="bg[#0b0b0b] py-16">
      <Container>
        <div>
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Emergency <span className="text-red-600">Blood Requests</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
              Real people need blood right now. Your quick response can save
              lives.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-black border border-red-600/30 rounded-xl p-6 hover:border-red-600 transition duration-300"
              >
                {/* Blood Group */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-red-600">
                    <FaTint className="text-xl" />
                    <span className="text-2xl font-bold text-white">
                      {req.bloodGroup}
                    </span>
                  </div>

                  <span
                    className={`text-xs text-white px-3 py-1 rounded-full ${urgencyColor(
                      req.urgency
                    )}`}
                  >
                    {req.urgency}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <FaMapMarkerAlt />
                  <span>{req.location}</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MdAccessTime />
                  <span>{req.date}</span>
                </div>

                {/* Action */}
                <button
                  onClick={() => alert("Please login to view request details")}
                  className="mt-6 w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition duration-300">
              View All Requests
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default EmergencyRequests;
