import { Helmet } from "react-helmet";
import { data, Link, useLocation, useNavigate } from "react-router";
import Container from "../../ui/Container";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);
  const [district, setDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const axiosSecure = useAxiosSecure();

  const {
    setUser,
    loading,
    setLoading,
    updateProfileFunc,
    createUserWithEmailAndPasswordFunc,
  } = useAuth();

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

  /* ================= REGISTER ================= */
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const displayName = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const bloodGroup = form.bloodGroup.value;
    const upazilaName = form.upazila.value;
    const avatarFile = form.avatar.files[0];

    //  find district name from id
    const selectedDistrict = districtData.find((d) => d.id === district);
    const districtName = selectedDistrict ? selectedDistrict.name : "";

    if (password !== confirmPassword) {
      toast.error("Password does not match");
      setLoading(false);
      return;
    }

    createUserWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        const user = res.user;

        const formData = new FormData();
        formData.append("image", avatarFile);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        fetch(image_API_URL, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imgData) => {
            const photoURL = imgData?.data?.display_url || "";

            // ✅ FINAL USER OBJECT (NAME + DISTRICT NAME + UPAZILA NAME)
            const newUser = {
              name: displayName,
              email,
              image: photoURL,
              bloodGroup,
              district: districtName,
              upazila: upazilaName,
              status: "Active",
            };
            console.log("New User:", newUser);

            axiosSecure.post("/users", newUser).then((res) => {
              if (res.data.insertedId) {
                console.log("User created in the database");
              }
            });

            // update user profile to firebase
            updateProfileFunc(displayName, photoURL).then(() => {
              setUser({
                ...user,
                displayName,
                photoURL,
              });

              toast.success("Account created successfully 🎉");
              navigate(location.state ? location.state : "/");
              form.reset();
              setLoading(false);
            });
          })
          .catch((err) => {
            toast.error("Image upload failed");
            console.log(err);

            setLoading(false);
          });
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="my-14 md:my-24">
      <Helmet>
        <title>RedUnity | Register</title>
      </Helmet>

      <Container>
        <div className="w-full max-w165 p-6 md:p-10 m-auto bg-white rounded-lg shadow-md">
          <div className="mb-8">
            <h3 className="text-3xl lg:text-5xl sirin-stencil-regular font-extrabold text-center">
              Create Your Account
            </h3>
          </div>

          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Name */}
              <div>
                <label className="block font-medium text-gray-800">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  required
                  className="block w-full px-4 py-3 mt-2 border rounded-xl"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium text-gray-800">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  required
                  className="block w-full px-4 py-3 mt-2 border rounded-xl"
                />
              </div>

              {/* Avatar */}
              <div>
                <label className="block font-medium text-gray-800">
                  Avatar
                </label>
                <input
                  type="file"
                  name="avatar"
                  required
                  className="block w-full px-4 py-3 mt-2 border rounded-xl"
                />
              </div>

              {/* Blood */}
              <div>
                <label className="block font-medium text-gray-800">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  required
                  className="block w-full px-4 py-3 mt-2 border rounded-xl"
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

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Password"
                  className="block w-full px-4 py-3 mt-2 border rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-8 -translate-y-1/2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Confirm */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  placeholder="Confirm Password"
                  className="block w-full px-4 py-3 mt-2 border rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-8 -translate-y-1/2"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 md:py-3 mt-6 md:mt-10 rounded-xl font-medium md:text-lg transition flex items-center justify-center gap-2
      ${
        loading
          ? "bg-red-400 cursor-not-allowed"
          : "bg-red-500 hover:bg-red-600 text-white"
      }`}
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>

          <p className="text-center mt-6">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-red-600 underline">
              Sign In
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Register;
