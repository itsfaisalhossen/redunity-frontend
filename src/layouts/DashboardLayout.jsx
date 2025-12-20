import { useState } from "react";
import { Link, Outlet } from "react-router";
import Container from "../ui/Container";
import { Droplet } from "lucide-react";
import { FaHome, FaRegUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Navbar stays on top */}

      <div className="flex flex-1">
        {/* 2. Responsive Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r transition-transform duration-300 ease-in-out dark:bg-gray-900 dark:border-gray-700
            lg:translate-x-0 lg:static lg:inset-0 
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex flex-col justify-between h-full px-4 py-8">
            {/* Logo */}
            <div>
              <Link
                to="/"
                className="flex justify-center items-center gap-2 text-xl md:text-3xl font-extrabold"
              >
                <Droplet color="red" />
                RedUnity
              </Link>
              {/* Nav Links */}
              <nav className="mt-6 space-y-3">
                <a
                  className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                  href="#"
                >
                  <DashboardIcon />
                  <span className="mx-4 font-medium">My Profile</span>
                </a>
                <a
                  className="flex items-center px-4 py-2 text-gray-600 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  href="#"
                >
                  <AccountIcon />
                  <span className="mx-4 font-medium">Accounts</span>
                </a>
              </nav>
            </div>
            {/* Profile */}
            <div className="flex flex-col items-center mt-6">
              <img
                className="object-cover w-24 h-24 rounded-full"
                src={user?.photoURL}
                alt="avatar"
              />
              <h4 className="mt-2 font-medium text-gray-800 dark:text-gray-200">
                {user?.displayName}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>
        </aside>

        {/* 3. Main Content Area */}
        <main className="flex-1 min-w-0 bg-gray-50 dark:bg-gray-950">
          {/* Mobile Toggle Button (Visible only on mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-4 lg:hidden text-gray-600 dark:text-gray-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          <Container>
            <Outlet />
          </Container>
        </main>
      </div>

      {/* 4. Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

// Simple Icon Components
const DashboardIcon = () => <CgProfile size={20} />;
const AccountIcon = () => <FaRegUser size={20} />;

export default DashboardLayout;
