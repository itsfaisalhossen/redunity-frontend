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
import DashboardHome from "../pages/dashboard/dashboardHome/DashboardHome";
import MyDonationRequests from "../pages/dashboard/donor/MyDonationRequests";
import CreateDonationRequest from "../pages/dashboard/donor/CreateDonationRequest";
import BloodRequestDetails from "../pages/bloodRequestDetails/BloodRequestDetails";
import PrivateRoute from "./PrivateRoute ";
import AllUsers from "../pages/dashboard/admin/AllUsers";
import AllBloodDonationRequest from "../pages/dashboard/admin/AllBloodDonationRequest";
import AdminRoute from "./AdminRoute";
import DonorRoute from "./DonorRoute";
import RoleRoute from "./RoleRoute ";
import UpdateDonationRequest from "../pages/dashboard/donor/UpdateDonationRequest";
import ViewDetails from "../pages/dashboard/donor/ViewDetails";
import BloodDetails from "../pages/bloodDetails/BloodDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    hydrateFallbackElement: <Loading />,
    children: [
      { index: true, element: <Home /> },
      { path: "search-donation", element: <SearchDonation /> },
      { path: "donation-requests", element: <BloodDonationReq /> },
      {
        path: "blood-equest-details",
        element: (
          <PrivateRoute>
            <BloodRequestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "blood-details",
        element: (
          <PrivateRoute>
            <BloodDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "funding",
        element: (
          <PrivateRoute>
            <Funding />
          </PrivateRoute>
        ),
      },
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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "my-profile", element: <ProfilePage /> },
      {
        path: "create-donation-request",
        element: (
          <DonorRoute>
            <CreateDonationRequest />
          </DonorRoute>
        ),
      },
      {
        path: "view-details-donation",
        element: (
          <DonorRoute>
            <ViewDetails />
          </DonorRoute>
        ),
      },
      {
        path: "update-donation-request",
        element: (
          <DonorRoute>
            <UpdateDonationRequest />
          </DonorRoute>
        ),
      },
      {
        path: "my-donation-requests",
        element: (
          <DonorRoute>
            <MyDonationRequests />
          </DonorRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: (
          <RoleRoute allowedRoles={["Admin", "Volunteer"]}>
            <AllBloodDonationRequest />
          </RoleRoute>
        ),
      },
    ],
  },
  { path: "/*", element: <Error /> },
]);
