import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  MoreVertical,
  UserCheck,
  UserX,
  ShieldCheck,
  UserPlus,
  Filter,
} from "lucide-react";

const AllUsers = () => {
  useEffect(() => {
    AOS.init({
      delay: 40,
      duration: 600,
    });
  }, []);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Arif Rahman",
      email: "arif@example.com",
      role: "Donor",
      status: "active",
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    {
      id: 2,
      name: "Sarah Khan",
      email: "sarah@example.com",
      role: "Volunteer",
      status: "blocked",
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    {
      id: 3,
      name: "Tanvir Ahmed",
      email: "tanvir@example.com",
      role: "Donor",
      status: "active",
      avatar: "https://i.pravatar.cc/150?u=3",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [openMenuId, setOpenMenuId] = useState(null);

  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    return user.status === filter;
  });

  const handleStatusChange = (id, newStatus) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: newStatus } : u)));
    setOpenMenuId(null);
  };

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    setOpenMenuId(null);
  };

  return (
    <div className="max-w-6xl mx-auto my-12 md:my-22 p-5 md:p-8">
      {/* Header Section */}
      <div
        data-aos="fade-up"
        className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">
            All Users <span className="text-red-600">👤</span>
          </h1>
          <p className="text-gray-500 italic text-sm mt-1">
            Route: /dashboard/all-users
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
          <Filter size={18} className="text-red-600" />
          <select
            className="bg-transparent focus:outline-none text-sm font-medium cursor-pointer"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900 text-white">
            <tr>
              {/* Increased Header Padding */}
              <th className="py-5 px-6 font-semibold uppercase text-xs tracking-wider">
                User
              </th>
              <th className="py-5 px-6 font-semibold uppercase text-xs tracking-wider">
                Email
              </th>
              <th className="py-5 px-6 font-semibold uppercase text-xs tracking-wider">
                Role
              </th>
              <th className="py-5 px-6 font-semibold uppercase text-xs tracking-wider">
                Status
              </th>
              <th className="py-5 px-6 font-semibold uppercase text-xs tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className={`hover:bg-gray-50 transition-colors relative ${
                  openMenuId === user.id ? "z-50" : "z-0"
                }`}
              >
                <td className="py-7 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt=""
                      className="w-12 h-12 rounded-full border-2 border-red-500 p-0.5 shadow-sm"
                    />
                    <span className="font-bold text-zinc-800">{user.name}</span>
                  </div>
                </td>
                <td className="py-7 px-6 text-gray-600 text-sm font-medium">
                  {user.email}
                </td>
                <td className="py-7 px-6">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                      user.role === "Admin"
                        ? "bg-red-100 text-red-700"
                        : "bg-zinc-100 text-zinc-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-7 px-6">
                  <span
                    className={`flex items-center gap-2 text-xs font-bold uppercase ${
                      user.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        user.status === "active" ? "bg-green-600" : "bg-red-600"
                      }`}
                    ></span>
                    {user.status}
                  </span>
                </td>

                {/* Action TD with proper Z-Index stacking */}
                <td className="py-7 px-6 text-right relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === user.id ? null : user.id)
                    }
                    className="p-2.5 hover:bg-zinc-100 rounded-full transition-colors text-gray-400 hover:text-zinc-900"
                  >
                    <MoreVertical size={22} />
                  </button>

                  {openMenuId === user.id && (
                    <div className="absolute right-6 top-16 w-52 bg-white border border-gray-200 shadow-2xl rounded-xl z-[999] py-2 animate-in fade-in zoom-in duration-200">
                      {user.status === "active" ? (
                        <button
                          onClick={() => handleStatusChange(user.id, "blocked")}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium"
                        >
                          <UserX size={18} /> Block User
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(user.id, "active")}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-green-600 hover:bg-green-50 font-medium"
                        >
                          <UserCheck size={18} /> Unblock User
                        </button>
                      )}
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={() => handleRoleChange(user.id, "Volunteer")}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-gray-100 font-medium"
                      >
                        <UserPlus size={18} /> Make Volunteer
                      </button>
                      <button
                        onClick={() => handleRoleChange(user.id, "Admin")}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-gray-100 font-bold"
                      >
                        <ShieldCheck size={18} className="text-red-600" /> Make
                        Admin
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div className="py-20 text-center text-gray-400 font-medium">
            No users found with this status.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
