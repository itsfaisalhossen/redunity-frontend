import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../../ui/SectionTitle ";

const CreateDonationRequest = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="max-w-5xl mx-auto my-12 md:my-22 p-8 md:p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <SectionTitle title={"Create Blood Request"} />

        <form className="space-y-4">
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
              className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <select className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none">
                <option disabled selected>
                  Select District
                </option>
                <option>Dhaka</option>
                <option>Chittagong</option>
              </select>
              <select className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none">
                <option disabled selected>
                  Select Upazila
                </option>
                <option>Dhanmondi</option>
                <option>Mirpur</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Hospital Name (e.g. Dhaka Medical College)"
              className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none"
            />
            <input
              type="text"
              placeholder="Full Address Line"
              className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none"
            />
          </div>

          {/* Specifics */}
          <div className="grid grid-cols-3 gap-4">
            <select className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none">
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
            <input
              type="date"
              className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none"
            />
            <input
              type="time"
              className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none"
            />
          </div>

          <textarea
            placeholder="Why is blood needed? (Details)"
            rows="4"
            className="donation-input w-full p-3 rounded-lg border focus:border-red-600 outline-none"
          ></textarea>

          <button
            type="submit"
            className="w-full py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300 shadow-lg active:scale-[0.98]"
          >
            Send Donation Request
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateDonationRequest;
