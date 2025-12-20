import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import { LogOut, LayoutDashboard, Droplet, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import BtnPrimary from "./BtnPrimary";

const Navbar = () => {
  const { user, signOutUserFunc } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    signOutUserFunc().then(() => {
      toast.success("Logged out successfully");
    });
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
    { name: "Search Donation", path: "/search-donation" },
  ];

  return (
    <nav className="bg-black text-white px-6 py-4 md:py-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl md:text-3xl font-bold z-50"
        >
          <Droplet className="text-red-600" />
          RedUnity
        </Link>
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `duration-200 py-1 border-b-2 ${
                  isActive
                    ? "border-red-600 text-white"
                    : "border-transparent text-gray-300 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {user && (
            <NavLink
              to="/funding"
              className="text-gray-300 hover:text-white transition"
            >
              Funding
            </NavLink>
          )}
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
              <img
                onClick={() => setIsOpen(!isOpen)}
                src={user?.photoURL}
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-red-600 cursor-pointer object-cover"
              />
              {isOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b text-sm font-semibold text-gray-500 uppercase">
                    {user?.displayName}
                  </div>
                  <NavLink
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </NavLink>
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
          {user && (
            <NavLink
              to="/funding"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium hover:text-red-500 transition"
            >
              Funding
            </NavLink>
          )}
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
