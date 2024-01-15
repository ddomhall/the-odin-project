import { Outlet, Link } from "react-router-dom";

export default function App() {

  return (
    <div className="grid grid-cols-5 h-screen">
      <div className="col-span-4">
        <Outlet />
      </div>
      <aside className="col-span-1 flex flex-col justify-between">
        <div>
        <h1>Cart</h1>
        <section>items</section>
        </div>
        <button>Check Out</button>
      </aside>
    </div>
  )
}
