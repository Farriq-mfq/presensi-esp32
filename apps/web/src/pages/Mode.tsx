import events from "@presensi/events";
import { useQuery } from "react-query";
import Button from "../components/ui/Button";
import instance from "../utils/axios";
import socket from "../utils/io";
export type ModeType = "PRESENSI" | "REGISTER";
import { Helmet } from "react-helmet";
export default function Mode() {
  const handleChangeMode = async (mode: ModeType) => {
    socket.emit(events.WEB_MODE, mode);
  };

  socket.on(events.IOT_MODE, () => {
    refetch();
  });

  const getMode = async () => {
    const response = await instance.get("/mode");
    return response.data;
  };
  const { data, status, refetch } = useQuery("mode", getMode);

  return (
    <>
      <Helmet>
        <title>Mode</title>
      </Helmet>
      {status === "loading" ? (
        <div className="h-5 w-32 p-5 rounded-lg dark:bg-slate-700 bg-slate-300 animate-pulse"></div>
      ) : data.data === null ? (
        <div className="flex gap-3">
          <Button
            variant="default"
            onClick={() => {
              handleChangeMode("PRESENSI");
            }}
          >
            PRESENSI
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleChangeMode("REGISTER");
            }}
          >
            REGISTER
          </Button>
        </div>
      ) : (
        <>
          MODE SEKARANG :{" "}
          <Button
            variant={data.data.iot_mode === "PRESENSI" ? "default" : "primary"}
            onClick={() => {
              handleChangeMode(
                data.data.iot_mode === "PRESENSI" ? "REGISTER" : "PRESENSI"
              );
            }}
          >
            {data.data.iot_mode}
          </Button>
        </>
      )}
    </>
  );
}
