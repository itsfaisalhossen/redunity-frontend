import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import {
  Edit,
  Eye,
  Trash2,
  User,
  Droplets,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import Swal from "sweetalert2";

/* ── helpers ── */
const STATUS_META = {
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-400",
    icon: AlertCircle,
  },
  inprogress: {
    label: "In Progress",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-400",
    icon: Loader2,
  },
  done: {
    label: "Done",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-400",
    icon: CheckCircle2,
  },
  cancel: {
    label: "Cancelled",
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
    dot: "bg-red-400",
    icon: XCircle,
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

const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const Avatar = ({ name = "" }) => (
  <span className="w-7 h-7 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-[10px] font-bold flex items-center justify-center shrink-0">
    {getInitials(name)}
  </span>
);

const FILTER_OPTS = [
  { value: "", label: "All", color: "text-slate-600" },
  { value: "pending", label: "Pending", color: "text-amber-600" },
  { value: "inprogress", label: "In Progress", color: "text-blue-600" },
  { value: "done", label: "Done", color: "text-emerald-600" },
  { value: "cancel", label: "Cancelled", color: "text-red-600" },
];

/* ════════════════════════════════════════════════ */
const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: response = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-requests", user?.email, currentPage, filter],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-requests/${user?.email}?page=${currentPage}&size=${itemsPerPage}&status=${filter}`,
      );
      return res.data;
    },
  });

  const requests = response.data || [];
  const totalCount = response.totalCount || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  /* derived mini-stats */
  const allReqs = response.allData || requests;
  const statDone = allReqs.filter((r) => r.status === "done").length;
  const statProg = allReqs.filter((r) => r.status === "inprogress").length;
  const statPend = allReqs.filter((r) => r.status === "pending").length;

  /* handlers */
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
          queryClient.invalidateQueries(["my-requests", user.email]);
          Swal.fire({
            title: "Deleted",
            text: "Request removed.",
            icon: "success",
            confirmButtonColor: "#e11d48",
            customClass: { popup: "!rounded-2xl" },
          });
        } catch {
          Swal.fire("Error", "Failed to delete.", "error");
        }
      }
    });
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/bloods/${id}`, {
        donorName: user?.displayName,
        donorEmail: user?.email,
        status,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: `Status changed to ${status}.`,
          icon: "success",
          confirmButtonColor: "#e11d48",
          customClass: { popup: "!rounded-2xl" },
        });
        refetch();
      }
    } catch (err) {
      console.error("Status update error", err);
    }
  };

  const goPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
  };

  /* page numbers to show */
  const pageNums = () => {
    const pages = [];
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10 space-y-8 md:space-y-10">
        {/* ── Page header ── */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-rose-600 via-red-500 to-pink-600 shadow-xl shadow-rose-200 p-6 md:p-10">
          {/* blobs */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          {/* dot grid */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle,white 1px,transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-white/70 text-sm font-medium mb-1 flex items-center gap-1.5">
                <Droplets size={14} /> Blood donation
              </p>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                My Donation Requests
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Track and manage all your blood donation requests.
              </p>
            </div>
            <Link
              to="/dashboard/create-donation-request"
              className="inline-flex items-center gap-2 bg-white text-rose-600 hover:bg-rose-50 max-sm:text-sm cursor-pointer font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-lg shadow-md transition-all self-start sm:self-auto"
            >
              <Plus size={16} /> New request
            </Link>
          </div>

          {/* mini stat row */}
          <div className="relative mt-6 grid grid-cols-3 gap-3">
            {[
              {
                label: "Completed",
                value: statDone,
                color: "bg-white/15",
                dot: "bg-emerald-300",
              },
              {
                label: "In progress",
                value: statProg,
                color: "bg-white/15",
                dot: "bg-blue-300",
              },
              {
                label: "Pending",
                value: statPend,
                color: "bg-white/15",
                dot: "bg-amber-300",
              },
            ].map(({ label, value, color, dot }) => (
              <div
                key={label}
                className={`${color} backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                  <p className="text-white/70 text-[11px] font-medium">
                    {label}
                  </p>
                </div>
                <p className="text-white text-xl font-black">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Filter bar ── */}
        <div className="bg-white border border-slate-100 rounded-2xl px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <Filter size={15} />
            <span className="text-sm font-semibold text-slate-600">
              Filter by status
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setFilter(opt.value);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200
                  ${
                    filter === opt.value
                      ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-100"
                      : "bg-white text-slate-500 border-slate-200 hover:border-rose-200 hover:text-rose-600"
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 font-medium sm:ml-2 shrink-0">
            {totalCount} total
          </p>
        </div>

        {/* ── Table card ── */}
        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
          {/* table header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <TrendingUp size={17} className="text-rose-500" />
              <h2 className="text-sm font-bold text-slate-700">Requests</h2>
              <span className="text-[11px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                {requests.length}
              </span>
            </div>
          </div>

          {isLoading ? (
            <div className="py-24 text-center">
              <div className="w-8 h-8 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-slate-400">Loading requests…</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="py-24 text-center">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto mb-4">
                <Droplets size={24} className="text-rose-300" />
              </div>
              <p className="text-slate-400 font-semibold text-sm mb-1">
                No requests found
              </p>
              <p className="text-slate-300 text-xs mb-5">
                Try a different filter or create a new request.
              </p>
              <Link
                to="/dashboard/create-donation-request"
                className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                <Plus size={15} /> Create a request
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-widest font-semibold">
                    <th className="px-6 py-3 text-left">Recipient</th>
                    <th className="px-6 py-3 text-left">Location</th>
                    <th className="px-6 py-3 text-left">Date & time</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Donor</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {requests.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-rose-50/30 transition-colors group"
                    >
                      {/* recipient */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={item.recipientName} />
                          <span className="font-semibold text-slate-700">
                            {item.recipientName}
                          </span>
                        </div>
                      </td>

                      {/* location */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <MapPin
                            size={12}
                            className="text-rose-400 shrink-0"
                          />
                          <span>
                            {item.upazilaName}, {item.districtName}
                          </span>
                        </div>
                      </td>

                      {/* date & time */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Clock
                            size={12}
                            className="text-slate-300 shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-slate-700">
                              {new Date(item.dateTime).toLocaleDateString(
                                "en-GB",
                              )}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {new Date(item.dateTime).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* status */}
                      <td className="px-6 py-4">
                        <StatusBadge status={item.status} />
                      </td>

                      {/* donor info */}
                      <td className="px-6 py-4">
                        {item.status === "inprogress" ||
                        item.status === "done" ? (
                          <div className="flex items-center gap-2">
                            <Avatar name={item.donorName ?? "?"} />
                            <div>
                              <p className="text-[11px] font-semibold text-slate-700 leading-none">
                                {item.donorName ?? "Assigned"}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-0.5">
                                {item.donorEmail}
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
                          {/* done / cancel only when inprogress */}
                          {item.status === "inprogress" && (
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() =>
                                  handleStatusChange(item._id, "done")
                                }
                                className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                              >
                                <CheckCircle2 size={10} /> Done
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(item._id, "cancel")
                                }
                                className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
                              >
                                <XCircle size={10} /> Cancel
                              </button>
                            </div>
                          )}
                          {/* icon actions */}
                          <div className="flex items-center gap-1">
                            <Link
                              to={`/dashboard/view-details-donation/${item._id}`}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                              title="View"
                            >
                              <Eye size={15} />
                            </Link>
                            <Link
                              to={`/dashboard/update-donation-request/${item._id}`}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                              title="Edit"
                            >
                              <Edit size={15} />
                            </Link>
                            <button
                              onClick={() => handleDelete(item._id)}
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
          )}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 font-medium order-2 sm:order-1">
              Page{" "}
              <span className="text-rose-600 font-bold">{currentPage}</span> of{" "}
              <span className="font-bold text-slate-600">{totalPages}</span>{" "}
              &nbsp;·&nbsp; {totalCount} results
            </p>

            <div className="flex items-center gap-2 order-1 sm:order-2">
              {/* prev */}
              <button
                disabled={currentPage === 1}
                onClick={() => goPage(currentPage - 1)}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
              >
                <ChevronLeft size={15} />
              </button>

              {/* first page if not in range */}
              {pageNums()[0] > 1 && (
                <>
                  <button
                    onClick={() => goPage(1)}
                    className="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-600 text-sm font-semibold transition-all shadow-sm"
                  >
                    1
                  </button>
                  {pageNums()[0] > 2 && (
                    <span className="text-slate-300 text-sm font-bold px-1">
                      …
                    </span>
                  )}
                </>
              )}

              {/* page number buttons */}
              {pageNums().map((n) => (
                <button
                  key={n}
                  onClick={() => goPage(n)}
                  className={`w-9 h-9 rounded-xl text-sm font-semibold border transition-all shadow-sm
                    ${
                      currentPage === n
                        ? "bg-rose-600 text-white border-rose-600 shadow-rose-200 scale-105"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                    }`}
                >
                  {n}
                </button>
              ))}

              {/* last page if not in range */}
              {pageNums()[pageNums().length - 1] < totalPages && (
                <>
                  {pageNums()[pageNums().length - 1] < totalPages - 1 && (
                    <span className="text-slate-300 text-sm font-bold px-1">
                      …
                    </span>
                  )}
                  <button
                    onClick={() => goPage(totalPages)}
                    className="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-600 text-sm font-semibold transition-all shadow-sm"
                  >
                    {totalPages}
                  </button>
                </>
              )}

              {/* next */}
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => goPage(currentPage + 1)}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDonationRequests;
