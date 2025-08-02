import { useRoutes } from "react-router-dom";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Home from "../../components/Home";
import Register from "../../components/signup/FreelancerSignup";
import Login from "../../components/Login";
import ForgotPassword from "../../components/ForgotPassword";
import FreelancerDashboard from "../../components/freelancer_dashboard/FreelancerDashboard";

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <FreelancerDashboard /> : <Login />;
}

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
        { path: "register", element: <Register /> },
        { path: "forgotPassword", element: <ForgotPassword /> },
      ],
    },
    {
      path: "/freelancer-dashboard",
      element: (
        <AuthProvider>
          <AppContent />
        </AuthProvider>
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
