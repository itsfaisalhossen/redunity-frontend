// import { useState } from "react";
// import { Link, Outlet } from "react-router";
// import Container from "../ui/Container";
// import { Droplet } from "lucide-react";
// import { FaRegUser } from "react-icons/fa";
// import { CgProfile } from "react-icons/cg";
// import { FiHome } from "react-icons/fi";
// import { BiDonateBlood } from "react-icons/bi";
// import useAuth from "../hooks/useAuth";
// import { MdOutlineBloodtype } from "react-icons/md";
// import { FiUserCheck } from "react-icons/fi";
// import { FaUserShield } from "react-icons/fa";
// import useRole from "../hooks/useRole";

// const DashboardLayout = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { user } = useAuth();
//   const { role } = useRole();

//   return (
//     <div className="max-w-400 mx-auto flex flex-col min-h-screen">
//       {/* 1. Navbar stays on top */}

//       <div className="flex flex-1">
//         {/* 2. Responsive Sidebar */}
//         <aside
//           className={`
//             fixed inset-y-0 left-0 z-40 md:w-82 transform bg-white border-red-400 border-r transition-transform duration-300 ease-in-out
//             lg:translate-x-0 lg:static lg:inset-0
//             ${isOpen ? "translate-x-0" : "-translate-x-full"}
//           `}
//         >
//           <div className="flex flex-col justify-between h-full px-4 py-8">
//             {/* Aside */}
//             <div>
//               {/* Logo */}
//               <Link
//                 to="/"
//                 className="flex justify-center items-center gap-2 text-xl md:text-4xl font-extrabold"
//               >
//                 <Droplet size={30} color="red" />
//                 RedUnity
//               </Link>
//               <hr className="mt-8 border-red-600" />
//               {/* Nav Links */}
//               <nav className="mt-6">
//                 <li>
//                   <Link
//                     to={"/dashboard"}
//                     className="flex hover:text-red-500 duration-300 items-center px-2 py-3 text-black rounded-lg"
//                   >
//                     <FiHome size={18} />
//                     <span className="mx-3 uppercase text-[15px] font-semibold">
//                       Home
//                     </span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to={"/dashboard/my-profile"}
//                     className="flex hover:text-red-500 duration-300 items-center px-2 py-3 text-black rounded-lg"
//                   >
//                     <FiUserCheck size={20} />
//                     <span className="mx-3 uppercase text-[15px] font-semibold">
//                       My Profile
//                     </span>
//                   </Link>
//                 </li>
//                 {role === "Donor" && (
//                   <>
//                     <li>
//                       <Link
//                         to={"/dashboard/my-donation-requests"}
//                         className="flex hover:text-red-500 duration-300 items-center px-2 py-3 text-black rounded-lg"
//                       >
//                         <BiDonateBlood size={20} />
//                         <span className="mx-3 uppercase text-[15px] font-semibold">
//                           My Donation Requests
//                         </span>
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to={"/dashboard/create-donation-request"}
//                         className="flex hover:text-red-500 duration-300 items-center px-2 py-3 text-black rounded-lg"
//                       >
//                         <MdOutlineBloodtype size={22} />
//                         <span className="mx-3 uppercase text-[15px] font-semibold">
//                           Create Donation Request
//                         </span>
//                       </Link>
//                     </li>
//                   </>
//                 )}
//                 {role === "Admin" && (
//                   <>
//                     <li>
//                       <Link
//                         to={"/dashboard/all-users"}
//                         className="flex hover:text-red-500 duration-300 items-center px-2 py-3 text-black rounded-lg"
//                       >
//                         <FaUserShield size={18} />
//                         <span className="mx-3 uppercase text-[15px] font-semibold">
//                           All users
//                         </span>
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to={"/dashboard/all-blood-donation-request"}
//                         className="flex hover:text-red-500 duration-300 items-center px-2 py-3 text-black rounded-lg"
//                       >
//                         <BiDonateBlood size={20} />
//                         <span className="mx-3 uppercase text-[15px] font-semibold">
//                           All blood donation request
//                         </span>
//                       </Link>
//                     </li>
//                   </>
//                 )}
//                 {role === "Volunteer" && (
//                   <>
//                     <li>
//                       <Link
//                         to={"/dashboard/all-blood-donation-request"}
//                         className="flex hover:text-red-500 duration-300 items-center px-2 py-3 text-black rounded-lg"
//                       >
//                         <BiDonateBlood size={20} />
//                         <span className="mx-3 uppercase text-[15px] font-semibold">
//                           All blood donation request
//                         </span>
//                       </Link>
//                     </li>
//                   </>
//                 )}
//               </nav>
//             </div>

//             {/* Profile */}
//             <div className="hidden max-sm:flex flex-col items-center mt-6">
//               <img
//                 className="object-cover w-24 h-24 rounded-full"
//                 src={user?.photoURL}
//                 alt="avatar"
//               />
//               <h4 className="mt-2 font-medium text-gray-800 dark:text-gray-200">
//                 {user?.displayName}
//               </h4>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {user?.email}
//               </p>
//             </div>
//           </div>
//         </aside>

//         {/* 3. Main Content Area */}
//         <main className="flex-1 min-w-0">
//           {/* Mobile Toggle Button (Visible only on mobile) */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="p-4 lg:hidden text-gray-600 dark:text-gray-200"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16m-7 6h7"
//               />
//             </svg>
//           </button>

//           <Container>
//             <Outlet />
//           </Container>
//         </main>
//       </div>

//       {/* 4. Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-30 bg-black/50 lg:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// // Simple Icon Components
// const DashboardIcon = () => <CgProfile size={20} />;
// const AccountIcon = () => <FaRegUser size={20} />;

// export default DashboardLayout;

import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router";
import Container from "../ui/Container";
import { Droplet } from "lucide-react";
import { FaRegUser, FaUserShield } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FiHome, FiUserCheck } from "react-icons/fi";
import { BiDonateBlood } from "react-icons/bi";
import { MdOutlineBloodtype } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { role } = useRole();

  // Reusable dynamic class for NavLinks
  const navLinkStyles = ({ isActive }) =>
    `flex items-center px-4 py-3 duration-300 rounded-lg transition-colors ${
      isActive
        ? "text-red-600 bg-red-50 font-bold"
        : "text-gray-700 hover:text-red-500 hover:bg-gray-50 font-semibold"
    }`;

  return (
    <div className="max-w-400 mx-auto flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 md:w-82 transform bg-white border-red-400 border-r transition-transform duration-300 ease-in-out
            lg:translate-x-0 lg:static lg:inset-0 
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex flex-col justify-between h-full px-4 py-8">
            <div>
              {/* Logo */}
              <Link
                to="/"
                className="flex justify-center items-center gap-2 text-xl md:text-4xl font-extrabold"
              >
                <Droplet size={30} color="red" />
                RedUnity
              </Link>
              <hr className="mt-8 border-red-600" />

              {/* Nav Links */}
              <nav className="mt-6 list-none space-y-2">
                <li>
                  <NavLink to="/dashboard" end className={navLinkStyles}>
                    <FiHome size={18} />
                    <span className="mx-3 uppercase text-[15px]">Home</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/my-profile" className={navLinkStyles}>
                    <FiUserCheck size={20} />
                    <span className="mx-3 uppercase text-[15px]">
                      My Profile
                    </span>
                  </NavLink>
                </li>

                {role === "Donor" && (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard/my-donation-requests"
                        className={navLinkStyles}
                      >
                        <BiDonateBlood size={20} />
                        <span className="mx-3 uppercase text-[15px]">
                          My Donation Requests
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/create-donation-request"
                        className={navLinkStyles}
                      >
                        <MdOutlineBloodtype size={22} />
                        <span className="mx-3 uppercase text-[15px]">
                          Create Donation Request
                        </span>
                      </NavLink>
                    </li>
                  </>
                )}

                {role === "Admin" && (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard/all-users"
                        className={navLinkStyles}
                      >
                        <FaUserShield size={18} />
                        <span className="mx-3 uppercase text-[15px]">
                          All users
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/all-blood-donation-request"
                        className={navLinkStyles}
                      >
                        <BiDonateBlood size={20} />
                        <span className="mx-3 uppercase text-[15px]">
                          All blood donation request
                        </span>
                      </NavLink>
                    </li>
                  </>
                )}

                {role === "Volunteer" && (
                  <li>
                    <NavLink
                      to="/dashboard/all-blood-donation-request"
                      className={navLinkStyles}
                    >
                      <BiDonateBlood size={20} />
                      <span className="mx-3 uppercase text-[15px]">
                        All blood donation request
                      </span>
                    </NavLink>
                  </li>
                )}
              </nav>
            </div>

            {/* Profile Section for Mobile */}
            <div className="lg:hidden flex flex-col items-center mt-6">
              <img
                className="object-cover w-24 h-24 rounded-full border-2 border-red-500"
                src={user?.photoURL}
                alt="avatar"
              />
              <h4 className="mt-2 font-medium text-gray-800 uppercase">
                {user?.displayName}
              </h4>
              <p className="text-sm text-gray-600 lowercase">{user?.email}</p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 bg-gray-50">
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-4 lg:hidden text-gray-600"
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
            <div className="py-6">
              <Outlet />
            </div>
          </Container>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
