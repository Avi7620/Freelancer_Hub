import { useRoutes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Home from "@/pages/Home";
import Register from "@/pages/Register";

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
  ]);

  return routes;
};

export default AppRoutes;
