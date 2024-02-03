import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import Home from './routes/Home.jsx'
import Leaderboard from './routes/Leaderboard.jsx'
import Play from './routes/Play.jsx'
import Root from './routes/Root.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />,
      },
      {
        path: 'play',
        element: <Play />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
