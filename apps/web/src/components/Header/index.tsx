import { useContext } from "react";
import BreadCrumbs from "../BreadCrumbs";
import Button from "../ui/Button";
import { HiBars3 } from "react-icons/hi2";
import { UiContext } from "../../contexts/UiContext";
export default function Header() {
  const { sidebar } = useContext(UiContext);
  const handleShowSidebar = () => {
    const currentSidebar = sidebar.current;
    if (currentSidebar) {
      const classNameSidebar = "translate-x-[-100%]";
      if (currentSidebar.classList.contains(classNameSidebar)) {
        currentSidebar.classList.remove(classNameSidebar);
      } else {
        currentSidebar.classList.add(classNameSidebar);
      }
    }
  };
  return (
    <header className="text-white h-14 mb-5 rounded-xl flex justify-between items-center px-3 sticky top-2 z-40 bg-white border dark:bg-neutral-700 dark:border-none">
      <BreadCrumbs />
      <Button className="lg:hidden" onClick={handleShowSidebar}>
        <HiBars3 className="h-5 w-5" />
      </Button>
    </header>
  );
}
