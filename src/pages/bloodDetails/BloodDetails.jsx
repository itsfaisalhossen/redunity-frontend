import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Hospital,
  Droplets,
  FileText,
  ChevronLeft,
  Link,
  X,
} from "lucide-react";
import SectionTitle from "../../ui/SectionTitle ";

const BloodDetails = () => {
  const { user } = useAuth();
  const location = useLocation();
  const id = location.state?.requestId;
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: blood = {}, refetch } = useQuery({
    queryKey: ["blod", id],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bloods/${id}`);
      return res?.data;
    },
  });

  const handleDonate = async (e) => {
    e.preventDefault();
    const donationData = {
      donorName: user?.displayName,
      donorEmail: user?.email,
      status: "inprogress",
    };

    try {
      const res = await axiosSecure.patch(`/bloods/${id}`, donationData);
      if (res.data.modifiedCount > 0) {
        setIsModalOpen(false);
        Swal.fire({
          title: "Success!",
          text: "Donation status updated to In Progress",
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
    <div className="min-h-screen p-4 md:p-8 bg-slate50">
      <SectionTitle title={"Donation Details"} />
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center text-slate-500 hover:text-rose-600 transition-colors mb-6 md:mb-10 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back to List</span>
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-rose-600 p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-rose-100 text-sm font-semibold uppercase tracking-wider">
                Donation Request
              </p>
              <h1 className="text-3xl font-bold mt-1">
                For {blood.recipientName}
              </h1>
            </div>
            <div className="flex flex-col items-end">
              <span
                className={`px-4 py-1 rounded-full text-sm font-bold shadow-sm ${
                  blood.status === "Pending"
                    ? "bg-amber-400 text-amber-900"
                    : "bg-green-400 text-green-900"
                }`}
              >
                ● {blood.status}
              </span>
              <p className="text-rose-100 text-xs mt-2 font-mono">
                ID: {blood._id}
              </p>
            </div>
          </div>

          <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <div className="bg-rose-50 rounded-2xl p-6 text-center border border-rose-100">
                <Droplets className="w-10 h-10 text-rose-600 mx-auto mb-2" />
                <p className="text-slate-500 text-sm font-medium">
                  Blood Group Needed
                </p>
                <h2 className="text-5xl font-black text-rose-600">
                  {blood.bloodGroup}
                </h2>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 border-b pb-2">
                  Blood Information
                </h3>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <User className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase">
                      Requester Name
                    </p>
                    <p className="font-semibold text-slate-700">{blood.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Mail className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-slate-400 uppercase">
                      Email Address
                    </p>
                    <p className="font-semibold text-slate-700 truncate">
                      {blood.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <section className="space-y-4">
                  <h3 className="font-bold text-slate-800 border-b pb-2">
                    Schedule
                  </h3>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-rose-500" />
                    <span className="text-slate-700">
                      {blood.date &&
                        new Date(blood.date).toLocaleDateString("en-US", {
                          dateStyle: "long",
                        })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-rose-500" />
                    <span className="text-slate-700">
                      {blood.time} (24h Format)
                    </span>
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="font-bold text-slate-800 border-b pb-2">
                    Location
                  </h3>
                  <div className="flex items-start gap-3">
                    <Hospital className="w-5 h-5 text-rose-500 shrink-0" />
                    <span className="text-slate-700 font-medium">
                      {blood.hospitalName}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                    <p className="text-slate-600">
                      {blood.fullAddress}
                      <br />
                      {blood.upazilaName}, {blood.districtName}
                    </p>
                  </div>
                </section>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-slate-400" />
                  <h3 className="font-bold text-slate-800">
                    Additional Details
                  </h3>
                </div>
                <p className="text-slate-600 italic leading-relaxed">
                  "{blood.detalsText}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  // disabled={blood.status !== "pending"}
                  onClick={() => setIsModalOpen(true)}
                  // className={`flex-1 font-bold py-3 rounded-xl transition-all shadow-md ${
                  //   blood.status === "pending"
                  //     ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200"
                  //     : "bg-slate-200 text-slate-500 cursor-not-allowed"
                  // }`}
                >
                  hello
                  {/* {blood.status === "pending" ? "Donate Now" : "Request Filled"} */}
                </button>
                <button className="flex-1 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-600 font-bold py-3 rounded-xl transition-all">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-rose-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8">
              <div className="text-center mb-6">
                <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-8 h-8 text-rose-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Confirm Donation
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Please verify your information below
                </p>
              </div>

              <form onSubmit={handleDonate} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Donor Name
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={user?.displayName || ""}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Donor Email
                  </label>
                  <input
                    type="email"
                    readOnly
                    value={user?.email || ""}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 border-2 border-slate-100 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all active:scale-95"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BloodDetails;
