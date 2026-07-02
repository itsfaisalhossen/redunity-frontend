/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Droplets,
  User,
  Mail,
  MapPin,
  Hospital,
  FileText,
  Calendar,
  Clock,
  Send,
  Info,
  ChevronRight,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

/* ── field wrapper ── */
const Field = ({ label, icon: Icon, children, hint }) => (
  <div className="flex flex-col gap-1.5">
    <label className="flex items-center gap-1.5 text-[12px] font-bold dark:text-white/90 text-slate-600 uppercase tracking-wide">
      {Icon && <Icon size={14} className="text-slate-500 dark:text-white" />}
      {label}
    </label>
    {children}
    {hint && <p className="text-[11px] text-slate-300 ml-1">{hint}</p>}
  </div>
);

const base =
  "w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all duration-200 bg-white dark:bg-gray-900/60 dark:border-slate-800 border-slate-200 text-slate-800 placeholder:text-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100";
const readonlyCls =
  "w-full px-4 py-3 rounded-xl dark:bg-gray-900/60 dark:border-slate-800 border text-sm bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed outline-none";

/* ── step indicator ── */
const steps = ["Requester", "Recipient", "Details", "Submit"];
const StepBar = ({ active }) => (
  <div className="flex items-center gap-0 mb-8">
    {steps.map((s, i) => {
      const done = i < active;
      const current = i === active;
      return (
        <div key={s} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300
                ${
                  done
                    ? "bg-rose-600 border-rose-600 text-white"
                    : current
                      ? "bg-white border-rose-500 text-rose-600 shadow-md shadow-rose-100"
                      : "bg-white border-slate-200 text-slate-300"
                }`}
            >
              {done ? "✓" : i + 1}
            </div>
            <span
              className={`text-[10px] font-semibold mt-1 tracking-wide
              ${current ? "text-rose-600" : done ? "text-rose-400" : "text-slate-300"}`}
            >
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-1 mb-4 rounded-full transition-all duration-500
              ${done ? "bg-rose-400" : "bg-slate-100"}`}
            />
          )}
        </div>
      );
    })}
  </div>
);

/* ════════════════════════════════════════════════ */
const CreateDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);
  const [district, setDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    fetch("/dristict.json")
      .then((r) => r.json())
      .then(setDistrictData);
  }, []);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((r) => r.json())
      .then(setUpazilaData);
  }, []);

  useEffect(() => {
    if (district) {
      setFilteredUpazilas(
        upazilaData.filter((u) => u.district_id === district),
      );
    } else {
      setFilteredUpazilas([]);
    }
  }, [district, upazilaData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target;

    const date = form.date.value;
    const time = form.time.value;
    const selectedDistrict = districtData.find((d) => d.id === district);

    const blood = {
      name: user?.displayName,
      email: user?.email,
      recipientName: form.recipientName.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      bloodGroup: form.bloodGroup.value,
      dateTime: new Date(`${date}T${time}`),
      detalsText: form.detalsText.value,
      districtName: selectedDistrict ? selectedDistrict.name : "",
      upazilaName: form.upazila.value,
    };

    try {
      const res = await axiosSecure.post("/bloods", blood);
      if (res.data.insertedId) {
        toast.success("Blood request sent successfully! 🩸");
        form.reset();
        setDistrict("");
        setActiveStep(0);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>RedUnity | Create Donation</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10 space-y-8 md:space-y-10">
        {/* ── Hero banner ── */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-rose-600 via-red-500 to-pink-600 shadow-xl shadow-rose-200  dark: dark:shadow-rose-700/30 p-6 md:p-10">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle,white 1px,transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 mb-3">
                <Droplets size={12} /> Blood donation request
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Create a Request
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Fill in the details below to send a blood donation request.
              </p>
            </div>
            {/* blood drop decoration */}
            <div className="hidden sm:flex items-center justify-center w-20 h-20 rounded-2xl bg-white/15 border border-white/20 shrink-0">
              <Droplets size={36} className="text-white/80" />
            </div>
          </div>
        </div>

        {/* ── Info tip ── */}
        <div className="dark:bg-gray-900/60 dark:border-slate-800  flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3.5">
          <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-600 font-medium leading-relaxed">
            Your request will be visible to all active donors. Make sure the
            hospital address and contact details are correct so donors can reach
            the recipient quickly.
          </p>
        </div>

        {/* ── Form card ── */}
        <div className="bg-white dark:bg-gray-900/60 dark:border-slate-800  border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
          {/* card header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-700">
            <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
              <FileText size={16} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-700 dark:text-white/90">
                Request form
              </h2>
              <p className="text-xs text-slate-400">
                All fields marked are required.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
            {/* step bar */}
            <StepBar active={activeStep} />

            {/* ── Section 1: Requester info ── */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-black flex items-center justify-center">
                  1
                </span>
                <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                  Requester info
                </h3>
                <div className="flex-1 h-px bg-slate-100 dark:bg-slate-400" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Your name" icon={User}>
                  <input
                    type="text"
                    defaultValue={user?.displayName}
                    readOnly
                    className={readonlyCls}
                  />
                </Field>
                <Field label="Your email" icon={Mail}>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    readOnly
                    className={readonlyCls}
                  />
                </Field>
              </div>
            </div>

            {/* ── Section 2: Recipient info ── */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-black flex items-center justify-center">
                  2
                </span>
                <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                  Recipient info
                </h3>
                <div className="flex-1 h-px bg-slate-100 dark:bg-slate-400" />
              </div>

              <Field label="Recipient name" icon={User}>
                <input
                  type="text"
                  name="recipientName"
                  placeholder="Full name of the recipient"
                  required
                  className={base}
                  onFocus={() => setActiveStep(1)}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Recipient district" icon={MapPin}>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                    className={base}
                    onFocus={() => setActiveStep(1)}
                  >
                    <option value="">Select district</option>
                    {districtData.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Recipient upazila" icon={MapPin}>
                  <select
                    name="upazila"
                    required
                    disabled={!district}
                    className={district ? base : readonlyCls}
                    onFocus={() => setActiveStep(1)}
                  >
                    <option value="">Select upazila</option>
                    {filteredUpazilas.map((u) => (
                      <option key={u.id} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field
                label="Hospital name"
                icon={Hospital}
                hint="e.g. Dhaka Medical College Hospital"
              >
                <input
                  type="text"
                  name="hospitalName"
                  placeholder="Where should the donor go?"
                  required
                  className={base}
                  onFocus={() => setActiveStep(1)}
                />
              </Field>

              <Field
                label="Full address"
                icon={MapPin}
                hint="e.g. Zahir Raihan Rd, Dhaka 1000"
              >
                <input
                  type="text"
                  name="fullAddress"
                  placeholder="Street, area, city"
                  required
                  className={base}
                  onFocus={() => setActiveStep(1)}
                />
              </Field>
            </div>

            {/* ── Section 3: Donation details ── */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-black flex items-center justify-center">
                  3
                </span>
                <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                  Donation details
                </h3>
                <div className="flex-1 h-px bg-slate-100 dark:bg-slate-400" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Blood group" icon={Droplets}>
                  <select
                    name="bloodGroup"
                    required
                    className={base}
                    onFocus={() => setActiveStep(2)}
                  >
                    <option value="">Select</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ),
                    )}
                  </select>
                </Field>

                <Field label="Donation date" icon={Calendar}>
                  <input
                    type="date"
                    name="date"
                    required
                    className={base}
                    onFocus={() => setActiveStep(2)}
                  />
                </Field>

                <Field label="Donation time" icon={Clock}>
                  <input
                    type="time"
                    name="time"
                    required
                    className={base}
                    onFocus={() => setActiveStep(2)}
                  />
                </Field>
              </div>

              <Field
                label="Why is blood needed?"
                icon={FileText}
                hint="Explain the urgency so donors can prioritize."
              >
                <textarea
                  name="detalsText"
                  rows={4}
                  placeholder="Describe the situation in detail — why blood is urgently needed, the patient condition, etc."
                  required
                  className={`${base} resize-none`}
                  onFocus={() => setActiveStep(2)}
                />
              </Field>
            </div>

            {/* ── Divider ── */}
            <div className="h-px bg-slate-100" />

            {/* ── Submit ── */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <Info size={12} />
                Status will be set to{" "}
                <span className="font-semibold text-amber-600">Pending</span> by
                default.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => setActiveStep(3)}
                className={`inline-flex items-center gap-2.5 text-white max-sm:text-sm cursor-pointer font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-lg transition-all duration-200 shadow-md
                  ${
                    isSubmitting
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200 dark:shadow-rose-400/60  active:scale-95"
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Sending request&hellip;
                  </>
                ) : (
                  <>
                    <Send size={15} /> Send donation request
                    <ChevronRight size={15} className="opacity-60" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ── Bottom tip card ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              icon: Droplets,
              title: "Blood group matters",
              desc: "Double-check the blood group before submitting.",
            },
            {
              icon: MapPin,
              title: "Exact location helps",
              desc: "Donors need a precise address to arrive on time.",
            },
            {
              icon: Clock,
              title: "Time is critical",
              desc: "Set a realistic date and time for the donation.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white dark:bg-gray-900/60 dark:border-slate-800  border border-slate-100 rounded-2xl p-4 flex items-start gap-3 shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-400 shrink-0">
                <Icon size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700 dark:text-white/90">
                  {title}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
