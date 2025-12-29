import { Users, Banknote, Droplet, Home } from "lucide-react";
import { Helmet } from "react-helmet";

const AdminDashboard = () => {
  // Mock data for the statistics
  const stats = [
    {
      id: 1,
      title: "Total Users (Donors)",
      count: "150,000+",
      icon: <Users className="w-6 h-6 text-white" />,
      bgColor: "bg-red-600",
    },
    {
      id: 2,
      title: "Total Funding",
      count: "$2.5M+",
      icon: <Banknote className="w-6 h-6 text-white" />,
      bgColor: "bg-zinc-900", // Black/Zinc card
    },
    {
      id: 3,
      title: "Blood Donation Requests",
      count: "50,000+",
      icon: <Droplet className="w-6 h-6 text-white" />,
      bgColor: "bg-red-600",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto my-12 md:my-22 p-5 md:p-8">
      {/* Welcome Section */}
      <Helmet>
        <title>RedUnity | Admin Dashboard</title>
      </Helmet>
      <header
        data-aos="fade-down"
        className="relative overflow-hidden bg-white rounded-xl p-8 mb-10 shadow-sm transition-all hover:shadow-md border-t-5 border-red-400"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <Home size={20} />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Dashboard Home Page
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">
              Welcome Back, <span className="text-red-600">Admin</span> 👋
            </h1>
            <p className="text-gray-500 mt-1 text-lg">
              Manage your donations and community impact.
            </p>
          </div>

          <div className="bg-zinc-100 px-4 py-2 rounded-full border border-zinc-200">
            <code className="text-sm font-mono text-zinc-600">
              Route: /dashboard
            </code>
          </div>
        </div>
      </header>
      {/* Statistics Cards */}
      <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item) => (
          <div
            key={item.id}
            className={`${item.bgColor} rounded-2xl p-8 shadow-xl transform transition-transform hover:-translate-y-2 duration-300 flex flex-col items-center text-center`}
          >
            <div className="bg-white/20 p-4 rounded-full mb-4 backdrop-blur-sm">
              {item.icon}
            </div>
            <h3 className="text-white/80 text-sm font-bold uppercase tracking-widest mb-2">
              {item.title}
            </h3>
            <p className="text-4xl font-black text-white italic">
              {item.count}
            </p>

            {/* Modern Graphic Element */}
            <div className="w-12 h-1 bg-white/30 mt-6 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
