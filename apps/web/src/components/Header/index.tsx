import Button from "../ui/Button";
import { HiBars3 } from "react-icons/hi2";
export default function Header() {
  return (
    <header className="text-white h-14 mb-5 rounded-xl flex justify-between items-center px-3 sticky top-0 z-40 bg-white border dark:bg-neutral-700 dark:border-none">
      <Button>
        <HiBars3 />
      </Button>
    </header>
  );
}
