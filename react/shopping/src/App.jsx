import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <nav className="flex justify-evenly fixed w-full">
        <Link to='/' draggable='false'>home</Link>
        <Link to='/shopping' draggable='false'>shopping</Link>
      </nav>
      <Outlet />
    </div>
  )
}
