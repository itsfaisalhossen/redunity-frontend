import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import { LogOut, LayoutDashboard, Droplet } from "lucide-react";
import toast from "react-hot-toast";
import BtnPrimary from "./BtnPrimary";

const Navbar = () => {
  const { user, signOutUserFunc } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    signOutUserFunc().then(() => {
      toast.success("Logged out successfully");
    });
  };

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="bg-red-500 text-white px-6 py-5 md:py-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl md:text-3xl font-bold"
        >
          <Droplet />
          RedUnity
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-1.5 md:gap-6">
          <NavLink
            to="/donation-requests"
            className="hover:border-b border-white/80 text-white duration-100 py-1 px-3.5"
          >
            Donation Requests
          </NavLink>

          {!user && <BtnPrimary text={"Login"} link={"/auth/login"} />}

          {user && (
            <>
              <NavLink to="/funding" className="hover:text-gray-200 transition">
                Funding
              </NavLink>

              {/* Avatar Dropdown */}
              <div ref={dropdownRef} className="relative">
                <img
                  onClick={() => setIsOpen(!isOpen)}
                  src={user?.photoURL}
                  alt="avatar"
                  title={user?.displayName}
                  className="w-9 h-9 rounded-full border-2 border-white cursor-pointer"
                />

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-md shadow-lg">
                    <NavLink
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </NavLink>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
