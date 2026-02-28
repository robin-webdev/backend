import { createBrowserRouter } from "react-router";
import Login from "./features/auth/Pages/Login.tsx";
import Loader from "./features/shared/components/Loader.tsx";
import Feed from "./features/posts/pages/Feed.tsx";
import Register from "./features/auth/Pages/Register.tsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
    loader: Loader,
  },

  {
    path: "/feed",
    Component: Feed,
    loader: Loader,
  },
  {
    path: "/register",
    Component: Register,
    loader: Loader,
  },
]);
