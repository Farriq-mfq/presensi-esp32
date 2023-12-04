import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="dark:bg-neutral-900 dark:text-white">
      <Sidebar />
      <main className="lg:ml-[250px] ml-0 min-h-screen p-4">
        <Header />
        {children}
      </main>
    </div>
  );
}
