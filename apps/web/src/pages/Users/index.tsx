import { AxiosResponse } from "axios";
import DataTable from "react-data-table-component";
import { HiTrash } from "react-icons/hi2";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import instance from "../../utils/axios";
import toast from "react-hot-toast";

export default function Users() {
  const deleteUserService = async (data: {
    id: string;
  }): Promise<AxiosResponse> => {
    return await instance.delete(`/users/${data.id}`);
  };
  const getUserService = async (): Promise<AxiosResponse> => {
    return await instance.get("/users");
  };

  const { data, refetch } = useQuery("users", getUserService);
  const { mutate } = useMutation(deleteUserService, {
    onSuccess() {
      refetch();
      toast.success("Berhasil hapus user");
    },
    onError() {
      toast.error("Terjadi kesalahan");
    },
  });

  const columns = [
    {
      name: "Id Kartu atau Pin",
      selector: (row: any) => row.rfid_token,
    },
    {
      name: "Nama",
      selector: (row: any) => row.name,
    },
    {
      name: "Username",
      selector: (row: any) => row.username,
    },
    {
      name: "Actions",
      cell: (row: any) => {
        return (
          <Button
            onClick={async (e) => {
              e.preventDefault();
              if (confirm("Yakin ingin menghapus data ini ?")) {
                await mutate({ id: row.id });
              }
            }}
            variant="danger"
          >
            <HiTrash />
          </Button>
        );
      },
    },
  ];

  return (
    <div className="">
      <Card>
        <Link className="underline" to={"/users/add"}>
          Register
        </Link>
        <DataTable columns={columns} data={data?.data.data} pagination />
      </Card>
    </div>
  );
}
