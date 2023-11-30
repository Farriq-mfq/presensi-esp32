import { Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";
import AuthLayout from "./AuthLayout";

export default function Layout() {
  const isAuthenticated = true;

  const Layouts = isAuthenticated ? MainLayout : AuthLayout;
  return (
    <Layouts>
      <Outlet />
    </Layouts>
  );
}
