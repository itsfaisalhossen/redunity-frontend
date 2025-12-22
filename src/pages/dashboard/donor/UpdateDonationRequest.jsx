import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet";
import SectionTitle from "../../../ui/SectionTitle ";
import { Link, useLocation } from "react-router";
import { MdOutlineArrowBack } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const UpdateDonationRequest = () => {
  const { user } = useAuth();
  const location = useLocation();
  const id = location.state?.requestId;

  const axiosSecure = useAxiosSecure();
  const { data: blood = [] } = useQuery({
    queryKey: ["blod"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bloods/${id}`);
      return res?.data;
    },
  });

  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);
  const [district, setDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

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

  /* ============ FILTER UPAZILA BY DISTRICT ID ============ */
  useEffect(() => {
    if (district) {
      const result = upazilaData.filter((u) => u.district_id === district);
      setFilteredUpazilas(result);
    } else {
      setFilteredUpazilas([]);
    }
  }, [district, upazilaData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = user?.displayName;
    const email = user?.email;
    const recipientName = form.recipientName.value;
    const hospitalName = form.hospitalName.value;
    const fullAddress = form.fullAddress.value;
    const bloodGroup = form.bloodGroup.value;
    const date = form.date.value;
    const time = form.time.value;
    const detalsText = form.detalsText.value;

    const selectedDistrict = districtData.find((d) => d.id === district);
    const districtName = selectedDistrict ? selectedDistrict.name : "";
    const upazilaName = form.upazila.value;

    const updatedBloodData = {
      name,
      recipientName,
      email,
      hospitalName,
      fullAddress,
      bloodGroup,
      date,
      time,
      detalsText,
      districtName,
      upazilaName,
    };

    try {
      const res = await axiosSecure.put(
        `/lastRequest-bloods/${id}`,
        updatedBloodData
      );
      if (res.data.success) {
        toast.success("Donation request updated successfully! 🩸");
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Something went wrong. Please try again.");
    }
    console.log("Updated Data sent to server:", updatedBloodData);
  };

  return (
    <div className="my-14 md:my-24">
      <Helmet>
        <title>RedUnity | Update Donation</title>
      </Helmet>
      <div className="max-w-5xl mx-auto my-12 md:my-22 p-8 md:p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <SectionTitle title={"Update Donation Request"} />
        <div className="my-8 md:my-16 flex items-center gap-1 justify-end font-semibold hover:text-red-400">
          <MdOutlineArrowBack size={20} />
          <Link to={"/dashboard"}>Back to Recent Donation</Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Read-Only Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Requester Name
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                readOnly
                className="w-full p-3 mt-1 bg-gray-50 border-gray-200 border focus:border-red-600 outline-none rounded-lg cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Requester Email
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                readOnly
                className="w-full p-3 mt-1 bg-gray-50 border focus:border-red-600 outline-none border-gray-200 rounded-lg cursor-not-allowed"
              />
            </div>
          </div>

          {/* Recipient Details */}
          <div className="space-y-4 pt-4">
            <input
              type="text"
              defaultValue={blood?.recipientName}
              placeholder="Recipient Name"
              name="recipientName"
              className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-800">
                  District
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                  className="block w-full px-4 py-3 mt-2 border rounded-xl"
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
                <label className="block font-medium text-gray-800">
                  Upazila
                </label>
                <select
                  name="upazila"
                  required
                  disabled={!district}
                  className="block w-full px-4 py-3 mt-2 border rounded-xl"
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

            <input
              type="text"
              name="hospitalName"
              defaultValue={blood?.hospitalName}
              required
              placeholder="Hospital Name (e.g. Dhaka Medical College)"
              className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none"
            />
            <input
              type="text"
              defaultValue={blood?.fullAddress}
              placeholder="Full Address Line"
              name="fullAddress"
              required
              className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none"
            />
          </div>

          {/* Specifics */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="font-medium text-gray-700">Blood group</label>
              <select
                name="bloodGroup"
                defaultValue={blood?.bloodGroup}
                required
                className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none"
              >
                <option value={blood?.bloodGroup}>{blood?.bloodGroup}</option>
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
            <div>
              <label className="font-medium text-gray-700">
                Date Months yr
              </label>
              <input
                name="date"
                defaultValue={blood?.date}
                required
                type="date"
                className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Time</label>
              <input
                name="time"
                defaultValue={blood?.time}
                type="time"
                required
                className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none"
              />
            </div>
          </div>

          <textarea
            placeholder="Why is blood needed? (Details)"
            rows="4"
            required
            defaultValue={blood?.detalsText}
            name="detalsText"
            className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none"
          ></textarea>

          <button
            type="submit"
            className="w-full cursor-pointer py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300 shadow-lg active:scale-[0.98]"
          >
            Update Donation Request
          </button>
        </form>
      </div>
    </div>
  );
};
export default UpdateDonationRequest;
