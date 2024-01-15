import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="h-screen">
      <nav className="flex justify-evenly">
        <Link to='/' draggable='false'>Home</Link>
        <Link to='/shopping' draggable='false'>Shopping</Link>
      </nav>
      <Outlet />
    </div>
  )
}
