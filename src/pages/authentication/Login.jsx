import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
// import Container from "../components/Container";
import { useState } from "react";
import toast from "react-hot-toast";
// import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";
import Container from "../../ui/Container";
import { Droplet } from "lucide-react";

const Login = () => {
  const location = useLocation();
  console.log(location);

  const navigate = useNavigate();
  const from = location.state || "/";
  const [email, setEmail] = useState("");
  const {
    user,
    setUser,
    setLoading,
    // signInWithGooglePopupFunc,
    signInWithEmailAndPasswordFunc,
  } = useAuth();
  console.log(user);

  const handleSignin = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;

    signInWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        // if (!res?.user?.emailVerified) {
        //   toast.error("Your email is not Verified.");
        //   return;
        // }
        setUser(res.user);
        navigate(from);
        setLoading(false);
        toast.success("Login Successful", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Password is Worng", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
        setLoading(false);
      });
  };

  // const handleGoogleSignin = () => {
  //   signInWithGooglePopupFunc()
  //     .then((res) => {
  //       setLoading(false);
  //       setUser(res?.user);
  //       const newUser = {
  //         name: res?.user?.displayName,
  //         email: res?.user?.email,
  //         image: res?.user.photoURL,
  //       };
  //       fetch("https://foods-circle-api-server.vercel.app/users", {
  //         method: "POST",
  //         headers: { "content-type": "application/json" },
  //         body: JSON.stringify(newUser),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => console.log("data after user save", data));
  //       toast.success("SignIn Successful", {
  //         style: {
  //           border: "1px solid #713200",
  //           padding: "16px",
  //           color: "#713200",
  //         },
  //         iconTheme: {
  //           primary: "#713200",
  //           secondary: "#FFFAEE",
  //         },
  //       });
  //       navigate(location.state ? location.state : "/");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //       toast.error(err.message);
  //     });
  // };

  return (
    <div className=" my-14 md:my-24">
      <Helmet>
        <title>Red | Login</title>
      </Helmet>
      <Container>
        <div className="w-full max-w-165 p-6 md:p-10 m-auto bg-white rounded-lg shadow-md">
          {/* Form */}
          <div className="mb-6">
            <h3 className="sirin-stencil-regular items-center mx-auto flex justify-center  font-extrabold text-4xl text-center">
              <Droplet size={35} color="red" />
              RedUnity
            </h3>
            <p className="text-lg text-center">Sign in to</p>
          </div>
          <form onSubmit={handleSignin}>
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block font-medium text-gray-800 dark:text-gray-200"
              >
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="block w-full px-4 md:px-6  py-2 md:py-3 mt-2 text-gray-700 bg-white border rounded-xl dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            {/* Password */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label className="block font-medium text-gray-800 dark:text-gray-200">
                  Password
                </label>
              </div>
              <input
                required
                // type={show ? "text" : "password"}
                type="password"
                name="password"
                placeholder="Password"
                className="block w-full px-4 md:px-6 py-2 md:py-3 mt-2 text-gray-700 bg-white border rounded-xl dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <Link
                to={""}
                className="block font-medium text-gray-800 dark:text-gray-200 mt-4"
              >
                Forget Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <div className="mt-5">
              <input
                className="px-4 w-full cursor-pointer md:px-8  py-2 md:py-3 rounded-xl bg-red-500 text-white font-medium md:text-lg hover:bg-red-600 transition-all duration-300"
                type="submit"
                value="Sign In"
              />
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

            <p className="text-sm text-center text-gray-800 uppercase dark:text-gray-400 hover:underline">
              Or Sign in With
            </p>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
          </div>

          {/* Social Login */}
          <div className="flex items-center mt-6">
            {/* Google Button */}
            <button
              // onClick={handleGoogleSignin}
              type="button"
              className="px-4 flex items-center w-full text-center justify-center md:px-8 py-2 md:py-3 rounded-xl border border-black hover:border-black bg-black text-white  cursor-pointer transition-all duration-300 textxl"
            >
              <FcGoogle size={22} />
              <span className="mx-2 sm:inline">Sign in with Google</span>
            </button>

            {/* Twitter Button */}
          </div>

          {/* Create Account */}
          <p className="mt-8 text-sm font-normal text-center text-gray-700">
            Don&apos;t have an account?{" "}
            <Link
              state={location?.state}
              to={"/auth/register"}
              className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
            >
              Create One
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
};
export default Login;
