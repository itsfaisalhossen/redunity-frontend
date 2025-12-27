import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../../ui/SectionTitle ";
import { useState } from "react";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
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
    const dateTime = new Date(`${date}T${time}`);

    //  find district name from id
    const selectedDistrict = districtData.find((d) => d.id === district);
    const districtName = selectedDistrict ? selectedDistrict.name : "";
    const upazilaName = form.upazila.value;

    const blood = {
      name,
      recipientName,
      email,
      hospitalName,
      fullAddress,
      bloodGroup,
      dateTime,
      detalsText,
      districtName,
      upazilaName,
    };

    axiosSecure
      .post("/bloods", blood)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Blood Request successfully 🩸");
        }
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="my-14 md:my-24">
      <Helmet>
        <title>RedUnity | Create Donation</title>
      </Helmet>
      <div className="max-w-5xl mx-auto my-12 md:my-22 p-8 md:p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <SectionTitle title={"Create Blood Request"} />
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
              required
              placeholder="Hospital Name (e.g. Dhaka Medical College)"
              className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none"
            />
            <input
              type="text"
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
                required
                className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none"
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
            <div>
              <label className="font-medium text-gray-700">
                Date Months yr
              </label>
              <input
                name="date"
                required
                type="date"
                className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Time</label>
              <input
                name="time"
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
            name="detalsText"
            className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none"
          ></textarea>
          <button
            type="submit"
            className="w-full cursor-pointer py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300 shadow-lg active:scale-[0.98]"
          >
            Send Donation Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
