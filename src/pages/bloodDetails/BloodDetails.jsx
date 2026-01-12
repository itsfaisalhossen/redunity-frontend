// import { useNavigate, useParams } from "react-router";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import Container from "../../ui/Container";
// import {
//   Calendar,
//   Clock,
//   MapPin,
//   User,
//   Mail,
//   Hospital,
//   Droplets,
//   FileText,
//   ChevronLeft,
//   X,
// } from "lucide-react";
// import { Helmet } from "react-helmet";
// import Loading from "../../ui/Loading";

// const BloodDetails = () => {
//   const { user } = useAuth();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { data: blood = {}, refetch } = useQuery({
//     queryKey: ["blod", id],
//     enabled: !!user?.email && !!id,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/bloods/${id}`);
//       return res?.data;
//     },
//   });

//   const handleDonate = async (e) => {
//     e.preventDefault();
//     const donationData = {
//       donorName: user?.displayName,
//       donorEmail: user?.email,
//       status: "inprogress",
//     };

//     try {
//       const res = await axiosSecure.patch(`/bloods/${id}`, donationData);
//       if (res.data.modifiedCount > 0) {
//         setIsModalOpen(false);
//         Swal.fire({
//           title: "Success!",
//           text: "Donation status updated to In Progress",
//           icon: "success",
//           confirmButtonColor: "#e11d48",
//         });
//         refetch();
//       }
//     } catch (error) {
//       console.error("Donation error", error);
//     }
//   };

//   return (
//     <div className="bg-primary dark:bg-primary-dark min-h-screen py-10 md:py-16 transition-colors duration-300">
//       <Helmet>
//         <title>RedUnity | Blood Details</title>
//       </Helmet>

//       <Container>
//         <div data-aos="fade-up">
//           <button
//             onClick={() => navigate("/donation-requests")}
//             className="flex items-center text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-500 transition-colors mb-6 md:mb-10 group"
//           >
//             <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
//             <span className="font-semibold">Back to Donation requests</span>
//           </button>

//           {/* Main Card */}
//           <div className="bg-white dark:bg-slate900 back-drop-b rounded-3xl shadow-sm border border-slate100 dark:border-slate800 overflow-hidden">
//             {/* Header Banner */}
//             <div className="bg-rose-600 p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//               <div>
//                 <p className="text-rose-100 text-sm font-semibold uppercase tracking-wider">
//                   Donation Request
//                 </p>
//                 <h1 className="text-3xl font-bold mt-1">
//                   For {blood.recipientName}
//                 </h1>
//               </div>
//               <div className="flex flex-col items-end">
//                 <span
//                   className={`px-4 py-1 rounded-full text-sm font-bold shadow-sm ${
//                     blood.status === "Pending" || blood.status === "pending"
//                       ? "bg-amber-400 text-amber-900"
//                       : "bg-green-400 text-green-900"
//                   }`}
//                 >
//                   ● {blood.status}
//                 </span>
//                 <p className="text-rose-100 text-xs mt-2 font-mono">
//                   ID: {blood._id}
//                 </p>
//               </div>
//             </div>

//             <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
//               {/* LEFT COLUMN */}
//               <div className="md:col-span-1 space-y-6">
//                 {/* Blood Group Card */}
//                 <div className="bg-rose-50 dark:bg-rose-950/20 rounded-2xl p-6 text-center border border-rose-100 dark:border-rose-900/30">
//                   <Droplets className="w-10 h-10 text-rose-600 mx-auto mb-2" />
//                   <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
//                     Blood Group Needed
//                   </p>
//                   <h2 className="text-5xl font-black text-rose-600">
//                     {blood.bloodGroup}
//                   </h2>
//                 </div>

//                 {/* Requester Information */}
//                 <div className="space-y-4">
//                   <h3 className="font-bold text-slate-800 dark:text-white border-b dark:border-slate-800 pb-2">
//                     Requester Information
//                   </h3>
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
//                       <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
//                     </div>
//                     <div>
//                       <p className="text-xs text-slate-400 uppercase">Name</p>
//                       <p className="font-semibold text-slate-700 dark:text-slate-200">
//                         {blood.name}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
//                       <Mail className="w-4 h-4 text-slate-600 dark:text-slate-400" />
//                     </div>
//                     <div className="overflow-hidden">
//                       <p className="text-xs text-slate-400 uppercase">Email</p>
//                       <p className="font-semibold text-slate-700 dark:text-slate-200 truncate">
//                         {blood.email}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Donor Information */}
//                 {(blood.status === "inprogress" || blood.status === "done") && (
//                   <div className="space-y-4 pt-2">
//                     <h3 className="font-bold text-slate-800 dark:text-white border-b dark:border-slate-800 pb-2">
//                       Donor Information
//                     </h3>
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
//                         <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
//                       </div>
//                       <div>
//                         <p className="text-xs text-slate-400 uppercase">
//                           Donor Name
//                         </p>
//                         <p className="font-semibold text-slate-700 dark:text-slate-200">
//                           {blood.donorName}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* RIGHT COLUMN */}
//               <div className="md:col-span-2 space-y-8">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   {/* Schedule */}
//                   <section className="space-y-4">
//                     <h3 className="font-bold text-slate-800 dark:text-white border-b dark:border-slate-800 pb-2">
//                       Schedule
//                     </h3>
//                     <div className="flex items-center gap-3">
//                       <Calendar className="w-5 h-5 text-rose-500" />
//                       <p className="text-sm font-medium text-rose-600 dark:text-rose-400">
//                         {new Date(blood.dateTime).toLocaleDateString("en-GB")}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Clock className="w-5 h-5 text-rose-500" />
//                       <span className="text-slate-700 dark:text-slate-300">
//                         {new Date(blood.dateTime).toLocaleTimeString("en-US", {
//                           hour: "numeric",
//                           minute: "2-digit",
//                           hour12: true,
//                         })}
//                       </span>
//                     </div>
//                   </section>

//                   {/* Location */}
//                   <section className="space-y-4">
//                     <h3 className="font-bold text-slate-800 dark:text-white border-b dark:border-slate-800 pb-2">
//                       Location
//                     </h3>
//                     <div className="flex items-start gap-3">
//                       <Hospital className="w-5 h-5 text-rose-500 shrink-0" />
//                       <span className="text-slate-700 dark:text-slate-200 font-medium">
//                         {blood.hospitalName}
//                       </span>
//                     </div>
//                     <div className="flex items-start gap-3 text-sm">
//                       <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
//                       <p className="text-slate-600 dark:text-slate-400">
//                         {blood.fullAddress} <br /> {blood.upazilaName},{" "}
//                         {blood.districtName}
//                       </p>
//                     </div>
//                   </section>
//                 </div>

//                 {/* Additional Details */}
//                 <div className="bg-slate-50 back-drop-b dark:bg-slate800/50 rounded-2xl p-6 border border-slate-100 dark:borderslate-800">
//                   <div className="flex items-center gap-2 mb-3">
//                     <FileText className="w-5 h-5 text-slate-400" />
//                     <h3 className="font-bold text-slate-800 dark:text-white">
//                       Additional Details
//                     </h3>
//                   </div>
//                   <p className="text-slate-600 dark:text-slate-400 italic leading-relaxed">
//                     "{blood.detalsText}"
//                   </p>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                   <button
//                     disabled={blood.status !== "pending"}
//                     onClick={() => setIsModalOpen(true)}
//                     className={`flex-1 font-bold py-3 rounded-xl transition-all shadow-md ${
//                       blood.status === "pending"
//                         ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200 dark:shadow-none"
//                         : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-600 cursor-not-allowed"
//                     }`}
//                   >
//                     {blood.status === "pending"
//                       ? "Donate Now"
//                       : "Request Filled"}
//                   </button>
//                   <button className="flex-1 bg-white dark:bg-transparent border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:text-white text-slate-600 font-bold py-3 rounded-xl transition-all">
//                     Contact Support
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Donation Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
//             <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute right-4 top-4 text-slate-400 hover:text-rose-600 transition-colors"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//               <div className="p-8">
//                 <div className="text-center mb-6">
//                   <div className="bg-rose-100 dark:bg-rose-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Droplets className="w-8 h-8 text-rose-600" />
//                   </div>
//                   <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
//                     Confirm Donation
//                   </h2>
//                   <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
//                     Please verify your information
//                   </p>
//                 </div>
//                 <form onSubmit={handleDonate} className="space-y-5">
//                   <div>
//                     <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
//                       Donor Name
//                     </label>
//                     <input
//                       type="text"
//                       readOnly
//                       value={user?.displayName || ""}
//                       className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 font-medium focus:outline-none"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
//                       Donor Email
//                     </label>
//                     <input
//                       type="email"
//                       readOnly
//                       value={user?.email || ""}
//                       className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 font-medium focus:outline-none"
//                     />
//                   </div>
//                   <div className="pt-4 flex gap-3">
//                     <button
//                       type="button"
//                       onClick={() => setIsModalOpen(false)}
//                       className="flex-1 px-4 py-3 border-2 border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="flex-1 px-4 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 dark:shadow-none transition-all active:scale-95"
//                     >
//                       Confirm
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Unique Impact Section */}
//         <div className="mt-16 md:mt-24 border-t border-slate-200 dark:border-slate-800 pt-16">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
//               Your Journey to{" "}
//               <span className="text-rose-600">Saving a Life</span>
//             </h2>
//             <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
//               Joining the mission is simple. Here is what happens once you
//               decide to become a hero.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
//             {/* Step 1 */}
//             <div className="relative z-10 text-center p-6 group">
//               <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-600 mx-auto mb-6 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
//                 <span className="text-2xl font-black">1</span>
//               </div>
//               <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
//                 Express Intent
//               </h4>
//               <p className="text-sm text-slate-500 dark:text-slate-400">
//                 Click on "Donate Now" and confirm your details to let the
//                 requester know you are coming.
//               </p>
//             </div>

//             {/* Step 2 */}
//             <div className="relative z-10 text-center p-6 group">
//               <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-600 mx-auto mb-6 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
//                 <span className="text-2xl font-black">2</span>
//               </div>
//               <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
//                 Coordinate
//               </h4>
//               <p className="text-sm text-slate-500 dark:text-slate-400">
//                 Use the hospital address and contact info to reach the location
//                 at the scheduled time.
//               </p>
//             </div>

//             {/* Step 3 */}
//             <div className="relative z-10 text-center p-6 group">
//               <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-600 mx-auto mb-6 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
//                 <span className="text-2xl font-black">3</span>
//               </div>
//               <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
//                 Save a Life
//               </h4>
//               <p className="text-sm text-slate-500 dark:text-slate-400">
//                 Complete the donation and feel the joy of giving someone a
//                 second chance at life.
//               </p>
//             </div>

//             {/* Connecting Line (Hidden on mobile) */}
//             <div className="hidden md:block absolute top-14 left-1/4 right-1/4 h-[2px] bg-slate-200 dark:bg-slate-800 -z-0"></div>
//           </div>

//           {/* Motivation Box */}
//           <div className="mt-16 p-8 bg-black back-drop-b dark:bgrose-900/20 rounded-[1rem] flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
//             <div className="flex items-center gap-4">
//               <div className="p-4 bg-rose-600 rounded-2xl text-white animate-pulse">
//                 <Droplets size={24} />
//               </div>
//               <div>
//                 <h4 className="text-white font-bold text-lg">Did you know?</h4>
//                 <p className="text-slate-400 dark:text-rose-100/60 text-sm">
//                   One unit of blood can save up to three lives.
//                 </p>
//               </div>
//             </div>
//             <div className="text-white/80 font-medium italic text-center md:text-right text-sm">
//               "The blood you donate gives someone <br /> another chance at
//               life."
//             </div>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default BloodDetails;

import { useNavigate, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Container from "../../ui/Container";
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
  X,
} from "lucide-react";
import { Helmet } from "react-helmet";
import Loading from "../../ui/Loading";

const BloodDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: blood = {},
    refetch,
    isLoading,
  } = useQuery({
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

  // ডাটা লোড হওয়ার সময় এই পার্টটি কাজ করবে
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-primary dark:bg-primary-dark min-h-screen py-10 md:py-16 transition-colors duration-300">
      <Helmet>
        <title>RedUnity | Blood Details</title>
      </Helmet>

      <Container>
        <div data-aos="fade-up">
          <button
            onClick={() => navigate("/donation-requests")}
            className="flex items-center text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-500 transition-colors mb-6 md:mb-10 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back to Donation requests</span>
          </button>

          {/* Main Card */}
          <div className="bg-white dark:bg-slate900 back-drop-b rounded-3xl shadow-sm border border-slate100 dark:border-slate800 overflow-hidden">
            {/* Header Banner */}
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
                    blood.status === "Pending" || blood.status === "pending"
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

            <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* LEFT COLUMN */}
              <div className="md:col-span-1 space-y-6">
                {/* Blood Group Card */}
                <div className="bg-rose-50 dark:bg-rose-950/20 rounded-2xl p-6 text-center border border-rose-100 dark:border-rose-900/30">
                  <Droplets className="w-10 h-10 text-rose-600 mx-auto mb-2" />
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    Blood Group Needed
                  </p>
                  <h2 className="text-5xl font-black text-rose-600">
                    {blood.bloodGroup}
                  </h2>
                </div>

                {/* Requester Information */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 dark:text-white border-b dark:border-slate-800 pb-2">
                    Requester Information
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Name</p>
                      <p className="font-semibold text-slate-700 dark:text-slate-200">
                        {blood.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <Mail className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-slate-400 uppercase">Email</p>
                      <p className="font-semibold text-slate-700 dark:text-slate-200 truncate">
                        {blood.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Donor Information */}
                {(blood.status === "inprogress" || blood.status === "done") && (
                  <div className="space-y-4 pt-2">
                    <h3 className="font-bold text-slate-800 dark:text-white border-b dark:border-slate-800 pb-2">
                      Donor Information
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase">
                          Donor Name
                        </p>
                        <p className="font-semibold text-slate-700 dark:text-slate-200">
                          {blood.donorName}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN */}
              <div className="md:col-span-2 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Schedule */}
                  <section className="space-y-4">
                    <h3 className="font-bold text-slate-800 dark:text-white border-b dark:border-slate-800 pb-2">
                      Schedule
                    </h3>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-rose-500" />
                      <p className="text-sm font-medium text-rose-600 dark:text-rose-400">
                        {new Date(blood.dateTime).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-rose-500" />
                      <span className="text-slate-700 dark:text-slate-300">
                        {new Date(blood.dateTime).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </section>

                  {/* Location */}
                  <section className="space-y-4">
                    <h3 className="font-bold text-slate-800 dark:text-white border-b dark:border-slate-800 pb-2">
                      Location
                    </h3>
                    <div className="flex items-start gap-3">
                      <Hospital className="w-5 h-5 text-rose-500 shrink-0" />
                      <span className="text-slate-700 dark:text-slate-200 font-medium">
                        {blood.hospitalName}
                      </span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                      <p className="text-slate-600 dark:text-slate-400">
                        {blood.fullAddress} <br /> {blood.upazilaName},{" "}
                        {blood.districtName}
                      </p>
                    </div>
                  </section>
                </div>

                {/* Additional Details */}
                <div className="bg-slate-50 back-drop-b dark:bg-slate800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <h3 className="font-bold text-slate-800 dark:text-white">
                      Additional Details
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 italic leading-relaxed">
                    "{blood.detalsText}"
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    disabled={blood.status !== "pending"}
                    onClick={() => setIsModalOpen(true)}
                    className={`flex-1 font-bold py-3 rounded-xl transition-all shadow-md ${
                      blood.status === "pending"
                        ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200 dark:shadow-none"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-600 cursor-not-allowed"
                    }`}
                  >
                    {blood.status === "pending"
                      ? "Donate Now"
                      : "Request Filled"}
                  </button>
                  <button className="flex-1 bg-white dark:bg-transparent border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:text-white text-slate-600 font-bold py-3 rounded-xl transition-all">
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
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-rose-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="bg-rose-100 dark:bg-rose-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Droplets className="w-8 h-8 text-rose-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                    Confirm Donation
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Please verify your information
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
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 font-medium focus:outline-none"
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
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 font-medium focus:outline-none"
                    />
                  </div>
                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-4 py-3 border-2 border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 dark:shadow-none transition-all active:scale-95"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Unique Impact Section */}
        <div className="mt-16 md:mt-24 border-t border-slate-200 dark:border-slate-800 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              Your Journey to{" "}
              <span className="text-rose-600">Saving a Life</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Joining the mission is simple. Here is what happens once you
              decide to become a hero.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="relative z-10 text-center p-6 group">
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-600 mx-auto mb-6 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                <span className="text-2xl font-black">1</span>
              </div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                Express Intent
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Click on "Donate Now" and confirm your details to let the
                requester know you are coming.
              </p>
            </div>

            <div className="relative z-10 text-center p-6 group">
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-600 mx-auto mb-6 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                <span className="text-2xl font-black">2</span>
              </div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                Coordinate
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Use the hospital address and contact info to reach the location
                at the scheduled time.
              </p>
            </div>

            <div className="relative z-10 text-center p-6 group">
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-600 mx-auto mb-6 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                <span className="text-2xl font-black">3</span>
              </div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                Save a Life
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Complete the donation and feel the joy of giving someone a
                second chance at life.
              </p>
            </div>
            <div className="hidden md:block absolute top-14 left-1/4 right-1/4 h-[2px] bg-slate-200 dark:bg-slate-800 -z-0"></div>
          </div>

          <div className="mt-16 p-8 bg-black back-drop-b dark:bg-rose-900/20 rounded-[1rem] flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-rose-600 rounded-2xl text-white animate-pulse">
                <Droplets size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Did you know?</h4>
                <p className="text-slate-400 dark:text-rose-100/60 text-sm">
                  One unit of blood can save up to three lives.
                </p>
              </div>
            </div>
            <div className="text-white/80 font-medium italic text-center md:text-right text-sm">
              "The blood you donate gives someone <br /> another chance at
              life."
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BloodDetails;
