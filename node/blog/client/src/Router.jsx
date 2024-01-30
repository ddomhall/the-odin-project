import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import Feed from './Feed.jsx'
import Search from './Search.jsx'
import User from './User.jsx'
import Post from './Post.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import Create from './Create.jsx'

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Feed />
        },
        {
          path: 'search',
          element: <Search />
        },
        {
          path: 'users/:id',
          element: <User />
        },
        {
          path: 'posts/:id',
          element: <Post />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'signup',
          element: <Signup />
        },
        {
          path: 'create',
          element: <Create />
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />;
};

