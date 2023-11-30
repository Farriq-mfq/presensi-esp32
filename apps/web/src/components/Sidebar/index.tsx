import { LuDisc2, LuLayoutDashboard, LuList, LuUser2 } from "react-icons/lu";
import DarkModeTogle from "../DarkModelToggle";
import BaseLink from "../ui/Link";
export default function Sidebar() {
  return (
    <aside className="w-[250px] top-0 bottom-0 fixed bg-slate-900 dark:bg-indigo-700 text-white rounded-r-3xl shadow-xl z-50 hidden lg:block">
      <div className="py-5 text-center">
        <h1 className="font-semibold text-xl">SISTEM PRESENSI</h1>
        <DarkModeTogle />
      </div>
      <div className="flex flex-col px-2 mt-5">
        <BaseLink to={"/"}>
          <LuLayoutDashboard />
          Dashboard
        </BaseLink>
        <BaseLink to={"/users"}>
          <LuUser2 />
          Users
        </BaseLink>
        <BaseLink to={"/mode"}>
          <LuDisc2 />
          Mode
        </BaseLink>
        <BaseLink to={"/presensi"}>
          <LuList />
          Presensi
        </BaseLink>
      </div>
    </aside>
  );
}
