import events from "@presensi/events";
import { AxiosError, AxiosResponse } from "axios";
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
      refetch();
      toast.success(data.data.message);
    },
    onError(e) {
      const error = e as AxiosError;
      if (error.response?.status === 400) {
        toast.error((error.response?.data as any).message);
      } else {
        toast.error("Terjadi kesalahan");
      }
    },
    onMutate() {
      setRfid(null);
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
      name: "Tanggal",
      selector: (row: any) => {
        const date = new Date(row.createdAt);
        return `${date.getFullYear()} / ${date.getMonth()} / ${date.getDate()}`;
      },
    },
  ];

  const handlePresences = async (): Promise<void> => {
    if (rfid != null) {
      await mutate({
        rfid_token: rfid!,
      });
    }
  };
  useEffect(() => {
    handlePresences();
  }, [rfid]);
  return (
    <div className="">
      <Card>
        <DataTable columns={columns} data={data?.data.data} pagination />
      </Card>
    </div>
  );
}
