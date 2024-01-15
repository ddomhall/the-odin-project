import { Outlet, Link } from "react-router-dom";

export default function App() {

  return (
    <>
      <div>app</div>
      <Link to='/'>Home</Link>
      <hr/>
      <Link to='/shopping'>Shopping</Link>
      <hr/>
      <Outlet />
    </>
  )
}
