import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { UiContextProvider } from "./contexts/UiContext";
import router from "./router";
export default function App() {
  const queryClient = new QueryClient();
  return (
    <UiContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          fallbackElement={<p>Initial Load...</p>}
        />
        <Toaster />
      </QueryClientProvider>
    </UiContextProvider>
  );
}
