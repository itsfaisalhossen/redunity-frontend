import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Search, MapPin, Droplet, User, Mail } from "lucide-react";
import DidYouKnow from "../../ui/DidYouKnow ";

const SearchDonation = () => {
  const axiosSecure = useAxiosSecure();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  console.log(donors);

  // Load districts
  useEffect(() => {
    fetch("/dristict.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  // District change → filter upazilas
  const handleDistrictChange = (e) => {
    setUpazilas([]); // reset previous upazilas
    const districtId = e.target.selectedOptions[0].getAttribute("data-id");

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((u) => u.district_id === districtId);
        setUpazilas(filtered);
      });
  };

  // Search form submit
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    const form = e.target;
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upazila = form.upazila.value;

    console.log(bloodGroup, district, upazila);

    // return;

    try {
      const res = await axiosSecure.get(
        // `/search-donors?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`
        `/search-donors?bloodGroup=${encodeURIComponent(
          bloodGroup
        )}&district=${encodeURIComponent(
          district
        )}&upazila=${encodeURIComponent(upazila)}`
      );
      setDonors(res.data);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg[#FDFCFD] dark:bg-primary-dark min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center  mb-12">
          <h1 className="text-4xl dark:text-white md:text-5xl font-black text-slate-900 mb-4">
            Find a <span className="text-rose-600">Donor</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Search for blood donors in your area instantly.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white dark:bg-primary-dark p-8 rounded-[2.5rem] shadow-2xl dark:shadow-md shadow-rose-100/50 dark:shadow-rose-100/20 border border-rose-50 dark:border-white/10 mb-16">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end"
          >
            {/* Blood Group */}
            <div className="space-y-2">
              <label className="text-xs font-black text-rose-600 uppercase tracking-widest ml-1">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                required
                className="w-full px-5 py-4 bg-slate-50 dark:bg-white/10 dark:text-gray-500 border-none rounded-2xl font-bold text-slate-700"
              >
                <option value="">Select Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="space-y-2">
              <label className="text-xs font-black text-rose-600 uppercase tracking-widest ml-1">
                District
              </label>
              <select
                name="district"
                required
                onChange={handleDistrictChange}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-white/10 dark:text-gray-500 border-none rounded-2xl font-bold text-slate-700"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.name} data-id={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div className="space-y-2">
              <label className="text-xs font-black text-rose-600 uppercase tracking-widest ml-1">
                Upazila
              </label>
              <select
                name="upazila"
                required
                className="w-full px-5 bg-slate-50 dark:bg-white/10 dark:text-gray-500 py-4 border-none rounded-2xl font-bold text-slate-700"
              >
                <option value="">Select Upazila</option>
                {upazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-rose-600 text-white font-black rounded-2xl hover:bg-rose-700 shadow-lg dark:shadow-md shadow-rose-200 dark:shadow-rose-400  transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Search size={20} /> SEARCH
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="mt-10">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin h-12 w-12 border-t-4 border-rose-600 rounded-full mx-auto"></div>
            </div>
          ) : searched && donors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {donors.map((donor) => (
                <div
                  key={donor._id}
                  className="bg-white rounded-4xl border border-rose-50 p-8 shadow-xl shadow-rose-100/20 hover:shadow-rose-200/40 transition-all group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center text-xl font-black">
                      {donor.bloodGroup}
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl text-slate-400 group-hover:text-rose-500 transition-colors">
                      <Droplet size={24} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-2">
                    <User size={20} className="text-slate-400" /> {donor.name}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                      <Mail size={16} /> {donor.email}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                      <MapPin size={16} className="text-rose-500" />
                      {donor.upazila}, {donor.district}
                    </div>
                  </div>

                  <button className="w-full py-3 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-rose-600 transition-all tracking-widest">
                    CONTACT DONOR
                  </button>
                </div>
              ))}
            </div>
          ) : searched ? (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-rose-100 italic text-slate-400 font-bold">
              No donors found for your search criteria.
            </div>
          ) : (
            <div className="text-center py-20 italic text-slate-300 font-medium text-lg">
              Enter details above to find available donors.
            </div>
          )}
        </div>
      </div>

      <DidYouKnow />
    </div>
  );
};

export default SearchDonation;
