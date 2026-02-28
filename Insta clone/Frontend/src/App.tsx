import { RouterProvider } from "react-router";
import { router } from "./router.tsx";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <div className="h-screen ">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
