import {Outlet, useLocation} from 'react-router-dom'
import {useState, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'
import Cookies from 'js-cookie'

function App() {
  const location = useLocation()
  const [session, setSession] = useState(Cookies.get('session'))

  return (
    <>
      <SessionContext.Provider value={{session, setSession}}>
        <nav className='flex w-full justify-between mb-6'>
          <a href='/'>logo</a>
          <form action='/search'>
            <input name='search' />
            <input type='submit' value='search' />
          </form>
          {session ? <a href={'/users/' + session }>profile</a> : location.pathname == '/login' ? <a href='/signup'>sign up</a> : <a href='/login'>log in</a>}
        </nav>
        <main className='w-96 m-auto'>
          <Outlet />
        </main>
      </SessionContext.Provider>
    </>
  )
}

export default App
