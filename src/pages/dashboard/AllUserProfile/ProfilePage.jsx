/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { FaSave, FaTimes, FaUserCircle } from "react-icons/fa";
import {
  MapPin,
  Mail,
  Droplets,
  ShieldCheck,
  Calendar,
  Camera,
  User,
  Pencil,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

/* ── info pill ── */
const PILL_COLORS = {
  rose: "bg-rose-50    text-rose-600    border-rose-100",
  blue: "bg-blue-50    text-blue-600    border-blue-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  amber: "bg-amber-50   text-amber-600   border-amber-100",
};

const InfoPill = ({ icon: Icon, label, value, accent = "rose" }) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${PILL_COLORS[accent]}`}
  >
    <Icon size={16} className="shrink-0" />
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider opacity-60">
        {label}
      </p>
      <p className="text-sm font-bold leading-none mt-0.5">{value || "—"}</p>
    </div>
  </div>
);

/* ── field wrapper ── */
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    {children}
  </div>
);

/* ── shared input class builders ── */
const base =
  "px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 w-full";
const cls = {
  editable: `${base} bg-white border-slate-200 text-slate-800 focus:border-rose-400 focus:ring-2 focus:ring-rose-100`,
  readonly: `${base} bg-slate-50 border-slate-100 text-slate-500 cursor-default`,
  disabled: `${base} bg-slate-100 border-slate-100 text-slate-400 cursor-not-allowed`,
};

/* ════════════════════════════════════════════════ */
const ProfilePage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);
  const [district, setDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const { user, setUser, loading, setLoading, updateProfileFunc } = useAuth();
  const axiosSecure = useAxiosSecure();

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const avatar = form.avatar.value;
    const bloodGroup = form.bloodGroup.value;
    const upazilaName = form.upazila.value;
    const selected = districtData.find((d) => d.id === district);
    const districtName = selected ? selected.name : "";

    const updateUser = {
      name,
      image: avatar,
      bloodGroup,
      district: districtName,
      upazila: upazilaName,
      status: "active",
    };

    try {
      const res = await axiosSecure.put(`/users/${user?.email}`, updateUser);
      if (res.data.success) setIsEditable(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile.");
    }

    updateProfileFunc(name, avatar).then(() => {
      setUser({ ...user, displayName: name, photoURL: avatar });
      toast.success("Profile Updated Successfully! 🎉");
      setLoading(false);
    });
  };

  const joinDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>RedUnity | My Profile</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10 space-y-8 md:space-y-10">
        {/* ── Hero banner ── */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-rose-600 via-red-500 to-pink-600 shadow-md shadow-rose-200">
          {/* decorative blobs */}
          <div className="absolute -top-12 -right-12 w-52 h-52 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-52 h-52 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          {/* dot grid */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative p-6 md:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* avatar */}
            <div className="relative shrink-0">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-16 h-16 rounded-2xl object-cover border border-white/30 shadow-xl"
                />
              ) : (
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white/20 border-4 border-white/30 flex items-center justify-center">
                  <FaUserCircle className="text-5xl text-white/70" />
                </div>
              )}
              <span className="absolute -bottom-2 -right-2 bg-white text-rose-600 text-[8px] font-black px-2 py-0.5 rounded shadow-md uppercase">
                Active
              </span>
            </div>

            {/* name + badges */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-white/70 text-sm font-medium mb-1">
                Blood Donor
              </p>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {user?.displayName || "Your Name"}
              </h1>
              <p className="text-white/60 text-sm mt-1">{user?.email}</p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                {[
                  { icon: Droplets, text: "Blood group active" },
                  { icon: ShieldCheck, text: "Verified donor" },
                  { icon: Calendar, text: `Joined ${joinDate}` },
                  // eslint-disable-next-line no-unused-vars
                ].map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20"
                  >
                    <Icon size={12} /> {text}
                  </span>
                ))}
              </div>
            </div>

            {/* edit / cancel */}
            <div className="shrink-0">
              {!isEditable ? (
                <button
                  type="button"
                  onClick={() => setIsEditable(true)}
                  className="inline-flex items-center gap-2 bg-white text-rose-600 hover:bg-rose-50 max-sm:text-sm cursor-pointer font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-lg  shadow-md transition-all"
                >
                  <Pencil size={15} /> Edit profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditable(false)}
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white max-sm:text-sm cursor-pointer font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-lg  border border-white/30 transition-all"
                >
                  <FaTimes /> Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Quick info pills ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <InfoPill
            icon={User}
            label="Name"
            value={user?.displayName}
            accent="rose"
          />
          <InfoPill
            icon={Mail}
            label="Email"
            value={user?.email?.split("@")[0] + "\u2026"}
            accent="blue"
          />
          <InfoPill
            icon={Droplets}
            label="Blood group"
            value="A+"
            accent="rose"
          />
          <InfoPill
            icon={MapPin}
            label="Location"
            value="Dhaka"
            accent="emerald"
          />
        </div>

        {/* ── Edit form card ── */}
        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
          {/* card header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
              <User size={16} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-700">
                Profile information
              </h2>
              <p className="text-xs text-slate-400">
                {isEditable
                  ? "You can now edit your details below."
                  : "Click Edit profile to make changes."}
              </p>
            </div>
            {isEditable && (
              <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Editing
              </span>
            )}
          </div>

          <form onSubmit={handleUpdate} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Display name */}
              <Field label="Display name">
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.displayName}
                  readOnly={!isEditable}
                  className={isEditable ? cls.editable : cls.readonly}
                />
              </Field>

              {/* Email — always read-only */}
              <Field label="Email address">
                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email}
                  readOnly
                  className={cls.disabled}
                />
              </Field>

              {/* Avatar URL */}
              <Field label="Profile image URL">
                <div className="relative">
                  <input
                    type="text"
                    name="avatar"
                    defaultValue={user?.photoURL}
                    readOnly={!isEditable}
                    className={`${isEditable ? cls.editable : cls.readonly} pr-10`}
                  />
                  <Camera
                    size={15}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300"
                  />
                </div>
              </Field>

              {/* Blood group */}
              <Field label="Blood type">
                <select
                  name="bloodGroup"
                  disabled={!isEditable}
                  required
                  className={isEditable ? cls.editable : cls.disabled}
                >
                  <option value="">Select group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ),
                  )}
                </select>
              </Field>

              {/* District */}
              <Field label="District">
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  disabled={!isEditable}
                  required
                  className={isEditable ? cls.editable : cls.disabled}
                >
                  <option value="">Select district</option>
                  {districtData.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Upazila */}
              <Field label="Upazila / Area">
                <select
                  name="upazila"
                  disabled={!isEditable || !district}
                  required
                  className={
                    isEditable && district ? cls.editable : cls.disabled
                  }
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

            {/* Save button */}
            {isEditable && (
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center gap-2.5 font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-lg transition-all duration-200 shadow-md
                    ${
                      loading
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200 active:scale-95"
                    }`}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Saving&hellip;
                    </>
                  ) : (
                    <>
                      <FaSave size={14} /> Save changes
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* ── Account security ── */}
        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
              <ShieldCheck size={16} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-700">
                Account security
              </h2>
              <p className="text-xs text-slate-400">
                Manage your account access and security settings.
              </p>
            </div>
          </div>
          <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Account status
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Your account is currently active and in good standing.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
