import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router";
import Container from "../../ui/Container";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user,
    setUser,
    loading,
    setLoading,
    updateProfileFunc,
    createUserWithEmailAndPasswordFunc,
  } = useAuth();
  console.log(user);

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const displayName = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const avatarFile = form.avatar.files[0];

    if (password !== confirmPassword) {
      toast.error("Password does not match");
      setLoading(false);
      return;
    }

    const regEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])(?!.*\s).{8,}$/;

    if (!regEx.test(password)) {
      toast.error(
        "Password must be at least 8 characters and include uppercase, lowercase, number & special character"
      );
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

            updateProfileFunc(displayName, photoURL).then(() => {
              setUser({
                ...user,
                displayName,
                photoURL,
              });

              const newUser = {
                name: displayName,
                email,
                image: photoURL,
                bloodGroup,
                district,
                upazila,
                status: "active",
              };

              console.log("New User:", newUser);

              toast.success("Account created successfully 🎉");
              navigate(location.state ? location.state : "/");
              form.reset();
              setLoading(false);
            });
          })
          .catch(() => {
            toast.error("Image upload failed");
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
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
                  required
                  placeholder="Your name"
                  className="block w-full px-4 md:px-6 py-2 md:py-3 mt-2 text-gray-700 bg-white border rounded-xl focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium text-gray-800">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email address"
                  className="block w-full px-4 md:px-6 py-2 md:py-3 mt-2 text-gray-700 bg-white border rounded-xl focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              {/* Avatar */}
              <div>
                <label className="block font-medium text-gray-800">
                  Avatar (ImageBB)
                </label>
                <input
                  type="file"
                  name="avatar"
                  className="block w-full px-4 md:px-6 py-2 md:py-3 mt-2 bg-white border rounded-xl"
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className="block font-medium text-gray-800">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  required
                  className="block w-full px-4 md:px-6 py-2 md:py-3 mt-2 bg-white border rounded-xl focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="">Select blood group</option>
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
                  name="district"
                  required
                  className="block w-full px-4 md:px-6 py-2 md:py-3 mt-2 bg-white border rounded-xl"
                >
                  <option value="">Select district</option>
                  <option>Dhaka</option>
                  <option>Chattogram</option>
                  <option>Rajshahi</option>
                  <option>Khulna</option>
                  <option>Sylhet</option>
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
                  className="block w-full px-4 md:px-6 py-2 md:py-3 mt-2 bg-white border rounded-xl"
                >
                  <option value="">Select upazila</option>
                  <option>Savar</option>
                  <option>Mirpur</option>
                  <option>Dhanmondi</option>
                  <option>Uttara</option>
                </select>
              </div>

              {/* Password */}
              <div className="md:col-span-1">
                <label className="block font-medium text-gray-800">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    required
                    className="block w-full px-4 md:px-6 py-2 md:py-3 mt-2 text-gray-700 bg-white border rounded-xl focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="md:col-span-1">
                <label className="block font-medium text-gray-800">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    name="confirmPassword"
                    required
                    className="block w-full px-4 md:px-6 py-2 md:py-3 mt-2 text-gray-700 bg-white border rounded-xl"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Register Button with Spinner */}
            <div className="mt-6 md:mt-10 flex items-center justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-4 w-[50%] md:px-8 py-2 md:py-3 rounded-xl bg-red-500 text-white font-medium md:text-lg hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2"
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

          <div className="flex w-full items-center bg-red300 justify-center mx-auto mt-4 md:mt-8">
            <p className="max-sm:text-sm font-normal text-center text-gray-700">
              Already have an account?{" "}
              <Link
                state={location?.state}
                to="/auth/login"
                className="ftext-sm text-center text-red-700 dark:text-gray-400 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
