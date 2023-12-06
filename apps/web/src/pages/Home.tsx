import events from "@presensi/events";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { LuDisc2, LuList, LuUsers } from "react-icons/lu";
import { TbDeviceDesktopBolt } from "react-icons/tb";
import { useQuery } from "react-query";
import instance from "../utils/axios";
import cn from "../utils/cn";
import socket from "../utils/io";
export default function Home() {
  const [connect, setConnect] = useState<boolean>(false);
  socket.on(events.IOT_CONNECT_WEB, (payload) => {
    setConnect(payload);
  });

  const getMode = async () => {
    const response = await instance.get("/mode");
    return response.data;
  };

  const getInfoService = async (): Promise<AxiosResponse> => {
    return await instance.get("/info");
  };

  const { data: infoData, status: infoStatus } = useQuery(
    "info",
    getInfoService
  );

  const {
    data: dataMode,
    status: statueMode,
    refetch: refetchMode,
  } = useQuery("mode", getMode);
  socket.on(events.IOT_MODE, () => {
    refetchMode();
  });

  useEffect(() => {
    socket.emit("CALL_IOT_CONNECT", true);
  }, [connect, setConnect]);
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        <Info className="bg-orange-500 text-white flex gap-3 flex-col">
          <div className="flex items-center gap-2">
            <LuUsers className="h-7 w-7" />
            <span className="text-sm">Total users</span>
          </div>
          {infoStatus === "success" && (
            <h3 className="pl-1 text-lg font-semibold">
              {infoData.data.data.total_users}
            </h3>
          )}
        </Info>
        <Info className="bg-indigo-600 text-white flex gap-3 flex-col">
          <div className="flex items-center gap-2">
            <LuDisc2 className="h-7 w-7" />
            <span className="text-sm">Mode Sekarang</span>
          </div>
          {statueMode === "success" && (
            <h3 className="pl-1 text-lg font-semibold">
              {dataMode.data != null ? dataMode.data.iot_mode : ""}
            </h3>
          )}
        </Info>
        <Info className="bg-cyan-600 text-white flex gap-3 flex-col">
          <div className="flex items-center gap-2">
            <LuList className="h-7 w-7" />
            <span className="text-sm">Total Presensi</span>
          </div>
          {infoStatus === "success" && (
            <h3 className="pl-1 text-lg font-semibold">
              {infoData.data.data.total_presensi}
            </h3>
          )}
        </Info>
        <Info
          className={`${cn(
            connect ? `bg-green-500` : `bg-red-500`
          )} text-white flex gap-3 flex-col`}
        >
          <div className="flex items-center gap-2">
            <TbDeviceDesktopBolt className="h-7 w-7" />
            <span className="text-sm">Koneksi Perangkat</span>
          </div>
          <h3 className="pl-1 text-lg font-semibold">
            {connect ? "Active" : "Nonactive"}
          </h3>
        </Info>
      </div>
    </>
  );
}

const Info = (
  props: React.PropsWithChildren & React.HTMLAttributes<HTMLDivElement>
) => {
  return (
    <div
      {...props}
      className={`block rounded-lg px-4 py-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ${cn(
        props.className
      )}`}
    >
      {props.children}
    </div>
  );
};
