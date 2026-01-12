import { Outlet } from "react-router";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

const RootLayout = () => {
  return (
    <div className="dark:bg-primary-dark bg-primary flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 h-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default RootLayout;
