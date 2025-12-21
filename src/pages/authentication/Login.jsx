import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";
import Container from "../../ui/Container";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setUser, signInWithEmailAndPasswordFunc } = useAuth();

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signInWithEmailAndPasswordFunc(email, password);
      setUser(result.user);
      toast.success("Login Successful");
      navigate(from);
    } catch (error) {
      toast.error("Email or Password is wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-14 md:my-24">
      <Helmet>
        <title>RedUnity | Login</title>
      </Helmet>

      <Container>
        <div className="w-full max-w-165 p-6 md:p-10 m-auto bg-white rounded-lg shadow-md">
          <h3 className="text-3xl lg:text-5xl font-extrabold text-center mb-6">
            Sign in to RedUnity
          </h3>

          <form onSubmit={handleSignin}>
            {/* Email */}
            <label className="block font-medium text-gray-800">Email</label>
            <input
              required
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full px-4 py-3 mb-4 mt-2 border rounded-xl focus:outline-none focus:ring focus:ring-red-300"
            />

            {/* Password */}
            <label className="block font-medium text-gray-800">Password</label>
            <div className="relative mb-4 mt-2">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring focus:ring-red-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Button with Spinner */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full cursor-pointer py-2 md:py-3 mt-6 md:mt-10 rounded-xl font-medium md:text-lg transition flex items-center justify-center gap-2
      ${
        loading
          ? "bg-red-400 cursor-not-allowed"
          : "bg-red-500 hover:bg-red-600 text-white"
      }`}
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center mt-5 text-gray-700">
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="text-red-600 hover:underline">
              Create One
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Login;
