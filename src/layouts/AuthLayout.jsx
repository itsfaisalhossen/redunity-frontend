import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="dark:bg-primary-dark">
      <Outlet />
    </div>
  );
};
export default AuthLayout;
