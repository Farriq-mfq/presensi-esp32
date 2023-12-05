import events from "@presensi/events";
import { AxiosResponse } from "axios";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import Card from "../../components/ui/Card";
import instance from "../../utils/axios";
import socket from "../../utils/io";
import { useEffect, useState } from "react";
export default function Users() {
  const [rfid, setRfid] = useState<string | null>(null);
  const addPresences = async (data: {
    rfid_token: string;
  }): Promise<AxiosResponse> => {
    return await instance.post(`/presences`, data);
  };
  const getPresencesService = async (): Promise<AxiosResponse> => {
    return await instance.get("/presences");
  };

  socket.on(events.RFID_WEB_RESULT_PRESENSI, async (payload) => {
    setRfid(payload.toString());
  });

  const { data, refetch } = useQuery("presensi", getPresencesService);
  const { mutate } = useMutation(addPresences, {
    onSuccess(data) {
      console.log(data.data);
      refetch();
      toast.success("Berhasil presensi");
    },
    onError() {
      toast.error("Terjadi kesalahan");
    },
  });

  const columns = [
    {
      name: "Nama",
      selector: (row: any) => row.user.name,
    },
    {
      name: "Username",
      selector: (row: any) => row.user.username,
    },
    {
      name: "Waktu dan Tanggal",
      selector: (row: any) => row.createdAt,
    },
  ];

  useEffect(() => {
    if (rfid != null) {
      mutate({
        rfid_token: rfid!,
      });
    }
  }, [rfid]);
  return (
    <div className="">
      <Card>
        <DataTable columns={columns} data={data?.data.data} pagination />
      </Card>
    </div>
  );
}
