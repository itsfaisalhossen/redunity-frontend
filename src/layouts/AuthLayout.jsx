import { Outlet } from "react-router";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import Container from "../ui/Container";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="sticky top-0 z-50" />
      <div className="flex-1 h-full">
        <Container>
          <Outlet />
        </Container>
      </div>
      <Footer />
    </div>
  );
};
export default AuthLayout;
