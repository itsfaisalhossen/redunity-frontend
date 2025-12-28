/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  MoreVertical,
  UserCheck,
  UserX,
  ShieldCheck,
  UserPlus,
  Filter,
  Users,
} from "lucide-react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    AOS.init({
      delay: 40,
      duration: 600,
    });
  }, []);

  // ১. ইউজার ডাটা ফেচ করা
  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const [filter, setFilter] = useState("all");
  const [openMenuId, setOpenMenuId] = useState(null);

  // ২. আপডেট করার ফাংশন (Mutation)
  const { mutate: updateUser } = useMutation({
    mutationFn: async ({ id, updateData }) => {
      const res = await axiosSecure.patch(`/users/${id}`, updateData);
      return res.data;
    },
    onSuccess: () => {
      refetch(); // ডাটাবেস আপডেট হলে টেবিল রিফ্রেশ করবে
      setOpenMenuId(null); // মেনু বন্ধ করবে
      Swal.fire({
        icon: "success",
        title: "Success!",
        background: "#020617",
        width: 350,
        color: "#f8fafc",
        text: "User updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const handleStatusChange = (id, newStatus) => {
    updateUser({ id, updateData: { status: newStatus } });
  };

  const handleRoleChange = (id, newRole) => {
    updateUser({ id, updateData: { role: newRole } });
  };

  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    return user.status === filter;
  });

  return (
    <div className="max-w-6xl mx-auto my-12 md:my-22 p-5 md:p-8">
      {/* Header Section */}
      <div
        data-aos="fade-down"
        className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 p-8 rounded-xl shadow-md backdrop-blur-sm border-t-5 border-red-400"
      >
        <div className="flex items-center gap-5">
          <div className="p-4 lg:p-6 bg-red-600/10 rounded-2xl border border-red-600/20">
            <Users size={32} className="text-red-500" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">
              User <span className="text-red-600">Management</span>
            </h1>
            <p className="text-black font-mono text-sm mt-1">
              Route: /dashboard/all-users
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-black transition-all bg-white">
          <Filter size={18} className="text-red-500" />
          <select
            className="px-8 py-2.5 bg-white border border-rose-100 text-gray-700 rounded-xl font-medium shadow-sm focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all cursor-pointer hover:border-rose-300"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option className="bg-white text-black" value="all">
              ALL STATUS
            </option>
            <option className="bg-white text-black" value="Active">
              ACTIVE
            </option>
            <option className="bg-white text-black" value="Blocked">
              BLOCKED
            </option>
          </select>
        </div>
      </div>

      <div
        data-aos="fade-up"
        className="bg-zinc900/30 rounded-3xl border border-gray-300 shadow-xl overflow-hidden backdrop-blur-md"
      >
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-6 px-8 font-bold uppercase text-[11px] tracking-[0.2em] text-black">
                  User Details
                </th>
                <th className="py-6 px-8 font-bold uppercase text-[11px] tracking-[0.2em] text-black">
                  Access Level
                </th>
                <th className="py-6 px-8 font-bold uppercase text-[11px] tracking-[0.2em] text-black">
                  Account Status
                </th>
                <th className="py-6 px-8 font-bold uppercase text-[11px] tracking-[0.2em] text-black text-right">
                  Control
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="group hover:bg-zinc-100 transition-all duration-300"
                >
                  <td className="py-6 px-8">
                    <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
                      <div className="relative shrink-0">
                        <img
                          src={user.image}
                          alt=""
                          className="w-10 h-10 lg:w-13 lg:h-13 rounded-full object-cover border-2 border-zinc-700 group-hover:border-red-600 transition-colors"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white ${
                            user.status === "Active"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-black text-base lg:text-lg group-hover:text-red-500 transition-colors truncate">
                          {user.name}
                        </div>
                        <div className="text-zinc-600 text-xs lg:text-sm font-medium truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <span
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                        user.role === "Admin"
                          ? "bg-red-600/10 border-red-600/50 text-red-500"
                          : "bg-zinc-800 border-zinc-700 text-white"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-6 px-8">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                        user.status === "Active"
                          ? "text-green-500 bg-green-500/5"
                          : "text-red-500 bg-red-500/5"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                          user.status === "Active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      {user.status.toUpperCase()}
                    </div>
                  </td>
                  <td className="py-6 px-8 text-right relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === user._id ? null : user._id)
                      }
                      className="p-3 hover:bg-red-600 rounded-xl transition-all duration-300 text-zinc-400 hover:text-white group-hover:bg-zinc-800"
                    >
                      <MoreVertical size={20} />
                    </button>
                    {openMenuId === user._id && (
                      <div className="absolute right-12 top-10 w-56 bg-zinc-900 border border-zinc-700 shadow-2xl rounded-2xl z-50 py-3 overflow-hidden text-left">
                        <button
                          onClick={() =>
                            handleStatusChange(
                              user._id,
                              user.status === "Active" ? "Blocked" : "Active"
                            )
                          }
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold transition-colors ${
                            user.status === "Active"
                              ? "text-red-500 hover:bg-red-600/10"
                              : "text-green-500 hover:bg-green-600/10"
                          }`}
                        >
                          {user.status === "Active" ? (
                            <>
                              <UserX size={18} /> Block Account
                            </>
                          ) : (
                            <>
                              <UserCheck size={18} /> Restore Access
                            </>
                          )}
                        </button>
                        <div className="h-px bg-zinc-800 my-2 mx-4"></div>
                        <button
                          onClick={() =>
                            handleRoleChange(user._id, "Volunteer")
                          }
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 font-semibold transition-colors"
                        >
                          <UserPlus size={18} className="text-red-500" />{" "}
                          Promote to Volunteer
                        </button>
                        <button
                          onClick={() => handleRoleChange(user._id, "Admin")}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-100 hover:bg-red-600 font-black transition-all"
                        >
                          <ShieldCheck size={18} /> Assign Admin Role
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-zinc-200 bg-white">
          {filteredUsers.map((user) => (
            <div key={user._id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={user.image}
                    className="w-12 h-12 rounded-xl border border-zinc-200 object-cover"
                    alt=""
                  />
                  <div>
                    <div className="font-bold text-black text-base">
                      {user.name}
                    </div>
                    <div className="text-zinc-500 text-xs truncate max-w-[150px]">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === user._id ? null : user._id)
                    }
                    className="p-2 bg-zinc-100 rounded-lg text-zinc-600"
                  >
                    <MoreVertical size={18} />
                  </button>
                  {openMenuId === user._id && (
                    <div className="absolute right-0 top-10 w-48 bg-zinc-900 border border-zinc-700 shadow-2xl rounded-xl z-50 py-2">
                      <button
                        onClick={() =>
                          handleStatusChange(
                            user._id,
                            user.status === "Active" ? "Blocked" : "Active"
                          )
                        }
                        className={`w-full text-left px-4 py-2 text-xs font-bold ${
                          user.status === "Active"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {user.status === "Active"
                          ? "Block Account"
                          : "Unblock Account"}
                      </button>
                      <button
                        onClick={() => handleRoleChange(user._id, "Volunteer")}
                        className="w-full text-left px-4 py-2 text-xs text-zinc-300 font-bold"
                      >
                        Make Volunteer
                      </button>
                      <button
                        onClick={() => handleRoleChange(user._id, "Admin")}
                        className="w-full text-left px-4 py-2 text-xs text-white bg-red-600 font-bold"
                      >
                        Make Admin
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center bg-zinc-50 p-2 rounded-lg">
                <span className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">
                  {user.role}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {user.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
