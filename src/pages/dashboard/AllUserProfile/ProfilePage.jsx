import { useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes, FaUserCircle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

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
      .then((res) => res.json())
      .then((data) => setDistrictData(data));
  }, []);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilaData(data));
  }, []);

  useEffect(() => {
    if (district) {
      const result = upazilaData.filter((u) => u.district_id === district);
      setFilteredUpazilas(result);
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

    const selectedDistrict = districtData.find((d) => d.id === district);
    const districtName = selectedDistrict ? selectedDistrict.name : "";

    const updateUser = {
      name: name,
      image: avatar,
      bloodGroup,
      district: districtName,
      upazila: upazilaName,
      status: "active",
    };

    try {
      const res = await axiosSecure.put(`/users/${user?.email}`, updateUser);
      if (res.data.success) {
        setIsEditable(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }

    updateProfileFunc(name, avatar).then(() => {
      setUser({ ...user, displayName: name, photoURL: avatar });
      toast.success("Profile Updated Successfully! 🎉");
      setLoading(false);
    });
  };

  return (
    <div className="max-w-6xl mx-auto my-12 md:my-22 p-5 md:p-8">
      <Helmet>
        <title>RedUnity | My Profile</title>
      </Helmet>
      {/* Header - Dark/Red Gradient */}
      <div
        data-aos="fade-down"
        className="p-5 mb-12 border-t-5 border-red-400 shadow-md rounded-xl md:p-8 text-white"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="relative group">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-24 h-24 border-red-500 rounded-2xl border-2 border-red-00 object-cover rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-xl"
                />
              ) : (
                <FaUserCircle className="text-7xl text-zinc-700" />
              )}
              <div className="absolute -bottom-2 -right-2 bg-red-600 px-2 py-0.5 rounded text-[10px] font-bold">
                LIVE
              </div>
            </div>
            <div>
              <h1 className="text-4xl text-black font-black italic tracking-tighter">
                My Profile
              </h1>

              <p className="text-gray-500 italic text-sm mt-1">
                Route: /dashboard/my-profile
              </p>
            </div>
          </div>

          {!isEditable ? (
            <button
              type="button"
              onClick={() => setIsEditable(true)}
              className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-red-900/40 uppercase tracking-wider"
            >
              <FaEdit /> Edit Profile
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditable(false)}
              className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all uppercase tracking-wider"
            >
              <FaTimes /> Cancel
            </button>
          )}
        </div>
      </div>
      <div data-aos="fade-up" className="rounded-xl overflow-hidden shadow-xl">
        <form
          onSubmit={handleUpdate}
          className="p-8 md:p-12 border-2 border-gray-100 rounded-xl bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {/* Input Groups */}
            {[
              {
                label: "Display Name",
                name: "name",
                value: user?.displayName,
                type: "text",
              },
              {
                label: "Email Address",
                name: "email",
                value: user?.email,
                type: "email",
                disabled: true,
              },
              {
                label: "Profile Image Link",
                name: "avatar",
                value: user?.photoURL,
                type: "text",
              },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  defaultValue={field.value}
                  readOnly={field.disabled || !isEditable}
                  className={`px-5 py-4 rounded-xl border-2 transition-all outline-none 
                    ${
                      field.disabled
                        ? "bg-zinc-100 border-zinc-100 text-zinc-400"
                        : !isEditable
                        ? "bg-zinc-50 border-zinc-100 text-zinc-700"
                        : "bg-white border-red-00 text-black shadow-inner"
                    }`}
                />
              </div>
            ))}

            {/* Blood Group */}
            <div className="flex flex-col">
              <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">
                Blood Type
              </label>
              <select
                name="bloodGroup"
                disabled={!isEditable}
                required
                className={`px-5 py-4 rounded-xl border-2 transition-all outline-none  appearance-none
                  ${
                    !isEditable
                      ? "bg-zinc-50 border-zinc-100 text-zinc-700"
                      : "bg-white border-red-00 text-black"
                  }`}
              >
                <option value="">Select Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (bg) => (
                    <option key={bg}>{bg}</option>
                  )
                )}
              </select>
            </div>

            {/* District */}
            <div className="flex flex-col">
              <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">
                Current District
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={!isEditable}
                required
                className={`px-5 py-4 rounded-xl border-2 transition-all outline-none 
                   ${
                     !isEditable
                       ? "bg-zinc-50 border-zinc-100 text-zinc-700"
                       : "bg-white border-red-00 text-black"
                   }`}
              >
                <option value="">Select District</option>
                {districtData.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div className="flex flex-col">
              <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">
                Area / Upazila
              </label>
              <select
                name="upazila"
                disabled={!isEditable || !district}
                required
                className={`px-5 py-4 rounded-xl border-2 transition-all outline-none 
                   ${
                     !isEditable
                       ? "bg-zinc-50 border-zinc-100 text-zinc-700"
                       : "bg-white border-red-00 text-black"
                   }`}
              >
                <option value="">Select Upazila</option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Button */}
          {isEditable && (
            <div className="mt-16 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`group relative overflow-hidden w-full max-w-lg py-4 rounded-2xl font-black tracking-[0.2em] transition-all duration-300
                ${
                  loading
                    ? "bg-zinc-300 text-zinc-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-red-600 shadow-2xl active:scale-95"
                }`}
              >
                {loading ? (
                  <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                ) : (
                  <span className="flex items-center justify-center gap-3 uppercase">
                    <FaSave /> Save Changes
                  </span>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
