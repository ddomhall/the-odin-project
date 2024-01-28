import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import Feed from './Feed.jsx'
import Search from './Search.jsx'
import Profile from './Profile.jsx'


export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Feed />},
        {
          path: 'search',
          element: <Search />},
        {
          path: 'users/:id',
          element: <Profile />,
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />;
};

