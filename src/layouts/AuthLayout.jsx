import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="dark:bg-primary-dark bg-primary">
      <Outlet />
    </div>
  );
};
export default AuthLayout;
