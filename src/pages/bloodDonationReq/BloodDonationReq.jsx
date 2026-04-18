import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { useState, useEffect, useMemo } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../ui/Container";
import useAuth from "../../hooks/useAuth";
import {
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Droplet,
  Search,
  UserPlus,
  Users,
  HeartHandshake,
  ChevronDown,
  X,
} from "lucide-react";


const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// ── Skeleton Card ──
const SkeletonCard = () => (
  <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-xl shadow-rose-100/30 dark:shadow-none overflow-hidden animate-pulse">
    <div className="p-8">
      <div className="flex justify-between items-start mb-6">
        <div className="w-14 h-14 bg-slate-200 dark:bg-slate-700 rounded-xl" />
        <div className="w-20 h-7 bg-slate-200 dark:bg-slate-700 rounded-full" />
      </div>
      <div className="w-3/4 h-7 bg-slate-200 dark:bg-slate-700 rounded-lg mb-4" />
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="w-2/3 h-4 bg-slate-200 dark:bg-slate-700 rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="w-1/2 h-4 bg-slate-200 dark:bg-slate-700 rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="w-1/3 h-4 bg-slate-200 dark:bg-slate-700 rounded-md" />
        </div>
      </div>
      <div className="w-full h-11 bg-slate-200 dark:bg-slate-700 rounded-lg" />
    </div>
  </div>
);

const BloodDonationReq = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [filterBlood, setFilterBlood] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("");
  const [filterUpazila, setFilterUpazila] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);

  useEffect(() => {
    fetch("/dristict.json")
      .then((res) => res.json())
      .then((data) => setDistrictData(data));
  }, []);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilaData(data));
  }, []);

  const filteredUpazilas = useMemo(() => {
    if (!filterDistrict) return [];
    const selectedDistrict = districtData.find((d) => d.name === filterDistrict);
    if (!selectedDistrict) return [];
    return upazilaData.filter((u) => u.district_id === selectedDistrict.id);
  }, [filterDistrict, districtData, upazilaData]);

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["pending-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pending-blood-requests");
      return res.data;
    },
  });

  const filtered = useMemo(() => {
    if (!searchActive) return requests;
    return requests.filter((r) => {
      const matchBlood = filterBlood ? r.bloodGroup === filterBlood : true;
      const matchDistrict = filterDistrict ? r.districtName === filterDistrict : true;
      const matchUpazila = filterUpazila ? r.upazilaName === filterUpazila : true;
      return matchBlood && matchDistrict && matchUpazila;
    });
  }, [requests, searchActive, filterBlood, filterDistrict, filterUpazila]);

  const handleSearch = () => setSearchActive(true);
  const handleReset = () => {
    setFilterBlood("");
    setFilterDistrict("");
    setFilterUpazila("");
    setSearchActive(false);
  };

  return (
    <div className="dark:bg-primary-dark transition-colors duration-300 overflow-hidden">

      {/* ── CTA Hero Banner ── */}
      <div className="relative bg-rose-600 overflow-hidden py-12 md:py-14">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/20 rounded-full animate-[ping_5s_ease-in-out_infinite]"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/20 rounded-full animate-[ping_7s_ease-in-out_2s_infinite]"></div>
        <Droplet className="absolute right-8 top-8 w-40 h-40 text-white/20 animate-[spin_30s_linear_infinite]" />

        <div className="relative z-10 text-center px-4 opacity-0 animate-[fadeSlideDown_0.7s_ease_0.1s_forwards]">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse inline-block"></span>
            Live Requests
          </div>
          <h1 className="text-4xl md:text-5xl leading-tight font-black text-white mb-3">
            Every Drop
            <br className="hidden sm:block" />
            <span className="text-rose-100">Counts</span>
          </h1>
          <p className="text-rose-100 max-w-xl mx-auto mb-6 text-base md:text-lg font-medium">
            Browse pending blood donation requests and be someone&apos;s lifesaver today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!user && (
              <Link
                to="/auth/register"
                className="flex items-center gap-2 bg-white px-5 md:px-6 py-3 font-medium rounded-lg text-rose-600 font-black hover:bg-rose-50 hover:scale-105 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 active:scale-95"
              >
                <UserPlus size={20} />
                Join as a Donor
              </Link>
            )}
            <Link
              to="/search-donation"
              className="flex items-center gap-2 px-5 md:px-6 py-3 font-medium rounded-lg bg-rose-700/60 backdrop-blur border border-white/20 text-white hover:bg-rose-700 hover:scale-105 transition-all duration-300 active:scale-95"
            >
              <Users size={20} />
              Search Donors
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stats Strip ── */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 opacity-0 animate-[fadeSlideDown_0.6s_ease_0.3s_forwards]">
        <Container>
          <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-800 py-5">
            {[
              {
                icon: <Droplet size={20} className="text-rose-500 fill-rose-500" />,
                label: "Pending Requests",
                value: isLoading ? "—" : requests.length,
              },
              {
                icon: <HeartHandshake size={20} className="text-emerald-500" />,
                label: "Blood Groups",
                value: isLoading ? "—" : [...new Set(requests.map((r) => r.bloodGroup))].length,
              },
              {
                icon: <MapPin size={20} className="text-blue-500" />,
                label: "Districts",
                value: districtData.length || "—",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-4 py-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xl font-black text-slate-800 dark:text-white leading-none">{stat.value}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12 font-sans">

          {/* ── Search / Filter Panel ── */}
          <div className="mb-12 opacity-0 animate-[fadeSlideUp_0.6s_ease_0.4s_forwards]">
            <div className="bg-white dark:bg-slate-900/50 backdrop-blur border dark:border-slate-800 border-slate-100 rounded-[1rem] p-6 md:p-8 shadow-sm hover:shadow-lg hover:shadow-rose-500/5 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center text-rose-600">
                  <Search size={20} />
                </div>
                <div>
                  <h2 className="font-black text-slate-800 dark:text-white text-lg leading-tight">Find a Request</h2>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Filter by blood group, district or upazila</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">

                {/* Blood Group */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                    Blood Group
                  </label>
                  <div className="relative">
                    <select
                      value={filterBlood}
                      onChange={(e) => setFilterBlood(e.target.value)}
                      className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-5 md:px-6 py-3 font-medium rounded-lg pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all"
                    >
                      <option value="">All Groups</option>
                      {BLOOD_GROUPS.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* District */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                    District
                  </label>
                  <div className="relative">
                    <select
                      value={filterDistrict}
                      onChange={(e) => {
                        setFilterDistrict(e.target.value);
                        setFilterUpazila("");
                      }}
                      className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-5 md:px-6 py-3 font-medium rounded-lg pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all"
                    >
                      <option value="">All Districts</option>
                      {districtData.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Upazila */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                    Upazila
                  </label>
                  <div className="relative">
                    <select
                      value={filterUpazila}
                      onChange={(e) => setFilterUpazila(e.target.value)}
                      disabled={!filterDistrict}
                      className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-5 md:px-6 py-3 font-medium rounded-lg pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {filterDistrict ? "All Upazilas" : "Select District First"}
                      </option>
                      {filteredUpazilas.map((u) => (
                        <option key={u.id} value={u.name}>{u.name}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={handleSearch}
                  className="flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300 active:scale-95"
                >
                  <Search size={17} /> Search
                </button>
                {searchActive && (
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 active:scale-95"
                  >
                    <X size={17} /> Reset
                  </button>
                )}
                {searchActive && (
                  <span className="ml-auto text-sm font-semibold text-slate-400 dark:text-slate-500">
                    {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ── Section Header ── */}
          <div className="text-center mb-12 relative opacity-0 animate-[fadeSlideDown_0.6s_ease_0.15s_forwards]">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-32 bg-rose-500/10 blur-[80px] rounded-full pointer-events-none animate-pulse"></div>
            <h2 className="text-3xl md:text-4xl dark:text-white font-black text-slate-900 mb-3 tracking-tight">
              {searchActive ? "Search" : "Pending"}{" "}
              <span className="text-rose-600 inline-block animate-[pulse_3s_ease-in-out_infinite]">Donation</span>{" "}
              Requests
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Be a hero today. Check the list below to find someone in need of a blood donation and save a life.
            </p>
          </div>

          {/* ── Cards Grid ── */}
          {isLoading ? (
            // Skeleton loader — only cards area
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((request, idx) => (
                <div
                  key={request._id}
                  style={{ animationDelay: `${0.1 + idx * 0.08}s` }}
                  className="opacity-0 animate-[fadeSlideUp_0.6s_ease_forwards] group bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-xl shadow-rose-100/30 dark:shadow-none hover:shadow-rose-200/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-300/30 transition-all duration-500 overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-rose-600 text-white rounded-xl flex items-center justify-center text-xl font-black shadow-lg shadow-rose-200 dark:shadow-none group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-rose-400/40 transition-all duration-300">
                        {request.bloodGroup}
                      </div>
                      <span className="bg-rose-50 dark:bg-rose-950/30 text-rose-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-rose-100 dark:border-rose-900/50 animate-[pulse_3s_ease-in-out_infinite]">
                        Pending
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 italic leading-tight group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300">
                      {request.recipientName}
                    </h3>

                    <div className="space-y-4 mb-8 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-3 group/row hover:translate-x-1 transition-transform duration-200">
                        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover/row:bg-rose-50 dark:group-hover/row:bg-rose-900/20 group-hover/row:text-rose-500 transition-all duration-200">
                          <MapPin size={18} />
                        </div>
                        <span className="text-sm font-semibold">
                          {request.upazilaName}, {request.districtName}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 group/row hover:translate-x-1 transition-transform duration-200">
                        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover/row:bg-rose-50 dark:group-hover/row:bg-rose-900/20 group-hover/row:text-rose-500 transition-all duration-200">
                          <Calendar size={18} />
                        </div>
                        <p className="text-[13px] font-medium">
                          {new Date(request.dateTime).toLocaleDateString("en-GB")}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 group/row hover:translate-x-1 transition-transform duration-200">
                        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover/row:bg-rose-50 dark:group-hover/row:bg-rose-900/20 group-hover/row:text-rose-500 transition-all duration-200">
                          <Clock size={18} />
                        </div>
                        <p className="text-sm font-medium">
                          {new Date(request.dateTime).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/donation-details/${request?._id}`}
                      className="flex items-center justify-center gap-2 w-full px-5 md:px-6 py-3 font-medium rounded-lg bg-slate-900 dark:bg-rose-700 text-white hover:bg-rose-600 dark:hover:bg-rose-600 shadow-lg hover:shadow-rose-500/40 hover:gap-4 transition-all duration-300 active:scale-95"
                    >
                      View Details <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-rose-100 dark:border-slate-800 max-w-lg mx-auto opacity-0 animate-[fadeSlideUp_0.6s_ease_0.2s_forwards]">
              <Droplet size={40} className="mx-auto text-rose-200 mb-4" />
              <p className="text-slate-400 dark:text-slate-500 font-bold text-lg">
                {searchActive ? "No requests match your search." : "No pending donation requests right now."}
              </p>
              {searchActive && (
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 bg-rose-600 text-white text-sm font-bold rounded-xl hover:bg-rose-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {/* ── Bottom CTA ── */}
          <div className="mt-20 opacity-0 animate-[fadeSlideUp_0.7s_ease_0.3s_forwards]">
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-[1rem] p-10 md:p-16 overflow-hidden text-center">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-600/10 rounded-full animate-[ping_6s_ease-in-out_infinite]"></div>
              <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-rose-600/10 rounded-full animate-[ping_8s_ease-in-out_2s_infinite]"></div>
              <Droplet className="absolute right-10 bottom-6 w-32 h-32 text-white/5 animate-[spin_25s_linear_infinite]" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-rose-600/20 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                  <HeartHandshake size={14} /> Be a Hero
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  Ready to Save a Life?
                </h3>
                <p className="text-slate-400 max-w-lg mx-auto mb-8 text-base font-medium">
                  Register as a donor and join thousands of heroes who are making a difference every day.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {user ? (
                    <Link
                      to="/about-us"
                      className="flex items-center justify-center gap-2 px-5 md:px-6 py-3 font-medium rounded-lg bg-rose-600 hover:bg-rose-500 text-white hover:scale-105 hover:shadow-xl hover:shadow-rose-600/30 transition-all duration-300 active:scale-95"
                    >
                      <UserPlus size={20} /> Learn More
                    </Link>
                  ) : (
                    <Link
                      to="/auth/register"
                      className="flex items-center justify-center gap-2 px-5 md:px-6 py-3 font-medium rounded-lg bg-rose-600 hover:bg-rose-500 text-white hover:scale-105 hover:shadow-xl hover:shadow-rose-600/30 transition-all duration-300 active:scale-95"
                    >
                      <UserPlus size={20} /> Join as a Donor
                    </Link>
                  )}
                  <Link
                    to="/search-donation"
                    className="flex items-center justify-center gap-2 px-5 md:px-6 py-3 font-medium rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 text-white hover:scale-105 transition-all duration-300 active:scale-95"
                  >
                    <Users size={20} /> Search Donors
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default BloodDonationReq;