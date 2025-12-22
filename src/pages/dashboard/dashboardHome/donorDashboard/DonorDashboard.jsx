import { Helmet } from "react-helmet";
import SectionTitle from "../../../../ui/SectionTitle ";
import { Edit, Trash2, Eye, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";

const DonorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { data: lastRequest = [] } = useQuery({
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(
          `/lastRequest-bloods/${id}?email=${user.email}`
        );
        queryClient.invalidateQueries(["last-requests", user.email]);
        Swal.fire({
          title: "Deleted!",
          text: "Your request has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="my-14 md:my-24 bg-gray50 min-h-screen font-sans">
      <Helmet>
        <title>RedUnity | Donor Dashboard</title>
      </Helmet>
      {/* Welcome Section */}
      <header className="mb-8">
        <SectionTitle
          title={` Welcome back, ${user?.displayName}!`}
          subTitle={" Here is a summary of your recent activity."}
        />
      </header>

      {/* Recent Donation Requests Table */}
      {lastRequest.length > 0 && (
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Recent Donation Requests
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-medium">
                <tr>
                  <th className="px-6 py-4">Recipient</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Date/Time</th>
                  <th className="px-6 py-4">Blood Group</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Donor Info</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {lastRequest.map((request) => (
                  <tr
                    key={request._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {request.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {request.upazilaName}, {request.districtName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {request.date} <br />{" "}
                      <span className="text-xs text-gray-400">
                        {request.time}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-bold">
                        {request.bloodGroup}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`capitalize px-2 py-1 rounded text-xs font-semibold
                        ${
                          request.status === "inprogress"
                            ? "bg-blue-100 text-blue-700"
                            : request.status === "done"
                            ? "bg-green-100 text-green-700"
                            : request.status === "canceled"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {request.status === "inprogress" ? (
                        <div className="text-xs">
                          <p className="font-semibold">{request.name}</p>
                          <p className="text-gray-400">{request.email}</p>
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        {request.status === "inprogress" && (
                          <>
                            <button className="text-green-600 hover:underline font-medium">
                              Done
                            </button>
                            <button className="text-red-600 hover:underline font-medium">
                              Cancel
                            </button>
                          </>
                        )}
                        <button
                          title="View"
                          // onClick={() => handleView(request._id)}
                          className="text-gray-400 hover:text-blue-600"
                        >
                          <Eye size={18} />
                        </button>
                        <Link
                          to={`/dashboard/update-donation-request`}
                          state={{ requestId: request._id }}
                          title="Edit"
                          className="text-gray-400 hover:text-yellow-600"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(request._id)}
                          title="Delete"
                          className="text-gray-400 hover:text-red-600"
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

          <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
            <Link
              to={"/dashboard/my-donation-requests"}
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center justify-center mx-auto gap-2"
            >
              View My All Requests <ExternalLink size={14} />
            </Link>
          </div>
        </section>
      )}

      {/* --- Animated & Blurry Modal --- */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300">
          {/* Backdrop with Blur */}
          <div
            className="absolute inset-0 bg-white/40 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl border border-gray-100 transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Edit Donation Request
              </h3>
              <p className="text-sm text-gray-500">
                Update recipient details below
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Recipient Name
                </label>
                <input
                  type="text"
                  // value={formData.recipientName || ""}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, recipientName: e.target.value })
                  // }
                  className="w-full mt-1 px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Enter name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    District
                  </label>
                  <input
                    type="text"
                    // value={formData.districtName || ""}
                    // onChange={(e) =>
                    //   setFormData({ ...formData, districtName: e.target.value })
                    // }
                    className="w-full mt-1 px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Upazila
                  </label>
                  <input
                    type="text"
                    // value={formData.upazilaName || ""}
                    // onChange={(e) =>
                    //   setFormData({ ...formData, upazilaName: e.target.value })
                    // }
                    className="w-full mt-1 px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-6 py-3 text-sm font-bold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DonorDashboard;
