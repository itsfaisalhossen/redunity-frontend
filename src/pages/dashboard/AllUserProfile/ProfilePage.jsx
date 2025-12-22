import { useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../../ui/SectionTitle ";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);
  const [district, setDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const {
    user,
    setUser,
    loading,
    setLoading,
    updateProfileFunc,
    createUserWithEmailAndPasswordFunc,
  } = useAuth();
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
      status: "Active",
    };

    try {
      const res = await axiosSecure.put(`/users/${user?.email}`, updateUser);
      if (res.data.success) {
        console.log("Profile data saved to database successfully");
        setIsEditable(false);
        toast.success("Profile updated successfully! 🎉");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }

    // update user profile to firebase
    updateProfileFunc(name, avatar).then(() => {
      setUser({
        ...user,
        displayName: name,
        photoURL: avatar,
      });

      toast.success("User Update successfully 🎉");
      setLoading(false);
    });
  };
  return (
    <div className="max-w-5xl mx-auto my-12 md:my-22 p-8 md:p-8 bg-white shadow-md rounded-2xl">
      <div>
        <SectionTitle subTitle={""} title={"Profile Management"} />
      </div>

      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
        {!isEditable ? (
          <button
            type="button"
            onClick={() => setIsEditable(true)}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-700 transition"
          >
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditable(false)}
            className="px-4 py-2 bg-gray-400 cursor-pointer text-white rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Name */}
          <div>
            <label className="block font-medium text-gray-800">Full Name</label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              readOnly={!isEditable}
              required
              className={`block w-full px-4 py-3 mt-2 border rounded-xl transition-all ${
                !isEditable
                  ? "bg-gray-100 cursor-not-allowed text-gray-500"
                  : "bg-white border-red-200"
              }`}
            />
          </div>

          {/* Email - Always Locked */}
          <div>
            <label className="block font-medium text-gray-800">
              Email (Fixed)
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              disabled
              className="block w-full px-4 py-3 mt-2 border rounded-xl bg-gray-200 cursor-not-allowed text-gray-400"
            />
          </div>

          {/* Avatar URL */}
          <div>
            <label className="block font-medium text-gray-800">
              Avatar URL
            </label>
            <input
              type="text"
              name="avatar"
              defaultValue={user?.photoURL}
              readOnly={!isEditable}
              className={`block w-full px-4 py-3 mt-2 border rounded-xl transition-all ${
                !isEditable
                  ? "bg-gray-100 cursor-not-allowed text-gray-500"
                  : "bg-white border-red-200"
              }`}
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block font-medium text-gray-800">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              disabled={!isEditable}
              required
              className={`block w-full px-4 py-3 mt-2 border rounded-xl transition-all ${
                !isEditable
                  ? "bg-gray-100 cursor-not-allowed text-gray-500"
                  : "bg-white border-red-200"
              }`}
            >
              <option value="">Select</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block font-medium text-gray-800">District</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={!isEditable}
              required
              className={`block w-full px-4 py-3 mt-2 border rounded-xl transition-all ${
                !isEditable
                  ? "bg-gray-100 cursor-not-allowed text-gray-500"
                  : "bg-white border-red-200"
              }`}
            >
              <option value="">Select district</option>
              {districtData.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div>
            <label className="block font-medium text-gray-800">Upazila</label>
            <select
              name="upazila"
              disabled={!isEditable || !district}
              required
              className={`block w-full px-4 py-3 mt-2 border rounded-xl transition-all ${
                !isEditable
                  ? "bg-gray-100 cursor-not-allowed text-gray-500"
                  : "bg-white border-red-200"
              }`}
            >
              <option value="">Select upazila</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Save Button - Only visible when editing */}
        {isEditable && (
          <div className="mt-10 flex justify-center animate-in fade-in duration-300">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 md:py-3 rounded-xl font-medium md:text-lg transition cursor-pointer flex items-center justify-center gap-2
              ${
                loading
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white shadow-lg"
              }`}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <FaSave /> Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
