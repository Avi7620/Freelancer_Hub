import { useRoutes } from "react-router-dom";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Home from "../../components/Home";
import FreelancerSignup from "../../components/signup/FreelancerSignup";
import ClientDashboard from "../../components/client_dashboard/ClientDashboard";
import ClientSignup from "../../components/signup/ClientSignup";
import PathSelection from "../../components/signup/PathSelection";

import Login from "../../components/Login";
import ForgotPassword from "../../components/ForgotPassword";
import FreelancerDashboard from "../../components/freelancer_dashboard/FreelancerDashboard";

const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [{ index: true, element: <Home /> }],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "signup", element: <PathSelection /> },
        { path: "freelancer-signup", element: <FreelancerSignup /> },
        { path: "client-signup", element: <ClientSignup /> },
        { path: "forgot-password", element: <ForgotPassword /> },
      ],
    },
    {
      path: "/freelancer-dashboard",
      element: (
        <FreelancerDashboard />
      ),
    },

    {
      path: "/client-dashboard",
      element: (
        <ClientDashboard />
      ),
    },

    {
      path: "/login",
      element: (
        <AuthProvider>
          <Login />
        </AuthProvider>
      ),
    },
  ]);
};

export default AppRoutes;
