import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div style={{ padding: "2rem", minHeight: "100vh" }}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
