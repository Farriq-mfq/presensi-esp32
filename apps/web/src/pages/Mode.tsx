import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import instance from "../utils/axios";
import socket from "../utils/io";
export type ModeType = "PRESENSI" | "REGISTER";
import events from "@presensi/events";
export default function Mode() {
  const [mode, setMode] = useState<ModeType | null>(null);
  const [loading, setLoading] = useState(false);
  const handleChangeMode = async (mode: ModeType) => {
    socket.emit(events.WEB_MODE, mode);
    getMode();
  };

  const getMode = async () => {
    setLoading(true);
    instance
      .get("/mode")
      .then((response) => {
        const data = response.data.data;
        setMode(data != null ? data.iot_mode : null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getMode();
  }, []);
  return (
    <>
      {loading ? (
        <>Loaind</>
      ) : mode === null ? (
        <>
          <Button
            onClick={() => {
              handleChangeMode("PRESENSI");
            }}
          >
            PRESENSI
          </Button>
          <Button
            onClick={() => {
              handleChangeMode("REGISTER");
            }}
          >
            REGISTER
          </Button>
        </>
      ) : (
        <>
          MODE SEKARANG :{" "}
          <Button
            variant={mode === 'PRESENSI' ? "secondary" : "primary"}
            onClick={() => {
              handleChangeMode(mode === "PRESENSI" ? "REGISTER" : "PRESENSI");
            }}
          >
            {mode}
          </Button>
        </>
      )}
    </>
  );
}
