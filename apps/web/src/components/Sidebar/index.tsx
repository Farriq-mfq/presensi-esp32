import DarkModeTogle from "../DarkModelToggle";
import BaseLink from "../ui/Link";
import { LuLayoutDashboard, LuUser2, LuList } from "react-icons/lu";
export default function Sidebar() {
  return (
    <aside className="w-[250px] min-h-screen fixed bg-slate-900 dark:bg-slate-800 text-white rounded-r-3xl shadow-xl z-50 hidden lg:block">
      <div className="py-5 text-center">
        <h1 className="font-semibold text-xl">SISTEM PRESENSI</h1>
        <DarkModeTogle />
      </div>
      <div className="flex flex-col px-2 mt-5">
        <BaseLink active to={"/"}>
          <LuLayoutDashboard />
          Dashboard
        </BaseLink>
        <BaseLink to={"/users"}>
          <LuUser2 />
          Users
        </BaseLink>
        <BaseLink to={"/"}>
          <LuList />
          Presensi
        </BaseLink>
      </div>
    </aside>
  );
}
