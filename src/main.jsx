import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/router";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
// import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./contexts/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <HelmetProvider> */}
    <AuthProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </AuthProvider>
    {/* </HelmetProvider> */}
  </StrictMode>
);
