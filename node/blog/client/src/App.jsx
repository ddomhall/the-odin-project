import {Outlet, useLocation} from 'react-router-dom'

function App() {
  const location = useLocation()
  const session = false

  return (
    <>
      <nav className='flex w-full justify-between mb-6'>
        <a href='/'>logo</a>
        <form action='/search'>
          <input name='search' />
          <input type='submit' value='search' />
        </form>
        {session ? <a href='/profile'>profile</a> : location.pathname == '/login' ? <a href='/signup'>sign up</a> : <a href='/login'>log in</a>}
      </nav>
      <main className='w-96 m-auto'>
      <Outlet />
      </main>
    </>
  )
}

export default App
