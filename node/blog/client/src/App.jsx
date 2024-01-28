import {Outlet} from 'react-router-dom'

function App() {
  return (
    <>
      <nav className='flex w-full justify-between'>
        <a href='/'>logo</a>
        <form action='/search'>
          <input name='search' />
          <input type='submit' value='search' />
        </form>
        <a href='/profile'>profile</a>
      </nav>
      <main className='w-96 m-auto'>
      <Outlet />
      </main>
    </>
  )
}

export default App
