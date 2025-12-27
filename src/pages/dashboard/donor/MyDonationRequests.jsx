import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../ui/SectionTitle ";
import { Link } from "react-router";
import { Edit, Eye, Trash2, User } from "lucide-react";
import Swal from "sweetalert2";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("");
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: response = {}, refetch } = useQuery({
    queryKey: ["my-requests", user?.email, currentPage, filter],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-requests/${user?.email}?page=${currentPage}&size=${itemsPerPage}&status=${filter}`
      );
      return res.data;
    },
  });

  const requests = response.data || [];
  const totalCount = response.totalCount || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48", // rose-600 color
      cancelButtonColor: "#64748b", // slate-500 color
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
      customClass: {
        popup: "rounded-[2rem]",
        confirmButton: "rounded-xl px-6 py-3 font-bold",
        cancelButton: "rounded-xl px-6 py-3 font-bold",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(
            `/lastRequest-bloods/${id}?email=${user.email}`
          );
          queryClient.invalidateQueries(["last-requests", user.email]);
          Swal.fire({
            title: "Deleted!",
            text: "Your request has been deleted.",
            icon: "success",
            confirmButtonColor: "#e11d48",
            customClass: { popup: "rounded-[2rem]" },
          });
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to delete the request.", "error");
        }
      }
    });
  };

  const handleDonateDoneAndCencel = async (id, status) => {
    const donationData = {
      donorName: user?.displayName,
      donorEmail: user?.email,
      status: status,
    };

    try {
      const res = await axiosSecure.patch(`/bloods/${id}`, donationData);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: `Donation status updated to ${status}`,
          icon: "success",
          confirmButtonColor: "#e11d48",
        });
        refetch();
      }
    } catch (error) {
      console.error("Donation error", error);
    }
  };

  return (
    <section className="container px-4 mx-auto py-10 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <SectionTitle title={"My Donation Requests"} />
        {/* Modern Filter Dropdown */}
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-800 uppercase tracking-wider">
            Filter By:
          </span>
          <select
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-8 py-2.5 bg-white border border-rose-100 text-gray-700 rounded-xl font-medium shadow-sm focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all cursor-pointer hover:border-rose-300"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="cancel">Canceled</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl shadow-2xl shadow-rose-100/50 border border-rose-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-rose-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-rose-600 uppercase tracking-widest">
                  Recipient
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-rose-600 uppercase tracking-widest">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-rose-600 uppercase tracking-widest">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-rose-600 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-rose-600 uppercase tracking-widest">
                  Donor Info
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-rose-600 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-rose-50/60">
              {requests.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-rose-50/30 transition-all group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-800">
                      {item.recipientName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 flex flex-col">
                      <span>{item.districtName}</span>
                      <span className="text-xs text-gray-400">
                        {item.upazilaName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 text-sm font-medium py-4 whitespace-nowrap">
                    <span className="text-rose-400">
                      {new Date(item.dateTime).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                    <br />
                    <span className="text-gray-600 text-[13px]">
                      {new Date(item.dateTime).toLocaleDateString("en-GB")}
                    </span>
                  </td>
                  <td className="px-6 py-4 uppercase whitespace-nowrap">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-bold border-2 shadow-sm inline-block
                  ${
                    item.status === "pending"
                      ? "bg-amber-50 text-amber-600 border-amber-100"
                      : item.status === "inprogress"
                      ? "bg-blue-50 text-blue-600 border-blue-100"
                      : item.status === "done"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : "bg-rose-50 text-rose-600 border-rose-100"
                  }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    {item.status === "inprogress" || item.status === "done" ? (
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 border border-rose-200">
                          <User size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 leading-none">
                            {item.donorName || "Assigned"}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium mt-1  ">
                            {item.donorEmail}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-200 font-black tracking-widest text-xs">
                        ————
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex justify-center items-center gap-4">
                      <div className="flex justify-center items-center gap-3">
                        {item.status === "inprogress" && (
                          <div className="flex gap-2 mr-3 pr-3 border-r border-rose-100">
                            <button
                              onClick={() =>
                                handleDonateDoneAndCencel(item?._id, "done")
                              }
                              className="px-3 py-1.5 bg-emerald-500 text-white text-[10px] font-black rounded-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100"
                            >
                              DONE
                            </button>
                            <button
                              onClick={() => {
                                handleDonateDoneAndCencel(item?._id, "cancel");
                              }}
                              className="px-3 py-1.5 bg-rose-500 text-white text-[10px] font-black rounded-lg hover:bg-rose-600 transition-all shadow-lg shadow-rose-100"
                            >
                              CANCEL
                            </button>
                          </div>
                        )}
                        <Link
                          to={`/dashboard/view-details-donation/${item?._id}`}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                          title="View"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          to={`/dashboard/update-donation-request/${item?._id}`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {requests.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 font-medium italic">
                No donation requests found.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modern Pagination Container */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-10 px-2 gap-4">
        <p className="text-sm text-gray-500 font-medium order-2 sm:order-1">
          Showing page{" "}
          <span className="text-rose-600 font-bold">{currentPage}</span>
        </p>

        <div className="flex items-center gap-3 order-1 sm:order-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 text-sm font-bold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-rose-500 hover:text-white hover:border-rose-500 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-500 transition-all shadow-sm"
          >
            Prev
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages).keys()].map((n) => (
              <button
                key={n + 1}
                onClick={() => setCurrentPage(n + 1)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all shadow-sm
              ${
                currentPage === n + 1
                  ? "bg-rose-500 text-white scale-110 shadow-rose-200"
                  : "bg-white text-gray-600 border border-gray-100 hover:bg-rose-50"
              }`}
              >
                {n + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 text-sm font-bold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-rose-500 hover:text-white hover:border-rose-500 disabled:opacity-30 transition-all shadow-sm"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MyDonationRequests;
