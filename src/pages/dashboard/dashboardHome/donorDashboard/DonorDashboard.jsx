import { Helmet } from "react-helmet";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import {
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  MapPin,
  Calendar,
  Clock,
  User,
} from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import SectionTitle from "../../../../ui/SectionTitle ";

const DonorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // eslint-disable-next-line no-unused-vars
  const { data: lastRequest = [], isLoading } = useQuery({
    queryKey: ["last-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lastRequest-bloods?email=${user.email}`
      );
      return res.data;
    },
  });

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

  return (
    <div className="my-10 md:my-16 min-h-screen font-sans">
      <Helmet>
        <title>RedUnity | Donor Dashboard</title>
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <header className="mb-12">
          <SectionTitle
            title={`Welcome back, ${user?.displayName}!`}
            subTitle={"Here is a summary of your recent activity."}
          />
        </header>

        {/* Recent Donation Requests Section */}
        {lastRequest.length > 0 ? (
          <section className="bg-white rounded-[2.5rem] shadow-2xl shadow-rose-100/40 border border-rose-50 overflow-hidden mb-10 transition-all duration-500">
            {/* Table Header */}
            <div className="px-8 py-7 border-b border-rose-50 flex justify-between items-center bg-linear-to-r from-white to-rose-50/20">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-2.5 h-8 bg-rose-600 rounded-full inline-block animate-pulse"></span>
                Recent Donation Requests
              </h2>
              <Link
                to={"/dashboard/my-donation-requests"}
                className="hidden md:flex items-center gap-2 text-rose-600 hover:text-rose-700 font-bold text-sm transition-all bg-rose-50 px-5 py-2 rounded-xl"
              >
                View All Requests <ExternalLink size={16} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-rose-50/30 text-rose-600 uppercase text-[11px] font-black tracking-[2px]">
                    <th className="px-8 py-5">Recipient</th>
                    <th className="px-8 py-5">Location</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5">Donor Info</th>
                    <th className="px-8 py-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-50/60">
                  {lastRequest.map((request) => (
                    <tr
                      key={request._id}
                      className="hover:bg-rose-50/20 transition-all duration-300"
                    >
                      <td className="px-8 py-6 font-bold text-slate-800 text-base italic">
                        {request.recipientName || request.name}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                          <MapPin size={14} className="text-rose-400" />
                          {request.upazilaName}, {request.districtName}
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <span
                          className={`capitalize px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider border-2 shadow-sm
                          ${
                            request.status === "inprogress"
                              ? "bg-blue-50 text-blue-600 border-blue-100"
                              : request.status === "done"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : request.status === "cancel"
                              ? "bg-red-50 text-red-500 border-red-100"
                              : request.status === "pending"
                              ? "bg-amber-50 text-amber-600 border-amber-100"
                              : ""
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        {request.status === "inprogress" ||
                        request.status === "done" ? (
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 border border-rose-200">
                              <User size={16} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800 leading-none">
                                {request.donorName || "Assigned"}
                              </p>
                              <p className="text-[10px] text-slate-400 font-medium mt-1  ">
                                {request.donorEmail}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-200 font-black tracking-widest text-xs">
                            ————
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-center items-center gap-3">
                          <Link
                            to={`/dashboard/view-details-donation/${request?._id}`}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                            title="View"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            to={`/dashboard/update-donation-request/${request?._id}`}
                            // state={{ requestId: request._id }}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(request._id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Footer for Table */}
            <div className="p-6 bg-slate-50/50 border-t border-rose-50 text-center md:hidden">
              <Link
                to={"/dashboard/my-donation-requests"}
                className="text-rose-600 font-bold text-sm flex items-center justify-center gap-2"
              >
                See All Requests <ExternalLink size={16} />
              </Link>
            </div>
          </section>
        ) : (
          <div className="py-24 bg-white rounded-[3rem] border-2 border-dashed border-rose-100 text-center">
            <div className="bg-rose-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-300 italic font-black text-2xl">
              !
            </div>
            <p className="text-slate-400 font-bold italic">
              No recent donation requests found.
            </p>
            <Link
              to="/dashboard/create-donation-request"
              className="mt-4 inline-block text-rose-600 font-bold hover:underline"
            >
              Create a new request?
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;
