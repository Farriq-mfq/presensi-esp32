import { useState } from "react";
import socket from "../../utils/io";
import events from "@presensi/events";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Label from "../../components/ui/Label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrasiSchema } from "../../validations/users";
import * as z from "zod";
import { useMutation } from "react-query";
import { AxiosResponse } from "axios";
import instance from "../../utils/axios";
import { toast } from "react-hot-toast";
import { IoIosQrScanner } from "react-icons/io";
import { Helmet } from "react-helmet";
export default function AddUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof registrasiSchema>>({
    resolver: zodResolver(registrasiSchema),
  });
  const [rfid, setRfid] = useState<number | null>(null);
  socket.on(events.RFID_WEB_RESULT_REGISTER, (data) => {
    setRfid(data);
  });

  const addUserService = async (data: {
    name: string;
    username: string;
    rfid_token: string;
  }): Promise<AxiosResponse> => {
    return await instance.post("/users", data);
  };
  const { mutate, isLoading } = useMutation(addUserService, {
    onSuccess() {
      reset();
      setRfid(null);
      toast.success("Berhasil Registrasi");
    },
    onError() {
      toast.error("Terjadi kesalahan");
    },
  });

  const onsubmit = async (data: z.infer<typeof registrasiSchema>) => {
    await mutate({
      name: data.name,
      username: data.username,
      rfid_token: rfid!.toString(),
    });
  };

  return (
    <>
      <Helmet>
        <title>Add users</title>
      </Helmet>
      {rfid ? (
        <Card>
          <form method="post" onSubmit={handleSubmit(onsubmit)}>
            <p className="border-b pb-3 mb-3 font-bold">
              ID KARTU ATAU PIN MU : {rfid}
            </p>
            <div className="mb-3">
              <Label>Nama</Label>
              <Input
                type="text"
                disabled={isLoading}
                autoComplete="off"
                {...register("name")}
                placeholder="Masukan Nama"
                errors={errors.name ? errors.name.message : ""}
              />
            </div>
            <div className="mb-3">
              <Label>Username</Label>
              <Input
                type="text"
                disabled={isLoading}
                autoComplete="off"
                {...register("username")}
                placeholder="Masukan Username"
                errors={errors.username ? errors.username.message : ""}
              />
            </div>
            <Button loading={isLoading} type="submit">
              Registrasi
            </Button>
          </form>
        </Card>
      ) : (
        <Card className="h-80 uppercase border flex items-center justify-center flex-col">
          <IoIosQrScanner className="mb-3 h-24 w-24 animate-pulse" />
          <p className="font-semibold">Silahkan scan kartu atau pin mu</p>
        </Card>
      )}
    </>
  );
}
