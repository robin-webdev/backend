import { router } from "./routes.jsx";
import { RouterProvider } from "react-router-dom";
import "./index.scss";
import { register } from "./features/auth/services/auth.api.js";

const App = () => {
  register("Robin", "tedfst", "tefdst@test.com", "test");
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
  