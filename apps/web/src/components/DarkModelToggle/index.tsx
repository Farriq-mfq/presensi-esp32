import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
type themeSelect = "light" | "dark";
const LOCAL_STORAGE_KEY = "theme_presensi";

export default function DarkModeTogle() {
  const [theme, setTheme] = useState<themeSelect>(
    localStorage[LOCAL_STORAGE_KEY] ? localStorage[LOCAL_STORAGE_KEY] : "light"
  );

  const handleDarkMode = (value: themeSelect) => {
    if (value === "dark") {
      if (document.documentElement.classList.contains("light")) {
        document.documentElement.classList.remove("light");
      }
      document.documentElement.classList.add("dark");
      localStorage.setItem(LOCAL_STORAGE_KEY, "dark");
      setTheme("dark");
    } else if (value === "light") {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
      }
      document.documentElement.classList.add("light");
      localStorage.setItem(LOCAL_STORAGE_KEY, "light");
      setTheme("light");
    } else {
      setTheme("light");
      alert("theme not exist");
    }
  };

  useEffect(() => {
    if (
      localStorage[LOCAL_STORAGE_KEY] === "dark" ||
      (!(LOCAL_STORAGE_KEY in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else if (
      localStorage[LOCAL_STORAGE_KEY] === "light" ||
      (!(LOCAL_STORAGE_KEY in localStorage) &&
        window.matchMedia("(prefers-color-scheme: light)").matches)
    ) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleDarkMode(theme === "dark" ? "light" : "dark");
      }}
    >
      {theme === "dark" ? <LuMoon /> : <LuSun />}
    </button>
  );
}
