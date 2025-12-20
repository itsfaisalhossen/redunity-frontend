import { useState } from "react";
import { FaEye, FaEyeSlash, FaEdit, FaSave } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../../ui/SectionTitle ";

const ProfilePage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const { user } = useAuth();

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Data saved to database");
    setIsEditable(false);
  };

  return (
    <div className="max-w-5xl mx-auto my-12 md:my-22 p-8 md:p-8 bg-white shadow-md rounded-2xl ">
      {/* Header with Edit Toggle */}
      <div>
        <SectionTitle subTitle={""} title={"Profile Management"} />
      </div>
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
        {!isEditable ? (
          <button
            onClick={() => setIsEditable(true)}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-700 transition"
          >
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditable(false)}
              className="px-4 py-2 bg-gray-400 cursor-pointer text-white rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-800">Full Name</label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              disabled={!isEditable}
              className={`block w-full px-4 py-2 mt-2 border rounded-xl focus:outline-none ${
                !isEditable
                  ? "bg-gray-100 text-gray-500"
                  : "bg-white text-gray-700 border-red-400"
              }`}
            />
          </div>

          {/* Email - Always Disabled */}
          <div>
            <label className="block font-medium text-gray-800">
              Email (Fixed)
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              disabled
              className="block w-full px-4 py-2 mt-2 bg-gray-200 text-gray-500 border rounded-xl cursor-not-allowed"
            />
          </div>

          {/* Avatar Link/File */}
          <div>
            <label className="block font-medium text-gray-800">
              Avatar URL
            </label>
            <input
              type="text"
              name="avatar"
              defaultValue="https://example.com/photo.jpg"
              disabled={!isEditable}
              className={`block w-full px-4 py-2 mt-2 border rounded-xl focus:outline-none ${
                !isEditable
                  ? "bg-gray-100 text-gray-500"
                  : "bg-white text-gray-700 border-red-400"
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
              defaultValue="O+"
              className={`block w-full px-4 py-2 mt-2 border rounded-xl focus:outline-none ${
                !isEditable
                  ? "bg-gray-100 text-gray-500 appearance-none"
                  : "bg-white text-gray-700 border-red-400"
              }`}
            >
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
              name="district"
              disabled={!isEditable}
              defaultValue="Dhaka"
              className={`block w-full px-4 py-2 mt-2 border rounded-xl focus:outline-none ${
                !isEditable
                  ? "bg-gray-100 text-gray-500 appearance-none"
                  : "bg-white text-gray-700 border-red-400"
              }`}
            >
              <option>Dhaka</option>
              <option>Chattogram</option>
              <option>Rajshahi</option>
            </select>
          </div>

          {/* Upazila */}
          <div>
            <label className="block font-medium text-gray-800">Upazila</label>
            <select
              name="upazila"
              disabled={!isEditable}
              defaultValue="Mirpur"
              className={`block w-full px-4 py-2 mt-2 border rounded-xl focus:outline-none ${
                !isEditable
                  ? "bg-gray-100 text-gray-500 appearance-none"
                  : "bg-white text-gray-700 border-red-400"
              }`}
            >
              <option>Savar</option>
              <option>Mirpur</option>
              <option>Uttara</option>
            </select>
          </div>
        </div>

        {/* Save Button - Only appears when editing */}
        {isEditable && (
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg"
            >
              <FaSave /> Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
