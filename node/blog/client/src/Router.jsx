import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        // {index: true, element: <Feed />},
        // {path: 'search', element: <Search />},
      ]
    },
  ]);

  return <RouterProvider router={router} />;
};

