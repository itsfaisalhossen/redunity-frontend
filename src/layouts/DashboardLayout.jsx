import { useRef, useState } from "react";
import { NavLink, Outlet } from "react-router";
import { MdOutlineBloodtype, MdOutlinePayments } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { BiDonateBlood } from "react-icons/bi";
import { Droplet, LayoutDashboard, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FiHome,
  FiUser,
  FiSearch,
  FiBell,
  FiHelpCircle,
  FiMenu,
  FiSettings,
} from "react-icons/fi";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOutUserFunc } = useAuth();
  const dropdownRef = useRef(null);
  const { role } = useRole();

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

  // Light Theme Styles: White bg, Black text, Red accents
  const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl  transition-all duration-200 ${
      isActive
        ? "bg-red-50 text-red-600 font-bold border-r-4 border-red-600"
        : "text-gray-900 font-medium hover:text-black hover:bg-gray-100"
    }`;

  return (
    <div className="flex dark:bg-primary-dark  h-screen overflow-hidden bg-[#f8f9fa] text-black font-sans">
      {/* --- Sticky Sidebar --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-75 bg-white border-r border-gray-200 transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen lg:shrink-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-4 md:p-6">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-md">
              {/* <BiLayer className="text-white" size={20} /> */}
              <Droplet className="text-white" size={20} />
            </div>
            <span className="text-xl md:text-3xl font-black tracking-tighter text-black uppercase">
              RedUnity
            </span>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-2 mt-5 md:mt-8 overflow-y-auto no-scrollbar">
            <NavLink to="/" end className={navLinkStyles}>
              <FiHome size={20} />{" "}
              <span className="text-[14px] uppercase tracking-wide">Home</span>
            </NavLink>

            <NavLink to="/dashboard" end className={navLinkStyles}>
              <LayoutDashboard size={20} />
              <span className="text-[14px] uppercase tracking-wide">
                Overview
              </span>
            </NavLink>

            <NavLink to="/dashboard/my-profile" className={navLinkStyles}>
              <FiUser size={20} />{" "}
              <span className="text-[14px] uppercase tracking-wide">
                My Profile
              </span>
            </NavLink>

            {role === "Donor" && (
              <>
                <NavLink
                  to="/dashboard/my-donation-requests"
                  className={navLinkStyles}
                >
                  <BiDonateBlood size={20} />{" "}
                  <span className="text-[14px] uppercase tracking-wide">
                    My Requests
                  </span>
                </NavLink>
                <NavLink
                  to="/dashboard/create-donation-request"
                  className={navLinkStyles}
                >
                  <MdOutlineBloodtype size={20} />{" "}
                  <span className="text-[14px] uppercase tracking-wide">
                    Create Request
                  </span>
                </NavLink>
              </>
            )}

            {role === "Admin" && (
              <>
                <NavLink to="/dashboard/all-users" className={navLinkStyles}>
                  <FaUserShield size={20} />{" "}
                  <span className="text-[14px] uppercase tracking-wide">
                    All Users
                  </span>
                </NavLink>
                <NavLink
                  to="/dashboard/all-blood-donation-request"
                  className={navLinkStyles}
                >
                  <BiDonateBlood size={20} />{" "}
                  <span className="text-[14px] uppercase tracking-wide">
                    Manage Requests
                  </span>
                </NavLink>
              </>
            )}

            {role === "Volunteer" && (
              <li>
                <NavLink
                  to="/dashboard/all-blood-donation-request"
                  className={navLinkStyles}
                >
                  <BiDonateBlood size={20} />
                  <span className="text-[14px] uppercase tracking-wide">
                    Donation requests
                  </span>
                </NavLink>
              </li>
            )}

            <NavLink to="/dashboard/payments" className={navLinkStyles}>
              <MdOutlinePayments size={20} />{" "}
              <span className="text-[14px] uppercase tracking-wide">
                Payments
              </span>
            </NavLink>

            <NavLink to="/dashboard/settings" className={navLinkStyles}>
              <FiSettings size={20} />{" "}
              <span className="text-[14px] uppercase tracking-wide">
                Settings
              </span>
            </NavLink>
          </nav>

          {/* Help Card (Sticky bottom) */}
          <div className="pt-6 mt-4 border-t border-gray-100">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                <FiHelpCircle className="text-red-600" />
              </div>
              <h5 className="text-sm font-bold text-black mb-1 uppercase tracking-tight">
                Need Help?
              </h5>
              <p className="text-[11px] text-gray-500 mb-4">
                Contact our support team.
              </p>
              <button className="w-full py-2 text-[11px] font-bold text-red-600 uppercase bg-white border border-red-200 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* --- Main Area (Scrollable) --- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="shrink-0 flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-black"
            >
              <FiMenu size={24} />
            </button>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold tracking-tight hidden md:block uppercase">
                Dashboard
              </h2>
              <p className="text-sm">Overview</p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800" />
              <input
                type="text"
                placeholder="Search events, requests..."
                className="bg-gray-100 border-none rounded-full py-3 pl-10 pr-4 w-64 text-sm focus:ring-1 focus:ring-red-600 text-black"
              />
            </div>

            {/* Notification */}
            <button className="relative p-2 bg-gray-100 rounded-full text-gray-600 hover:text-red-600 transition-colors">
              <FiBell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-white"></span>
            </button>

            {/* Profile Info */}
            {user && (
              <div ref={dropdownRef} className="relative">
                <img
                  onClick={() => setIsOpen(!isOpen)}
                  src={user?.photoURL}
                  alt="avatar"
                  className="w-10 h-10 rounded-xl border-2 border-red-600 cursor-pointer object-cover"
                />

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
          </div>
        </header>

        {/* Content Outlet (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
