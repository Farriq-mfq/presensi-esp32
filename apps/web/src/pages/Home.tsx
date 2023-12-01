import { useEffect, useState } from "react";
import socket from "../utils/io";
import cn from "../utils/cn";

export default function Home() {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    socket.emit("TEST", 0);
  };

  useEffect(() => {
    socket.on("STATE_LAMBU_WEB", (bool) => {
      setToggle(Boolean(parseInt(bool)));
    });
  }, []);
  return (
    // <div className="grid grid-cols-1 lg:grid-cols-4">
    //   <div className="bg-white shadow-xl p-5">Lorem</div>
    // </div>
    <>
      <p>HOE PAGE</p>
      <button
        className={` px-4 py-2 rounded-xl text-white ${cn(
          toggle ? "bg-indigo-500" : "bg-red-500"
        )}`}
        onClick={handleClick}
      >
        {toggle ? "Nyalakan" : "Matikan"}
      </button>
    </>
  );
}
