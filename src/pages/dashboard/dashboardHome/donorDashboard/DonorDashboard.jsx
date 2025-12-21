import { Helmet } from "react-helmet";
import SectionTitle from "../../../../ui/SectionTitle ";
import React, { useState } from "react";
import { Edit, Trash2, Eye, ExternalLink } from "lucide-react";
import { Link } from "react-router";

const DonorDashboard = () => {
  // Sample data based on your provided JSON
  const [requests, setRequests] = useState([
    {
      _id: "694828fab52cb803208ed17c",
      recipientName: "Sarah Peters",
      districtName: "Chattogram",
      upazilaName: "Banshkhali",
      date: "1971-11-01",
      time: "15:41",
      bloodGroup: "O-",
      status: "inprogress", // options: pending, inprogress, done, canceled
      donorName: "MR. f",
      donorEmail: "faisalhossen396@gmail.com",
    },
  ]);

  const userName = "MR. f"; // This would come from your Auth context

  // Function to handle status updates
  const updateStatus = (id, newStatus) => {
    setRequests(
      requests.map((req) =>
        req._id === id ? { ...req, status: newStatus } : req
      )
    );
  };
  return (
    <div className="my-14 md:my-24 bg-gray-50 min-h-screen font-sans">
      <Helmet>
        <title>RedUnity | Donor Dashboard</title>
      </Helmet>
      {/* Welcome Section */}
      <header className="mb-8">
        {/* <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {userName}!
        </h1>
        <p className="text-gray-600">
          Here is a summary of your recent activity.
        </p> */}
        <SectionTitle
          title={` Welcome back, ${userName}!`}
          subTitle={" Here is a summary of your recent activity."}
        />
      </header>

      {/* Recent Donation Requests Table */}
      {requests.length > 0 && (
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
                {requests.slice(0, 3).map((request) => (
                  <tr
                    key={request._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {request.recipientName}
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
                          <p className="font-semibold">{request.donorName}</p>
                          <p className="text-gray-400">{request.donorEmail}</p>
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        {/* Done/Cancel buttons shown only if inprogress */}
                        {request.status === "inprogress" && (
                          <>
                            <button
                              onClick={() => updateStatus(request._id, "done")}
                              className="text-green-600 hover:underline font-medium"
                            >
                              Done
                            </button>
                            <button
                              onClick={() =>
                                updateStatus(request._id, "canceled")
                              }
                              className="text-red-600 hover:underline font-medium"
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        <button
                          title="View"
                          className="text-gray-400 hover:text-blue-600"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          title="Edit"
                          className="text-gray-400 hover:text-yellow-600"
                        >
                          <Edit size={18} />
                        </button>
                        <button
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
    </div>
  );
};
export default DonorDashboard;
