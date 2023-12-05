import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Card from "../../components/ui/Card";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import instance from "../../utils/axios";

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
];

const getUserService = async (): Promise<AxiosResponse> => {
  return await instance.get("/users");
};

export default function Users() {
  const { data } = useQuery("users", getUserService);
  console.log(data?.data.data)
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
