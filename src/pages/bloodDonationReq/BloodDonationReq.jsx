import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { MapPin, Calendar, Clock, ArrowRight, Droplet } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../ui/Container";
import Loading from "../../ui/Loading";

const BloodDonationReq = () => {
  const axiosSecure = useAxiosSecure();
  // const { user } = useAuth();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["pending-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pending-blood-requests");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#FDFCFD] min-h-screen">
      <Container>
        <div className="py-12 font-sans">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-rose-100 rounded-2xl text-rose-600 mb-4">
              <Droplet size={32} className="fill-current" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Pending <span className="text-rose-600">Donation</span> Requests
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">
              Be a hero today. Check the list below to find someone in need of a
              blood donation and save a life.
            </p>
          </div>

          {/* Grid Section */}
          {requests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {requests.map((request) => (
                <div
                  key={request._id}
                  className="group bg-white rounded-[2.5rem] border border-rose-50 shadow-xl shadow-rose-100/30 hover:shadow-rose-200/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-8">
                    {/* Blood Group Badge */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-rose-200 group-hover:scale-110 transition-transform">
                        {request.bloodGroup}
                      </div>
                      <span className="bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-rose-100">
                        Pending
                      </span>
                    </div>

                    {/* Recipient Info */}
                    <h3 className="text-2xl font-bold text-slate-800 mb-4 italic leading-tight">
                      {request.recipientName}
                    </h3>

                    <div className="space-y-4 mb-8 text-slate-600">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-50 rounded-lg group-hover:text-rose-500 transition-colors">
                          <MapPin size={18} />
                        </div>
                        <span className="text-sm font-semibold">
                          {request.upazilaName}, {request.districtName}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-50 rounded-lg group-hover:text-rose-500 transition-colors">
                          <Calendar size={18} />
                        </div>
                        <span className="text-sm font-semibold">
                          {request.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-50 rounded-lg group-hover:text-rose-500 transition-colors">
                          <Clock size={18} />
                        </div>
                        <span className="text-sm font-semibold uppercase">
                          {request.time}
                        </span>
                      </div>
                    </div>

                    {/* View Button */}
                    <Link
                      to={`/donation-details`}
                      state={{ requestId: request._id }}
                      className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-rose-600 shadow-lg shadow-slate-200 hover:shadow-rose-300 transition-all active:scale-95"
                    >
                      View Details <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-rose-100 max-w-lg mx-auto">
              <p className="text-slate-400 font-bold text-lg">
                No pending donation requests right now.
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default BloodDonationReq;
