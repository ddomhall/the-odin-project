import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import Shopping from './Shopping'
import Home from './Home'

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {index: true, element: <Home />},
        {path: 'shopping', element: <Shopping />},
      ]
    },
  ]);

  return <RouterProvider router={router} />;
};
