import { useState } from "react";
import { Link, Outlet } from "react-router";
import Container from "../ui/Container";
import { Droplet } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FiHome } from "react-icons/fi";
import { MdBloodtype } from "react-icons/md";
import { BiDonateBlood } from "react-icons/bi";
import useAuth from "../hooks/useAuth";
import { MdOutlineBloodtype } from "react-icons/md";
import { FiUserCheck } from "react-icons/fi";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="max-w-400 mx-auto flex flex-col min-h-screen">
      {/* 1. Navbar stays on top */}

      <div className="flex flex-1">
        {/* 2. Responsive Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 md:w-82 transform bg-white border-red-400 border-r transition-transform duration-300 ease-in-out
            lg:translate-x-0 lg:static lg:inset-0 
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex flex-col justify-between h-full px-4 py-8">
            {/* Logo */}
            <div>
              <Link
                to="/"
                className="flex justify-center items-center gap-2 text-xl md:text-4xl font-extrabold"
              >
                <Droplet size={30} color="red" />
                RedUnity
              </Link>
              <hr className="mt-8 border-red-600" />
              {/* Nav Links */}
              <nav className="mt-6">
                <li>
                  <Link
                    to={"/dashboard"}
                    className="flex hover:text-red-500 duration-300 items-center px-2 py-3 text-black rounded-lg"
                  >
                    <FiHome size={18} />
                    <span className="mx-3 uppercase text-[15px] font-semibold">
                      Home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/my-profile"}
                    className="flex hover:text-red-500 duration-300 items-center px-2 py-3 text-black rounded-lg"
                  >
                    <FiUserCheck size={20} />
                    <span className="mx-3 uppercase text-[15px] font-semibold">
                      My Profile
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/my-donation-requests"}
                    className="flex hover:text-red-500 duration-300 items-center px-2 py-3 text-black rounded-lg"
                  >
                    <BiDonateBlood size={20} />
                    <span className="mx-3 uppercase text-[15px] font-semibold">
                      My Donation Requests
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/create-donation-request"}
                    className="flex hover:text-red-500 duration-300 items-center px-2 py-3 text-black rounded-lg"
                  >
                    <MdOutlineBloodtype size={22} />
                    <span className="mx-3 uppercase text-[15px] font-semibold">
                      Create Donation Request
                    </span>
                  </Link>
                </li>
              </nav>
            </div>

            {/* Profile */}
            <div className="hidden max-sm:flex flex-col items-center mt-6">
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
        <main className="flex-1 min-w-0">
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
