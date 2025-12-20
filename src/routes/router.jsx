import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Error from "../pages/error/Error";
import SearchDonation from "../pages/SearchDonation/SearchDonation";
import BloodDonationReq from "../pages/bloodDonationReq/bloodDonationReq";
import Loading from "../ui/Loading";
import ProfilePage from "../pages/dashboard/AllUserProfile/ProfilePage";
import Funding from "../pages/funding/Funding";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    hydrateFallbackElement: <Loading />,
    children: [
      { index: true, element: <Home /> },
      { path: "search-donation", element: <SearchDonation /> },
      { path: "donation-requests", element: <BloodDonationReq /> },
      { path: "funding", element: <Funding /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      {
        path: "register",
        element: <Register />,
        loader: () => fetch("/dristict.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [{ index: true, element: <ProfilePage /> }],
  },
  { path: "/*", element: <Error /> },
]);
