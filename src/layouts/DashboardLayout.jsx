/* eslint-disable react-hooks/static-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useRef, useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { MdOutlineBloodtype, MdOutlinePayments } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { BiDonateBlood } from "react-icons/bi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  Droplet,
  LayoutDashboard,
  LogOut,
  Home,
  User,
  Bell,
  Search,
  Settings,
  ChevronLeft,
  Menu,
  Sun,
  Moon,
  HelpCircle,
  X,
} from "lucide-react";


/* ────────────────── Inject Google Fonts once ─────────────────── */
const injectFonts = () => {
  if (document.getElementById("ru-fonts")) return;
  const link = document.createElement("link");
  link.id = "ru-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";
  document.head.appendChild(link);
};

/* ──────────────────── Inject keyframe animations + utilities once ───────────────────── */
const injectStyles = () => {
  if (document.getElementById("ru-dash-styles")) return;
  const s = document.createElement("style");
  s.id = "ru-dash-styles";
  s.textContent = `
    @keyframes ru-pulse {
      0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,.35)}
      50%{box-shadow:0 0 0 7px rgba(220,38,38,0)}
    }
    @keyframes ru-blink {
      0%,100%{opacity:1} 50%{opacity:.25}
    }
    @keyframes ru-card-in {
      from{opacity:0;transform:translateY(14px)}
      to{opacity:1;transform:none}
    }
    @keyframes ru-drop-in {
      from{opacity:0;transform:translateY(-8px) scale(.96)}
      to{opacity:1;transform:none}
    }
    @keyframes ru-fade-in {
      from{opacity:0} to{opacity:1}
    }

    .ru-logo-pulse { animation: ru-pulse 3s ease-in-out infinite; }
    .ru-blink      { animation: ru-blink 2.2s ease-in-out infinite; }
    .ru-drop-in    { animation: ru-drop-in .2s cubic-bezier(.4,0,.2,1); }
    .ru-fade-in    { animation: ru-fade-in .2s ease; }
    .ru-c1 { animation: ru-card-in .45s cubic-bezier(.4,0,.2,1) .05s both; }
    .ru-c2 { animation: ru-card-in .45s cubic-bezier(.4,0,.2,1) .10s both; }

    /* sidebar width transition */
    .ru-sidebar {
      transition: width .32s cubic-bezier(.4,0,.2,1),
                  min-width .32s cubic-bezier(.4,0,.2,1);
    }

    /* active nav indicator bar */
    .ru-nav-active { position: relative; }
    .ru-nav-active::after {
      content: '';
      position: absolute; right: 0; top: 50%;
      transform: translateY(-50%);
      width: 3px; height: 60%;
      background: #dc2626;
      border-radius: 2px 0 0 2px;
    }
    .dark .ru-nav-active::after { background: #f87171; }

    /* thin scrollbar */
    .ru-scroll::-webkit-scrollbar { width: 3px; }
    .ru-scroll::-webkit-scrollbar-track { background: transparent; }
    .ru-scroll::-webkit-scrollbar-thumb { background: #d4cfc9; border-radius: 4px; }
    .dark .ru-scroll::-webkit-scrollbar-thumb { background: #3a3330; }

    /* search expand animation */
    .ru-search {
      transition: width .25s ease, border-color .2s, box-shadow .2s;
    }
    .ru-search:focus {
      width: 220px !important;
      outline: none;
    }
  `;
  document.head.appendChild(s);
};

/* ═════════════════════ DASHBOARD LAYOUT ══════════════════════ */
const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed]   = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      localStorage.getItem("ru-theme") === "dark" ||
      document.documentElement.classList.contains("dark")
    );
  });

  const { user, signOutUserFunc } = useAuth();
  const dropdownRef = useRef(null);
  const { role } = useRole();
  const location = useLocation();

  /* ── init fonts + styles ── */
  useEffect(() => {
    injectFonts();
    injectStyles();
  }, []);

  /* ── sync dark class on <html> ── */
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("ru-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("ru-theme", "light");
    }
  }, [dark]);

  /* ── close dropdown on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── close mobile sidebar on route change ── */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* ── logout ── */
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
      cancelButtonColor: "#1e293b",
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl shadow-2xl border border-red-500/30",
        confirmButton: "px-6 py-3 rounded-xl font-semibold",
        cancelButton: "px-6 py-3 rounded-xl font-semibold border border-red-500/30 text-red-400",
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

  /* ── nav link class ── */
  const navClass = ({ isActive }) =>
    [
      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative select-none",
      isActive
        ? "ru-nav-active bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-medium"
        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white",
    ].join(" ");

  /* ───────────────────────────────── NavItem — with tooltip when collapsed ───────────────────────────────── */
  const NavItem = ({ to, end, icon: Icon, label, badge }) => (
    <div className="relative group/tip">
      <NavLink to={to} end={end} className={navClass}>
        <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
          <Icon size={18} strokeWidth={1.8} />
        </span>
        <span
          className={`text-[13px] tracking-wide overflow-hidden whitespace-nowrap transition-all duration-300 ${
            collapsed ? "w-0 opacity-0" : "opacity-100"
          }`}
        >
          {label}
        </span>
        {badge && !collapsed && (
          <span className="ml-auto text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full leading-none">
            {badge}
          </span>
        )}
      </NavLink>

      {/* tooltip shown only when sidebar is collapsed */}
      {collapsed && (
        <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 z-[200]">
          {label}
          <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-100" />
        </div>
      )}
    </div>
  );

  /* ───────────────────────────────── Section label — hides when collapsed ───────────────────────────────── */
  const SectionLabel = ({ children }) => (
    <p
      className={`text-[10px] font-semibold tracking-[1.5px] uppercase text-gray-400 dark:text-gray-600 px-3 pt-4 pb-1.5 overflow-hidden whitespace-nowrap transition-all duration-300 ${
        collapsed ? "opacity-0 h-0 py-0 pt-0" : "opacity-100"
      }`}
    >
      {children}
    </p>
  );

  /* ═════════════════════ RENDER ═════════════════════════ */
  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="flex h-screen overflow-hidden bg-[#f8f7f4] dark:bg-[#0e0c0b] text-gray-900 dark:text-gray-100"
    >

      {/* ════════════════════════════ MOBILE OVERLAY ════════════════════════════ */}
      {mobileOpen && (
        <div
          className="ru-fade-in fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ════════════════════════════ SIDEBAR ════════════════════════════ */}
      <aside
        className={`
          ru-sidebar ru-scroll
          fixed lg:static inset-y-0 left-0 z-50
          flex flex-col h-screen overflow-hidden
          bg-white dark:bg-[#111010]
          border-r border-gray-200 dark:border-white/5
          transition-transform duration-300 lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{
          width: collapsed ? 72 : 260,
          minWidth: collapsed ? 72 : 260,
        }}
      >

        {/* Logo row */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100 dark:border-white/5 min-h-17.5">
          <div className="ru-logo-pulse w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center shrink-0">
            <Droplet size={18} className="text-white fill-white" />
          </div>

          <span
            className={`font-black text-[24px] tracking-tight uppercase text-gray-900 dark:text-white overflow-hidden whitespace-nowrap transition-all duration-300 ${
              collapsed ? "w-0 opacity-0" : "opacity-100"
            }`}
            // style={{ fontFamily: "'Syne', sans-serif" }}
          >
            RedUnity
          </span>

          {/* Collapse button — desktop */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex ml-auto w-7 h-7 items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 flex-shrink-0"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft
              size={13}
              strokeWidth={2.5}
              className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            />
          </button>

          {/* Close button — mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="ru-scroll flex-1 overflow-y-auto px-2.5 py-3 flex flex-col gap-0.5">
          <SectionLabel>Navigation</SectionLabel>

          <NavItem to="/"               end  icon={Home}            label="Home"       />
          <NavItem to="/dashboard"      end  icon={LayoutDashboard} label="Overview"   />
          <NavItem to="/dashboard/my-profile" icon={User}           label="My Profile" />

          {role === "Donor" && (
            <>
              <SectionLabel>Donations</SectionLabel>
              <NavItem
                to="/dashboard/my-donation-requests"
                icon={BiDonateBlood}
                label="My Requests"
                badge="3"
              />
              <NavItem
                to="/dashboard/create-donation-request"
                icon={MdOutlineBloodtype}
                label="Create Request"
              />
            </>
          )}

          {role === "Admin" && (
            <>
              <SectionLabel>Administration</SectionLabel>
              <NavItem to="/dashboard/all-users"                   icon={FaUserShield}  label="All Users"       />
              <NavItem to="/dashboard/all-blood-donation-request"  icon={BiDonateBlood} label="Manage Requests" />
            </>
          )}

          {role === "Volunteer" && (
            <>
              <SectionLabel>Volunteer</SectionLabel>
              <NavItem
                to="/dashboard/all-blood-donation-request"
                icon={BiDonateBlood}
                label="Donation Requests"
              />
            </>
          )}

          <SectionLabel>Account</SectionLabel>
          <NavItem to="/dashboard/payments"  icon={MdOutlinePayments} label="Payments" />
          <NavItem to="/dashboard/settings"  icon={Settings}          label="Settings" />
        </nav>

        {/* Role chip */}
        <div className="mx-3 mb-3 flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 overflow-hidden">
          <span className="ru-blink w-2 h-2 bg-red-600 rounded-full flex-shrink-0" />
          <span
            className={`text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap overflow-hidden transition-all duration-300 ${
              collapsed ? "w-0 opacity-0" : "opacity-100"
            }`}
          >
            <strong className="text-gray-800 dark:text-gray-200 font-medium">
              {role || "User"}
            </strong>{" "}
            · Active
          </span>
        </div>

        {/* Help card */}
        <div
          className={`mx-3 mb-4 overflow-hidden transition-all duration-300 ${
            collapsed ? "opacity-0 h-0 mb-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/50 rounded-lg flex items-center justify-center mb-3">
              <HelpCircle size={16} className="text-red-600 dark:text-red-400" />
            </div>
            <h5
              className="text-xs font-bold text-gray-900 dark:text-white mb-1 uppercase tracking-wide"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Need Help?
            </h5>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
              Contact our support team anytime.
            </p>
            <button className="w-full py-2 text-[11px] font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 uppercase tracking-wide">
              Contact Support
            </button>
          </div>
        </div>
      </aside>

      {/* ════════════════════════════ MAIN CONTENT ════════════════════════════ */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="ru-c1 shrink-0 flex items-center gap-3 px-5 md:px-7 h-17.5 bg-white dark:bg-[#111010] border-b border-gray-200 dark:border-white/5 overflow-visible relative z-50">

          {/* hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

          {/* breadcrumb */}
          <div className="flex flex-col leading-none">
            <h1
              className="text-[17px] font-bold tracking-tight text-gray-900 dark:text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Dashboard
            </h1>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
              Overview
            </p>
          </div>

          {/* right controls */}
          <div className="ml-auto flex items-center gap-2">

            {/* search */}
            <div className="relative hidden sm:flex items-center">
              <Search size={14} className="absolute left-3 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                className="ru-search bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full py-2 pl-9 pr-4 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 w-40 focus:w-50 focus:border-red-400 dark:focus:border-red-700 focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-red-500/10"
              />
            </div>

            {/* notification bell */}
            <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200">
              <Bell size={17} strokeWidth={1.8} />
              <span className="absolute top-2.25 right-2.25 w-1.5 h-1.5 bg-red-600 rounded-full border border-white dark:border-[#111010]" />
            </button>

            {/* dark / light toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-amber-500 hover:border-amber-200 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {dark
                ? <Sun  size={17} strokeWidth={1.8} />
                : <Moon size={17} strokeWidth={1.8} />
              }
            </button>

            {/* avatar + dropdown */}
            {user && (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl border border-gray-200 dark:border-white/10 hover:border-red-300 dark:hover:border-red-700/50 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200"
                >
                  <img
                    src={user?.photoURL}
                    alt="avatar"
                    className="w-7 h-7 rounded-lg border border-red-300 dark:border-red-700 object-cover shrink-0"
                  />
                  <span className="hidden md:block text-xs font-medium text-gray-700 dark:text-gray-300 max-w-20 truncate">
                    {user?.displayName}
                  </span>
                  <ChevronLeft
                    size={12}
                    className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-90" : "-rotate-90"}`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="ru-drop-in absolute right-0 top-[calc(100%+8px)] w-52 bg-white dark:bg-[#1a1816] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden z-[999]">

                    {/* user info */}
                    <div className="px-4 py-3.5 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
                      <img
                        src={user?.photoURL}
                        alt=""
                        className="w-9 h-9 rounded-xl border border-red-200 dark:border-red-800 object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {user?.displayName}
                        </p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    {/* role */}
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-white/5">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-full">
                        <span className="ru-blink w-1.5 h-1.5 bg-red-500 rounded-full" />
                        {role || "User"}
                      </span>
                    </div>

                    {/* links */}
                    <div className="p-1.5">
                      <NavLink
                        to="/dashboard/my-profile"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-all"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <User size={15} strokeWidth={1.8} />
                        View Profile
                      </NavLink>
                      <NavLink
                        to="/dashboard/settings"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-all"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Settings size={15} strokeWidth={1.8} />
                        Settings
                      </NavLink>
                    </div>

                    <div className="p-1.5 border-t border-gray-100 dark:border-white/5">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                      >
                        <LogOut size={15} strokeWidth={1.8} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Page outlet */}
        <main className="ru-c2 ru-scroll flex-1 overflow-y-auto bg-[#f8f7f4] dark:bg-[#0e0c0b]">
          <div className="max-w-7xl mx-auto p-5 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;


 