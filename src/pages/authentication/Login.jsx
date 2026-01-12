import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";
import Container from "../../ui/Container";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, signInWithEmailAndPasswordFunc } = useAuth();

  const roleCredencitals = {
    Admin: {
      email: "itsfaisalhossen@gmail.com",
      pass: "123456$Zx",
    },
    Donor: {
      email: "faisalhossen396@gmail.com",
      pass: "123456$Zx",
    },
    Volunteer: {
      email: "mb@salman.com",
      pass: "123456$Zx",
    },
  };

  const handleRoleFill = (role) => {
    setEmail(roleCredencitals[role].email);
    setPassword(roleCredencitals[role].pass);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signInWithEmailAndPasswordFunc(email, password);
      setUser(result.user);

      Swal.fire({
        title: "Login Successful!",
        icon: "success",
        background: "#020617",
        width: 350,
        timer: 1500,
      });

      navigate(from);
    } catch (error) {
      console.log(error);
      toast.error("Email or Password is wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>RedUnity | Login</title>
      </Helmet>
      <Container>
        <div className="w-full min-h-screen flex flex-col items-center justify-center px-4">
          <Link
            to={"/"}
            className=" group relative w-12.5 h-12.5 flex items-center justify-center rounded-full bg-[rgb(20,20,20)] shadow-[0_0_20px_rgba(0,0,0,0.164)] cursor-pointer overflow-hidden transition-all duration-300 hover:w-35 hover:rounded-[50px] hover:bg-[rgb(255,69,69)]"
          >
            <span className=" absolute -top-5 text-white text-[2px] opacity-0 transition-all duration-300 group-hover:text-[13px] group-hover:opacity-100 group-hover:translate-y-7.5">
              Goo Home
            </span>

            {/* Icon */}
            <FaHome className=" transition-all duration-300 fill-white group-hover:w-12.5 group-hover:translate-y-[60%]" />
          </Link>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative mt-14">
            <div className="bg-red-700 text-white text-2xl md:text-3xl font-bold py-6 px-4 rounded-xl absolute -top-10 left-4 right-4 text-center">
              Please Sign In
            </div>

            <div className="pt-20 pb-8 px-6">
              <form onSubmit={handleSignin} className="space-y-6">
                {/* Email */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-sm font-medium">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Your email"
                    className="w-full px-4 py-3 sm:py-3.5 border border-black/90 rounded-lg focus:outline-none"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-sm font-medium">
                    Password
                  </label>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Your password"
                    className="w-full px-4 py-3 sm:py-3.5 border border-black/90 rounded-lg focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 font-bold rounded-lg ${
                    loading
                      ? "bg-red-400 text-white"
                      : "bg-black text-white hover:bg-red-700"
                  }`}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              {/* 🔥 ROLE BUTTONS (DESIGN SAME) */}
              <div className="mt-5">
                <p className="text-xs text-center mb-2 font-medium">
                  Sign in as Demo User
                </p>
                <div className="flex flex-wrap text-white justify-center items-center gap-2">
                  {/* Admin */}
                  <button
                    type="button"
                    onClick={() => handleRoleFill("Admin")}
                    className=" group relative cursor-pointer p-[1.5px] rounded-[5px] border-0 bg-linear-to-b from-[#aa0600] to-[#ff1100] shadow-[0_3px_5px_#0008] transition-all duration-300 hover:shadow-[0_5px_10px_#0009] active:shadow-none"
                  >
                    {" "}
                    {/* animation keyframes */}{" "}
                    <style>
                      {`@keyframes thing { 0% { background-position: 130%; opacity: 1;}      100% {background-position: -166%; opacity: 0;}}`}
                    </style>
                    {/* INNER */}
                    <div className="relative px-4 py-1 rounded-sm overflow-hidden transition-inherit bg-[radial-gradient(circle_at_50%_100%,#30f8f8_10%,#30f8f800_55%),linear-gradient(#aa0600,#ff1100)]">
                      {/* Shine layer */}
                      <div
                        className="absolute inset-0 bg-[linear-gradient(-65deg,#0000_40%,#fff7_50%,#0000_70%)] bg-size-[200%_100%]"
                        style={{ animation: "thing 3s ease infinite" }}
                      />

                      {/* Top white glow */}
                      <div className="absolute inset-y-0 -inset-x-[6em] rounded-inherit bg-[radial-gradient(circle_at_50%_-260%,#fff_45%,#fff6_60%,#fff0_60%)]" />

                      {/* Inner shadow */}
                      <div className="absolute inset-0 rounded-inherit transition-all duration-300 shadow-[inset_0_2px_6px_-3px_#0000] group-active:shadow-[inset_0_2px_6px_-3px_#000a]" />

                      {/* Text */}
                      <span className="relative z-10 text-white text-sm font-medium drop-shadow-[1px_1px_#000a] transition-all duration-300">
                        Admin
                      </span>
                    </div>
                  </button>
                  {/* Donor */}
                  <button
                    type="button"
                    onClick={() => handleRoleFill("Donor")}
                    className=" group relative cursor-pointer p-[1.5px] rounded-[5px] border-0 bg-linear-to-b from-[#aa0600] to-[#ff1100] shadow-[0_3px_5px_#0008] transition-all duration-300 hover:shadow-[0_5px_10px_#0009] active:shadow-none"
                  >
                    {/* animation keyframes */}
                    <style>
                      {`
          @keyframes thing {
            0% {
              background-position: 130%;
              opacity: 1;
            }
            100% {
              background-position: -166%;
              opacity: 0;
            }
          }
        `}
                    </style>
                    {/* INNER */}
                    <div className="relative px-4 py-1 rounded-sm overflow-hidden transition-inherit bg-[radial-gradient(circle_at_50%_100%,#30f8f8_10%,#30f8f800_55%), linear-gradient(#aa0600,#ff1100)]">
                      {/* Shine layer */}
                      <div
                        className="absolute inset-0 bg-[linear-gradient(-65deg,#0000_40%,#fff7_50%,#0000_70%)] bg-size-[200%_100%]"
                        style={{ animation: "thing 3s ease infinite" }}
                      />

                      {/* Top white glow */}
                      <div className="absolute inset-y-0 -inset-x-[6em] rounded-inherit bg-[radial-gradient(circle_at_50%_-260%,#fff_45%,#fff6_60%,#fff0_60%)]" />

                      {/* Inner shadow */}
                      <div className="absolute inset-0 rounded-inherit transition-all duration-300 shadow-[inset_0_2px_6px_-3px_#0000] group-active:shadow-[inset_0_2px_6px_-3px_#000a]" />

                      {/* Text */}
                      <span className="relative z-10 text-white text-sm font-medium drop-shadow-[1px_1px_#000a] transition-all duration-300">
                        Donor
                      </span>
                    </div>
                  </button>
                  {/* Volunteer */}
                  <button
                    type="button"
                    onClick={() => handleRoleFill("Volunteer")}
                    className=" group relative cursor-pointer p-[1.5px] rounded-[5px] border-0 bg-linear-to-b from-[#aa0600] to-[#ff1100] shadow-[0_3px_5px_#0008] transition-all duration-300 hover:shadow-[0_5px_10px_#0009] active:shadow-none"
                  >
                    {/* animation keyframes */}
                    <style>
                      {`
          @keyframes thing {
            0% {
              background-position: 130%;
              opacity: 1;
            }
            100% {
              background-position: -166%;
              opacity: 0;
            }
          }
        `}
                    </style>
                    {/* INNER */}
                    <div className="relative px-4 py-1 rounded-sm overflow-hidden transition-inherit bg-[radial-gradient(circle_at_50%_100%,#30f8f8_10%,#30f8f800_55%), linear-gradient(#aa0600,#ff1100)]">
                      {/* Shine layer */}
                      <div
                        className="absolute inset-0 bg-[linear-gradient(-65deg,#0000_40%,#fff7_50%,#0000_70%)] bg-size-[200%_100%]"
                        style={{ animation: "thing 3s ease infinite" }}
                      />

                      {/* Top white glow */}
                      <div className="absolute inset-y-0 -inset-x-[6em] rounded-inherit bg-[radial-gradient(circle_at_50%_-260%,#fff_45%,#fff6_60%,#fff0_60%)]" />

                      {/* Inner shadow */}
                      <div className="absolute inset-0 rounded-inherit transition-all duration-300 shadow-[inset_0_2px_6px_-3px_#0000] group-active:shadow-[inset_0_2px_6px_-3px_#000a]" />

                      {/* Text */}
                      <span className="relative z-10 text-white text-sm font-medium drop-shadow-[1px_1px_#000a] transition-all duration-300">
                        Volunteer
                      </span>
                    </div>
                  </button>
                </div>
              </div>
              <p className="text-center mt-5">
                Don't have an account?{" "}
                <Link
                  to={"/auth/register"}
                  className=" text-red-600 font-bold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
