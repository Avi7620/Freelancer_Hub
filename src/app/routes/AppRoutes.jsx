import { useRoutes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Home from "@/pages/Home";
import Register from "@/pages/FreelancerSignUp";
import Login from "@/pages/Login";

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [{ path: "/", element: <Home /> }],
    },
    {
      element: <AuthLayout />,
      children: [{ path: "/register", element: <Register /> }],
    },
    {
      element: <AuthLayout />,
      children: [{ path: "/login", element: <Login/> }],
    },
  ]);

  return routes;
};

export default AppRoutes;
