import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import { LogOut, LayoutDashboard, Droplet, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import BtnPrimary from "./BtnPrimary";
import Swal from "sweetalert2";
import { BiLayer } from "react-icons/bi";
import DarkMode from "./DarkMode";

const Navbar = () => {
  const { user, signOutUserFunc } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "<span style='color:#ef4444'>Confirm Logout</span>",
      html: "<p style='color:#e5e7eb'>Are you sure you want to logout?</p>",
      icon: "warning",
      background: "#0f172a",
      color: "#e5e7eb",
      width: 350,
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#020617",
      buttonsStyling: true,
      reverseButtons: true,
      showClass: {
        popup: "animate__animated animate__fadeInDown animate__slower",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp animate__slower",
      },
      customClass: {
        popup: "rounded-2xl shadow-2xl border border-red-500/30",
        title: "font-bold text-xl",
        confirmButton:
          "px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition duration-300",
        cancelButton:
          "px-6 py-3 rounded-xl font-semibold border border-red-500/30 text-red-400 hover:bg-red-500/10 transition duration-300",
      },
    });
    if (result.isConfirmed) {
      try {
        await signOutUserFunc();
        Swal.fire({
          icon: "success",
          title: "<span style='color:#ef4444'>Logged Out</span>",
          html: "<p style='color:#e5e7eb'>You have been logged out successfully.</p>",
          background: "#020617",
          width: 350,
          color: "#f8fafc",
          confirmButtonText: "OK",
          confirmButtonColor: "#dc2626",
          showClass: {
            popup: "animate__animated animate__zoomIn animate__slower",
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut animate__slower",
          },
          customClass: {
            popup: "rounded-2xl shadow-2xl border border-red-500/30",
            title: "text-2xl font-bold",
            confirmButton:
              "px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition duration-300",
          },
        });
      } catch (error) {
        toast.error("Failed to logout");
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Donation Requests", path: "/donation-requests" },
    { name: "Search Donor", path: "/search-donation" },
    { name: "Funding", path: "/funding" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="bg-blac text-white  sticky top-0 md:top-2.5 z-50">
      <div className="max-w-7xl md:rounded-lg back-drop-b px-6  py-4 md:py-5 back-drop-blur-xl bg-black dark:bg-white/20 mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2  font-bold z-50">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-md">
            {/* <BiLayer className="text-white" size={20} /> */}
            <Droplet className="text-white" size={20} />
          </div>
          <span className="text-xl md:text-3xl font-black tracking-tighter text-white uppercase">
            RedUnity
          </span>
        </Link>
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `duration-200 py-0.5 text-[15px] hover:bg-red-600 rounded-lg ${
                  isActive
                    ? "border-red600 bg-red-600 rounded-lg px-3 text-white"
                    : "border-transparent text-gray-300 px-3 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
        {/* Action Buttons & User Profile */}
        <div className="flex items-center gap-4">
          {!user && (
            <div className="hidden md:block">
              <BtnPrimary text={"Login"} link={"/auth/login"} />
            </div>
          )}

          {user && (
            <div ref={dropdownRef} className="relative">
              <div className="flex items-center gap-2">
                <Link
                  to={"/dashboard"}
                  className=" group relative cursor-pointer p-[1.5px] rounded-lg border-0 bg-linear-to-b from-[#aa0600] to-[#ff1100] shadow-[0_3px_5px_#0008] transition-all duration-300 hover:shadow-[0_5px_10px_#0009] active:shadow-none"
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
                  <div className="relative px-4 py-1 rounded-lg overflow-hidden transition-inherit bg-[radial-gradient(circle_at_50%_100%,#30f8f8_10%,#30f8f800_55%), linear-gradient(#aa0600,#ff1100)]">
                    {/* Shine layer */}
                    <div
                      className="absolute inset-0 bg-[linear-gradient(-65deg,#0000_40%,#fff7_50%,#0000_70%)] bg-size-[200%_100%]"
                      style={{ animation: "thing 3s ease infinite" }}
                    />

                    {/* Top white glow */}
                    <div className="absolute inset-y-0 -inset-x-[6em] rounded-inherit bg-[radial-gradient(circle_at_50%_-260%,#fff_25%,#fff6_60%,#fff0_60%)]" />

                    {/* Inner shadow */}
                    <div className="absolute inset-0 rounded-inherit transition-all duration-300 shadow-[inset_0_2px_6px_-3px_#0000] group-active:shadow-[inset_0_2px_6px_-3px_#000a]" />

                    {/* Text */}
                    <span className="relative z-10 text-white text-sm font-medium drop-shadow-[1px_1px_#000a] transition-all duration-300">
                      Dashboard
                    </span>
                  </div>
                </Link>
                <img
                  onClick={() => setIsOpen(!isOpen)}
                  src={user?.photoURL}
                  alt="avatar"
                  className="w-10 h-10 rounded-lg border-2 border-red-600 cursor-pointer object-cover"
                />
                <DarkMode />
              </div>

              {isOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b text-sm font-semibold  ">
                    <p className="uppercase text-gray-800">
                      {user?.displayName}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-red-50 text-red-600 transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {/* Mobile Sidebar/Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-900 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden z-40 shadow-2xl`}
      >
        <div className="flex flex-col p-8 pt-24 gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium hover:text-red-500 transition"
            >
              {link.name}
            </NavLink>
          ))}
          {!user && (
            <div onClick={() => setIsMobileMenuOpen(false)}>
              <BtnPrimary text={"Login"} link={"/auth/login"} />
            </div>
          )}
        </div>
      </div>
      {/* Overlay for Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
