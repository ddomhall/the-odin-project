import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="h-screen">
      <nav className="flex justify-evenly">
        <Link to='/' draggable='false'>home</Link>
        <Link to='/shopping' draggable='false'>shopping</Link>
      </nav>
      <Outlet />
    </div>
  )
}
