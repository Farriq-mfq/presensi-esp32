import { RouterProvider } from "react-router-dom";
import router from "./router";
import socket from "./utils/io";

export default function App() {
  console.log(socket);
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}
