import { useContext, useEffect, useRef } from "react";
import { LuDisc2, LuLayoutDashboard, LuList, LuUser2 } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import { UiContext } from "../../contexts/UiContext";
import DarkModeTogle from "../DarkModelToggle";
import BaseLink from "../ui/Link";
export default function Sidebar() {
  const { handleSidebar, sidebar } = useContext(UiContext);
  const refSidebar = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (refSidebar) {
      handleSidebar(refSidebar);
    }
  }, [refSidebar]);

  useEffect(() => {
    const currentSidebar = sidebar.current;
    if (currentSidebar) {
      const classNameSidebar = "translate-x-[-100%]";
      currentSidebar.classList.add(classNameSidebar);
    }
  }, [location]);
  return (
    <aside
      ref={refSidebar}
      className="w-[250px] top-0 bottom-0 transition-transform fixed bg-slate-900 dark:bg-indigo-700 text-white rounded-r-3xl shadow-xl z-50 translate-x-[-100%] lg:translate-x-0"
    >
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
