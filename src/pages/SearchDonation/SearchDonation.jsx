/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../ui/Container";
import { Link } from "react-router";
import {
  Search, MapPin, Droplet, User, Mail, Heart, Zap,
  Clock, Shield, Phone, Users, Activity, Star,
  ChevronRight, ArrowRight,
} from "lucide-react";

/* ────────────────── Constants ───────────────────── */
const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const BLOOD_META = {
  "A+":  { grad: "from-rose-500 to-red-600",      shadow: "shadow-rose-400/40"   },
  "A-":  { grad: "from-rose-400 to-pink-600",     shadow: "shadow-pink-400/40"   },
  "B+":  { grad: "from-orange-500 to-red-500",    shadow: "shadow-orange-400/40" },
  "B-":  { grad: "from-orange-400 to-amber-600",  shadow: "shadow-amber-400/40"  },
  "AB+": { grad: "from-purple-500 to-rose-600",   shadow: "shadow-purple-400/40" },
  "AB-": { grad: "from-violet-500 to-purple-700", shadow: "shadow-violet-400/40" },
  "O+":  { grad: "from-red-500 to-rose-700",      shadow: "shadow-red-400/40"    },
  "O-":  { grad: "from-red-600 to-red-800",       shadow: "shadow-red-500/40"    },
};

const TIPS = [
  { icon: Zap,    title: "Takes Only 10 Minutes", desc: "The entire donation process is quick and virtually painless.",  iconColor: "text-amber-500",  iconBg: "bg-amber-50 dark:bg-amber-900/20"   },
  { icon: Shield, title: "100% Safe",             desc: "All equipment is sterile and used only once per donor.",        iconColor: "text-emerald-500", iconBg: "bg-emerald-50 dark:bg-emerald-900/20"},
  { icon: Clock,  title: "Blood Expires",         desc: "Donated blood has a shelf life — regular donors are vital.",   iconColor: "text-sky-500",    iconBg: "bg-sky-50 dark:bg-sky-900/20"       },
  { icon: Star,   title: "Be a Hero",             desc: "One donation can save up to three lives simultaneously.",      iconColor: "text-rose-500",   iconBg: "bg-rose-50 dark:bg-rose-900/20"     },
];

/* ───────────────────── useScrollReveal — adds a class when element enters viewport ───────────────────── */
const useScrollReveal = () => {
  const ref     = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el  = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
};

/* ─────────────────── Donor Card ───────────────────── */
const DonorCard = ({ donor, index }) => {
  const meta = BLOOD_META[donor.bloodGroup] || BLOOD_META["O+"];

  return (
    <div
      className="group relative bg-white dark:bg-slate-800/70 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700/50 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* animated top strip */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${meta.grad} group-hover:h-2 transition-all duration-300`} />

      {/* glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${meta.grad} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none`} />

      <div className="p-7 relative z-10">
        {/* blood badge */}
        <div className="flex items-start justify-between mb-6">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${meta.grad} flex items-center justify-center shadow-lg ${meta.shadow} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
            <span className="text-white text-xl font-black">{donor.bloodGroup}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available
          </span>
        </div>

        <h3 className="text-xl font-black text-slate-800 dark:text-white mb-4 flex items-center gap-2 group-hover:text-rose-600 transition-colors duration-300">
          <User size={16} className="text-slate-400" />
          {donor.name}
        </h3>

        <div className="space-y-2.5 mb-6">
          <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400 text-sm font-medium">
            <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-700 flex items-center justify-center shrink-0">
              <Mail size={13} />
            </div>
            <span className="truncate">{donor.email}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300 text-sm font-semibold">
            <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
              <MapPin size={13} className="text-rose-500" />
            </div>
            {donor.upazila}, {donor.district}
          </div>
        </div>

        <button className={`w-full py-3 bg-gradient-to-r ${meta.grad} text-white text-xs font-black rounded-xl shadow-md ${meta.shadow} hover:shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200 tracking-widest uppercase flex items-center justify-center gap-2`}>
          <Phone size={14} />
          Contact Donor
        </button>
      </div>
    </div>
  );
};

/* ─────────────────── Main Component ────────────────────── */
const SearchDonation = () => {
  const axiosSecure = useAxiosSecure();
  const [districts, setDistricts] = useState([]);
  const [upazilas,  setUpazilas]  = useState([]);
  const [donors,    setDonors]    = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [searched,  setSearched]  = useState(false);
  /* scroll reveal refs */
  // const [statsRef,  statsVis] = useScrollReveal();
  const [formRef,   formVis]  = useScrollReveal();
  const [typesRef,  typesVis] = useScrollReveal();
  const [tipsRef,   tipsVis]  = useScrollReveal();
  const [ctaRef,    ctaVis]   = useScrollReveal();
  const [resultsRef,resultsVis] = useScrollReveal();

  useEffect(() => {
    fetch("/dristict.json").then((r) => r.json()).then(setDistricts);
  }, []);

  const handleDistrictChange = (e) => {
    setUpazilas([]);
    const id = e.target.selectedOptions[0].getAttribute("data-id");
    fetch("/upazilas.json")
      .then((r) => r.json())
      .then((data) => setUpazilas(data.filter((u) => u.district_id === id)));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true); setSearched(true);
    const f = e.target;
    try {
      const res = await axiosSecure.get(
        `/search-donors?bloodGroup=${encodeURIComponent(f.bloodGroup.value)}&district=${encodeURIComponent(f.district.value)}&upazila=${encodeURIComponent(f.upazila.value)}`
      );
      setDonors(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectClass = "w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-5 md:px-6 py-3 font-medium rounded-lg pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all";

  return (
    <div className="dark:bg-primary-dark overflow-x-hidden">
      <Container>
      {/* ═════════════════ HERO ════════════════════ */}
      <section className="relative pt-20 pb-36 px-4 overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #e11d48 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />

        {/* Floating particles */}
        {[
          "top-[10%] left-[8%]  w-3 h-3 delay-0",
          "top-[22%] left-[78%] w-2 h-2 delay-300",
          "top-[60%] left-[5%]  w-4 h-4 delay-500",
          "top-[75%] left-[88%] w-2 h-2 delay-150",
          "top-[40%] left-[92%] w-3 h-3 delay-700",
          "top-[85%] left-[20%] w-2 h-2 delay-1000",
          "top-[15%] left-[50%] w-2 h-2 delay-200",
          "top-[50%] left-[60%] w-3 h-3 delay-600",
        ].map((cls, i) => (
          <div
            key={i}
            className={`absolute ${cls} rounded-full bg-rose-400/30 dark:bg-rose-500/20 animate-bounce pointer-events-none`}
          />
        ))}

        <div className="relative container mx-auto max-w-5xl text-center">

          {/* Eyebrow — slides in from top */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 dark:bg-rose-900/30 border border-rose-100 dark:border-rose-800/50 text-rose-600 dark:text-rose-400 text-xs font-black uppercase tracking-widest mb-6 animate-[fadeInDown_0.6s_ease-out_both]">
            <Droplet size={12} className="fill-rose-500 animate-pulse" />
            Bangladesh Blood Network
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl leading-tight font-black dark:text-white mb-6 animate-[fadeInUp_0.7s_0.1s_ease-out_both]">
            Find the{" "}
            <span className="relative inline-block">
              <span className="text-rose-600">Right Donor</span>
              {/* underline draws in */}
              <span className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-rose-600 to-red-500 rounded-full origin-left animate-[scaleX_0.6s_0.7s_ease-out_both] scale-x-0" />
            </span>
            <br />Save a Life Today
          </h1>

          <p className="md:text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto mb-6 animate-[fadeInUp_0.6s_0.3s_ease-out_both]">
            Search verified blood donors across every district and upazila in Bangladesh — fast, free, and life-saving.
          </p>

          {/* Blood type chips */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {BLOOD_TYPES.map((b, i) => (
              <div
                key={b}
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${BLOOD_META[b].grad} text-white text-sm font-black flex items-center justify-center shadow-md hover:scale-125 hover:-rotate-6 hover:shadow-xl active:scale-95 transition-all duration-300 cursor-default select-none animate-[zoomIn_0.4s_ease-out_both]`}
                style={{ animationDelay: `${0.5 + i * 0.06}s` }}
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ SEARCH FORM ════════════════════ */}
      <section className="px-4 -mt-14 relative z-10">
          <div
            ref={formRef}
            className={`bg-white dark:bg-slate800 back-drop-b rounded-3xl shadow-2xl shadow-slate-300/40 dark:shadow-slate-900/60 border border-slate-100  p-8 md:p-10 transition-all duration-700 ${formVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center animate-spin" style={{ animationDuration: "8s" }}>
                <Search size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white leading-none">Search Donors</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Fill all fields to find available donors</p>
              </div>
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-end">

              {/* Blood Group */}
              <div className={`space-y-2 transition-all duration-500 delay-100 ${formVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <label className="text-xs font-black text-rose-600 uppercase tracking-widest">Blood Group</label>
                <select name="bloodGroup" required className={selectClass}>
                  <option value="">Select Group</option>
                  {BLOOD_TYPES.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              {/* District */}
              <div className={`space-y-2 transition-all duration-500 delay-150 ${formVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <label className="text-xs font-black text-rose-600 uppercase tracking-widest">District</label>
                <select name="district" required onChange={handleDistrictChange} className={selectClass}>
                  <option value="">Select District</option>
                  {districts.map((d) => <option key={d.id} value={d.name} data-id={d.id}>{d.name}</option>)}
                </select>
              </div>

              {/* Upazila */}
              <div className={`space-y-2 transition-all duration-500 delay-200 ${formVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <label className="text-xs font-black text-rose-600 uppercase tracking-widest">Upazila</label>
                <select name="upazila" required className={selectClass}>
                  <option value="">Select Upazila</option>
                  {upazilas.map((u) => <option key={u.id} value={u.name}>{u.name}</option>)}
                </select>
              </div>

              {/* Button */}
              <div className={`transition-all duration-500 delay-300 ${formVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <button
                  type="submit"
                  className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-black text-sm tracking-widest uppercase shadow-lg shadow-rose-300/50 hover:shadow-rose-400/60 hover:from-rose-700 hover:to-red-700 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <Search size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                  Search
                </button>
              </div>
            </form>
          </div>
      </section>

      {/* ══════════════════ RESULTS ══════════════════════ */}
      <section ref={resultsRef} className="px-4 py-16">
          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-5">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-rose-100 dark:border-rose-900" />
                <div className="absolute inset-0 rounded-full border-4 border-t-rose-600 border-r-rose-600 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart size={22} className="text-rose-600 fill-rose-600 animate-pulse" />
                </div>
              </div>
              <p className="text-slate-400 dark:text-slate-500 font-semibold animate-pulse">Searching for donors…</p>
            </div>
          )}

          {/* Results grid */}
          {!loading && searched && donors.length > 0 && (
            <div className={`transition-all duration-700 ${resultsVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    {donors.length} Donor{donors.length !== 1 ? "s" : ""} Found
                  </h2>
                  <p className="text-sm text-slate-400 font-medium mt-1">Showing all available matches</p>
                </div>
                <span className="px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-black animate-bounce">
                  {donors.length} results
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donors.map((donor, i) => <DonorCard key={donor._id} donor={donor} index={i} />)}
              </div>
            </div>
          )}

          {/* Empty */}
          {!loading && searched && donors.length === 0 && (
            <div className="text-center py-24 animate-[fadeInUp_0.5s_ease-out_both]">
              <div className="w-20 h-20 rounded-3xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mx-auto mb-6 animate-bounce">
                <Search size={32} className="text-rose-300 dark:text-rose-700" />
              </div>
              <h3 className="text-xl font-black text-slate-700 dark:text-slate-300 mb-2">No donors found</h3>
              <p className="text-slate-400 font-medium">Try a different blood group or location.</p>
            </div>
          )}

          {/* Idle */}
          {!loading && !searched && (
            <div className="text-center py-20 text-slate-300 dark:text-slate-700 font-semibold text-lg">
              Use the search above to discover donors in your area.
            </div>
          )}
      </section>

      {/* ════════════════ BLOOD TYPE GUIDE ════════════════════ */}
      <section ref={typesRef} className="px-4 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-14">

            {/* Text side */}
            <div className={`flex-1 transition-all duration-700 ${typesVis ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-xs font-black uppercase tracking-widest mb-4">
                <Droplet size={11} className="fill-rose-500 animate-pulse" />
                Blood Type Guide
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                Know Your <span className="text-rose-600">Blood Type</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">
                Blood type compatibility is critical for safe transfusions. O− is the universal donor; AB+ is the universal recipient. Always verify compatibility before donation.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-rose-600 font-black text-sm hover:gap-4 transition-all duration-300 group">
                Learn more about compatibility
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            {/* Blood type grid */}
            <div className={`flex-1 grid grid-cols-5 md:grid-cols-4 gap-3 transition-all duration-700 delay-200 ${typesVis ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              {BLOOD_TYPES.map((b, i) => (
                <div
                  key={b}
                  className={`aspect-square p-2 rounded-2xl bg-gradient-to-br ${BLOOD_META[b].grad} flex flex-col items-center justify-center shadow-lg hover:scale-110 hover:-rotate-6 hover:shadow-xl transition-all duration-300 cursor-default select-none`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <span className="text-white text-xl font-black">{b}</span>
                  <span className="text-white/70 text-[10px] font-bold mt-0.5">
                    {b.includes("-") ? "Neg" : "Pos"}
                  </span>
                </div>
              ))}
            </div>
          </div>
      </section>

      {/* ════════════════ WHY DONATE ═════════════════════ */}
      <section ref={tipsRef} className="px-4 py-20 bg-white dark:bg-slate-950 rounded-xl md:rounded-2xl">
          <div className={`text-center mb-14 transition-all duration-700 ${tipsVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-xs font-black uppercase tracking-widest mb-4">
              <Heart size={11} className="fill-rose-500 animate-pulse" />
              Why It Matters
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
              Reasons to Donate Blood
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIPS.map(({ icon: Icon, title, desc, iconColor, iconBg }, i) => (
              <div
                key={title}
                className={`group p-7 rounded-3xl border border-slate-100 dark:border-slate-700/50 hover:border-rose-200 dark:hover:border-rose-800/50 bg-white dark:bg-slate-800/50 hover:shadow-xl hover:shadow-rose-100/30 dark:hover:shadow-rose-900/20 hover:-translate-y-2 transition-all duration-400 cursor-default ${tipsVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <Icon size={22} className={iconColor} />
                </div>
                <h3 className="text-base font-black text-slate-800 dark:text-white mb-2 group-hover:text-rose-600 transition-colors duration-300">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
      </section>

      {/* ════════════════════ EMERGENCY CTA ═════════════════════ */}
      <section ref={ctaRef} className="px-4 py-16">
          <div className={`relative rounded-3xl overflow-hidden bg-slate-900 dark:bg-slate-800 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-700 ${ctaVis ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>

            {/* Animated glow orbs */}
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-rose-600/20 blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute -bottom-20 -right-10 w-56 h-56 rounded-full bg-red-700/20 blur-3xl animate-pulse delay-500 pointer-events-none" />

            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />

            <div className="relative text-center md:text-left">
              <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                <span className="text-red-400 text-xs font-black uppercase tracking-widest">Emergency Need</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Can't find a donor?</h2>
              <p className="text-slate-400 font-medium max-w-md">
                Post an urgent blood request and let our volunteer network respond within minutes.
              </p>
            </div>

            <div className="relative flex flex-col sm:flex-row gap-3 shrink-0">
              <Link to={'/donation-requests'}
                className="px-5 md:px-6 py-3 font-medium rounded-lg bg-white/10 border border-white/20 text-white text-sm tracking-widest uppercase hover:bg-white/20 hover:-translate-y-1 active:scale-95 transition-all duration-200 flex items-center gap-2 group"
              >
                View Requests
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
      </section>

      {/* ═════════════════ KEYFRAME STYLES (injected via style tag)      ════════════ */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-24px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.5) rotate(-12deg); }
          to   { opacity: 1; transform: scale(1)   rotate(0);      }
        }
        @keyframes scaleX {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .animate-\\[fadeInDown_0\\.6s_ease-out_both\\] { animation: fadeInDown 0.6s ease-out both; }
        .animate-\\[fadeInUp_0\\.7s_0\\.1s_ease-out_both\\] { animation: fadeInUp 0.7s 0.1s ease-out both; }
        .animate-\\[fadeInUp_0\\.6s_0\\.3s_ease-out_both\\] { animation: fadeInUp 0.6s 0.3s ease-out both; }
        .animate-\\[fadeInUp_0\\.5s_ease-out_both\\] { animation: fadeInUp 0.5s ease-out both; }
        .animate-\\[zoomIn_0\\.4s_ease-out_both\\] { animation: zoomIn 0.4s ease-out both; }
        .animate-\\[scaleX_0\\.6s_0\\.7s_ease-out_both\\] { animation: scaleX 0.6s 0.7s ease-out both; }
      `}</style>
    </Container>
    </div>
  );
};

export default SearchDonation;