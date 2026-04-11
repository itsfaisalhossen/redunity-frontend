import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import { LogOut, Droplet, Menu, X, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import DarkMode from "./DarkMode";

const Navbar = () => {
  const { user, signOutUserFunc } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl shadow-2xl border border-red-500/30",
        confirmButton: "px-6 py-3 rounded-xl font-semibold",
        cancelButton:
          "px-6 py-3 rounded-xl font-semibold border border-red-500/30 text-red-400",
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
          customClass: {
            popup: "rounded-2xl shadow-2xl border border-red-500/30",
            confirmButton: "px-8 py-3 rounded-xl font-semibold",
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
    { name: "About Us", path: "/about-us" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-black/70 backdrop-blur-2xl shadow-lg shadow-black/20 border-b border-white/10 dark:border-white/8"
            : "bg-black backdrop-blur-xl border-b border-white/8 dark:border-white/6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center shadow-md shadow-red-900/40">
                <Droplet className="text-white" size={16} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-black tracking-tight text-white uppercase">
                Red<span className="text-red-500">Unity</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-white bg-white/15 border border-white/20"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">

              {!user && (
                <div className="hidden md:flex items-center gap-1">
                  <Link
                    to="/auth/login"
                    className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/auth/register"
                    className="px-4 py-2 text-sm font-semibold text-white bg-[linear-gradient(135deg,#e8002f_0%,#ff2d55_50%,#ff5577_100%)] rounded-lg transition-all duration-200 shadow-sm shadow-red-900/30"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {user && (
                <div ref={dropdownRef} className="relative flex items-center gap-2">
                  <DarkMode />

                  {/* Dashboard */}
                  <Link
                    to="/dashboard"
                    className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200
                      text-red-300
                      bg-red-500/15
                      border border-red-500/25
                      hover:bg-red-500/25"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-70">
                      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor"/>
                      <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".6"/>
                      <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".6"/>
                      <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".3"/>
                    </svg>
                    Dashboard
                  </Link>

                  {/* Avatar */}
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 p-1 pr-2.5 rounded-xl transition-all duration-200
                      border border-white/15
                      bg-white/10
                      hover:border-white/25
                      hover:bg-white/15"
                  >
                    <img
                      src={user?.photoURL}
                      alt="avatar"
                      className="w-7 h-7 rounded-lg object-cover"
                    />
                    <span className="hidden sm:block text-sm font-medium text-white/90 max-w-[90px] truncate">
                      {user?.displayName?.split(" ")[0]}
                    </span>
                    <ChevronDown
                      size={13}
                      className={`text-white/50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {isOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl overflow-hidden z-50
                      bg-black/70
                      backdrop-blur-2xl
                      border border-white/12
                      shadow-xl shadow-black/50">

                      <div className="px-4 py-3 border-b border-white/10">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={user?.photoURL}
                            alt="avatar"
                            className="w-9 h-9 rounded-xl object-cover border border-white/15"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                              {user?.displayName}
                            </p>
                            <p className="text-xs text-white/50 truncate">{user?.email}</p>
                          </div>
                        </div>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors sm:hidden
                          text-white/70
                          hover:text-white
                          hover:bg-white/8"
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor"/>
                          <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/>
                          <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/>
                          <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".25"/>
                        </svg>
                        Dashboard
                      </Link>

                      <div className="px-2 py-2">
                        <button
                          onClick={() => { setIsOpen(false); handleLogout(); }}
                          className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm rounded-xl transition-all duration-200
                            text-red-400
                            hover:text-red-300
                            hover:bg-red-500/15"
                        >
                          <LogOut size={14} />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile toggle */}
              <button
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200
                  text-white/70
                  hover:text-white
                  hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 lg:hidden z-50 flex flex-col
          transform transition-transform duration-300 ease-in-out
          bg-black/75 dark:bg-black/85
          backdrop-blur-2xl
          border-l border-white/10
          shadow-2xl shadow-black/60
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
              <Droplet className="text-white" size={14} />
            </div>
            <span className="text-base font-black tracking-tight text-white uppercase">
              Red<span className="text-red-500">Unity</span>
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all
              text-white/50 hover:text-white
              hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-white bg-white/15 border border-white/20"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-5 border-t border-white/10 space-y-3">
          {user ? (
            <>
              <div className="flex items-center gap-3 px-1">
                <img
                  src={user?.photoURL}
                  alt="avatar"
                  className="w-9 h-9 rounded-xl object-cover border border-white/15"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{user?.displayName}</p>
                  <p className="text-xs text-white/50 truncate">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium rounded-xl transition-all duration-200
                  text-red-400
                  border border-red-500/25
                  hover:bg-red-500/15"
              >
                <LogOut size={14} />
                Sign out
              </button>
            </>
          ) : (
            <div className="space-y-2" onClick={() => setIsMobileMenuOpen(false)}>
              <Link
                to="/auth/login"
                className="flex items-center justify-center w-full py-2.5 text-sm font-medium rounded-xl transition-all duration-200
                  text-white/80
                  border border-white/15
                  hover:border-white/25
                  hover:bg-white/10"
              >
                Log in
              </Link>
              <Link
                to="/auth/register"
                className="flex items-center justify-center w-full py-2.5 text-sm font-semibold text-white bg-[linear-gradient(135deg,#e8002f_0%,#ff2d55_50%,#ff5577_100%)] rounded-xl transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm lg:hidden z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;