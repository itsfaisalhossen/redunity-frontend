/* eslint-disable no-undef */
import { Helmet } from "react-helmet";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import {
  Eye,
  Edit,
  Trash2,
  ArrowRight,
  Plus,
  List,
  MapPin,
  Droplets,
  CheckCircle2,
  Clock3,
  Activity,
  TrendingUp,
  User,
} from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

/* ─── tiny helpers ─────────────────────────────────────────────── */
const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const STATUS_META = {
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-400",
  },
  inprogress: {
    label: "In progress",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-400",
  },
  done: {
    label: "Done",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-400",
  },
  cancel: {
    label: "Cancelled",
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
    dot: "bg-red-400",
  },
};

const StatusBadge = ({ status }) => {
  const m = STATUS_META[status] ?? STATUS_META.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${m.bg} ${m.text} ${m.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
};

const BloodBadge = ({ group }) => (
  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
    <Droplets size={10} />
    {group}
  </span>
);

const Avatar = ({ name = "", size = "md" }) => {
  const sz =
    size === "sm"
      ? "w-7 h-7 text-[10px]"
      : size === "lg"
        ? "w-10 h-10 text-sm"
        : "w-8 h-8 text-xs";
  return (
    <span
      className={`${sz} rounded-full bg-rose-100 border border-rose-200 text-rose-700 font-semibold flex items-center justify-center shrink-0`}
    >
      {getInitials(name)}
    </span>
  );
};

/* ─── main component ───────────────────────────────────────────── */
const DonorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: lastRequest = [], isLoading } = useQuery({
    queryKey: ["last-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lastRequest-bloods?email=${user.email}`,
      );
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, delete",
      customClass: { popup: "!rounded-2xl" },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(
            `/lastRequest-bloods/${id}?email=${user.email}`,
          );
          queryClient.invalidateQueries(["last-requests", user.email]);
          Swal.fire({
            title: "Deleted",
            text: "Your request has been removed.",
            icon: "success",
            confirmButtonColor: "#e11d48",
            customClass: { popup: "!rounded-2xl" },
          });
        } catch {
          Swal.fire("Error", "Failed to delete the request.", "error");
        }
      }
    });
  };

  return (
    <div className="min-h-screen bgslate-50">
      <Helmet>
        <title>RedUnity | Donor Dashboard</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10 space-y-10">
        {/* ===== Dashboard Header ===== */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-rose-600 via-red-500 to-pink-600 p-6 md:p-8 shadow-xl">
          {/* Background Blur */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <img
                src={user?.photoURL || "https://i.ibb.co/2kRXX6q/user.png"}
                alt="user"
                className="w-16 h-16 rounded-2xl border-2 border-white/30 object-cover"
              />

              <div>
                <p className="text-white/80 text-sm font-medium">
                  Welcome back 👋
                </p>

                <h1 className="text-3xl font-black text-white">
                  {user?.displayName}
                </h1>

                <p className="text-white/70 text-sm mt-1">
                  Manage your blood donation activities easily.
                </p>

                <p className="text-xs text-white/60 mt-2">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/dashboard/create-donation-request"
                className="inline-flex items-center gap-2 bg-white text-rose-600 hover:bg-slate-100 font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
              >
                <Plus size={18} />
                Create Request
              </Link>

              <Link
                to="/dashboard/my-profile"
                className="px-5 md:px-6 py-2.5 md:py-3 rounded-lg border-2 border-white/20 bg-white/10 backdrop-blur-md text-white font-medium"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>

        {/* ── Recent requests table ── */}
        {isLoading ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center">
            <p className="text-slate-400 text-sm animate-pulse">
              Loading requests…
            </p>
          </div>
        ) : lastRequest.length > 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            {/* section header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Droplets size={18} className="text-rose-500" />
                <h2 className="text-sm font-bold text-slate-700">
                  Recent donation requests
                </h2>
                <span className="text-[11px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                  {lastRequest.length}
                </span>
              </div>
              <Link
                to="/dashboard/my-donation-requests"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors"
              >
                View all <ArrowRight size={13} />
              </Link>
            </div>

            {/* table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-widest font-semibold">
                    <th className="px-6 py-3 text-left">Recipient</th>
                    <th className="px-6 py-3 text-left">Location</th>
                    <th className="px-6 py-3 text-left">Date & time</th>
                    <th className="px-6 py-3 text-left">Blood</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Donor</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {lastRequest.map((req) => (
                    <tr
                      key={req._id}
                      className="hover:bg-rose-50/30 transition-colors"
                    >
                      {/* recipient */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={req.recipientName ?? req.name} />
                          <span className="font-semibold text-slate-700 text-sm">
                            {req.recipientName ?? req.name}
                          </span>
                        </div>
                      </td>

                      {/* location */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                          <MapPin size={12} className="text-rose-400" />
                          {req.upazilaName}, {req.districtName}
                        </div>
                      </td>

                      {/* date & time */}
                      <td className="px-6 py-4">
                        <p className="text-xs font-semibold text-slate-700">
                          {new Date(req.dateTime).toLocaleDateString("en-GB")}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {new Date(req.dateTime).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </td>

                      {/* blood group */}
                      <td className="px-6 py-4">
                        <BloodBadge group={req.bloodGroup} />
                      </td>

                      {/* status */}
                      <td className="px-6 py-4">
                        <StatusBadge status={req.status} />
                      </td>

                      {/* donor info */}
                      <td className="px-6 py-4">
                        {req.status === "inprogress" ||
                        req.status === "done" ? (
                          <div className="flex items-center gap-2">
                            <Avatar name={req.donorName ?? "?"} size="sm" />
                            <div>
                              <p className="text-[11px] font-semibold text-slate-700 leading-none">
                                {req.donorName ?? "Assigned"}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-0.5">
                                {req.donorEmail}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-200 text-xs tracking-widest">
                            ———
                          </span>
                        )}
                      </td>

                      {/* actions */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center gap-2">
                          {/* icon row */}
                          <div className="flex items-center gap-1">
                            <Link
                              to={`/dashboard/view-details-donation/${req._id}`}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                              title="View"
                            >
                              <Eye size={15} />
                            </Link>
                            <Link
                              to={`/dashboard/update-donation-request/${req._id}`}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                              title="Edit"
                            >
                              <Edit size={15} />
                            </Link>
                            <button
                              onClick={() => handleDelete(req._id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* mobile view-all link */}
            <div className="sm:hidden px-6 py-4 border-t border-slate-100 text-center">
              <Link
                to="/dashboard/my-donation-requests"
                className="text-rose-600 font-semibold text-sm flex items-center justify-center gap-1.5"
              >
                View all requests <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          /* ── Empty state ── */
          <div className="bg-white border-2 border-dashed border-rose-100 rounded-2xl py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto mb-4">
              <Droplets size={24} className="text-rose-300" />
            </div>
            <p className="text-slate-400 font-semibold text-sm mb-1">
              No donation requests yet
            </p>
            <p className="text-slate-300 text-xs mb-5">
              Create your first request to get started.
            </p>
            <Link
              to="/dashboard/create-donation-request"
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              <Plus size={15} />
              Create a request
            </Link>
          </div>
        )}

        {/* ── Quick actions ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to="/dashboard/create-donation-request"
            className="group bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 hover:border-rose-200 hover:shadow-sm hover:shadow-rose-50 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-100 transition-colors flex-shrink-0">
              <Plus size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700">New request</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Create a blood donation request
              </p>
            </div>
            <ArrowRight
              size={16}
              className="ml-auto text-slate-300 group-hover:text-rose-400 transition-colors"
            />
          </Link>

          <Link
            to="/dashboard/my-donation-requests"
            className="group bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 hover:border-blue-200 hover:shadow-sm hover:shadow-blue-50 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-100 transition-colors flex-shrink-0">
              <List size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700">All requests</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Browse your full donation history
              </p>
            </div>
            <ArrowRight
              size={16}
              className="ml-auto text-slate-300 group-hover:text-blue-400 transition-colors"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
