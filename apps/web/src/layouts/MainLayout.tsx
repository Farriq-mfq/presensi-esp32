import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="dark:bg-neutral-900 dark:text-white">
      <Sidebar />
      <main className="lg:ml-[250px] ml-0 min-h-screen p-4">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
