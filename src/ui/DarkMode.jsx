import { RiMoonClearLine } from "react-icons/ri";
import { IoMdSunny } from "react-icons/io";

import { useEffect, useState } from "react";

const DarkMode = () => {
  const [darkMode, SetDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "ligth");
    }
  }, [darkMode]);

  return (
    <div>
      <button
        onClick={() => SetDarkMode((prev) => !prev)}
        className="p-1 bg-red-700 rounded-md flex items-center justify-center cursor-pointer  text-white shadow gap-2"
      >
        {darkMode ? <IoMdSunny size={18} /> : <RiMoonClearLine size={18} />}{" "}
      </button>
    </div>
  );
};
export default DarkMode;
