import {Outlet, Link} from 'react-router-dom'
import {useState, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'
import Cookies from 'js-cookie'

function App() {
  const [session, setSession] = useState(Cookies.get('session'))

  function logout() {
    fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include',
    })
    window.location.replace('/')
  }

  async function searchUser(e) {
    e.preventDefault()
    const user = await fetch(`http://localhost:3000/search?username=${e.target.search.value}`).then(res => res.json())
    if (user) {
      window.location.replace(`/users/${user._id}`)
    }
  }

  return (
    <>
      <SessionContext.Provider value={{session, setSession}}>
        <nav className='flex w-full justify-between mb-6'>
          <Link to={'/'}>logo</Link>
          <form onSubmit={searchUser}>
            <input name='search' />
            <input type='submit' value='search' />
          </form>
          {session ? 
            <div>
              <Link to={'/message'}>message</Link>
              <Link to={'/create'}>create</Link>
              <Link to={'/users/' + session }>profile</Link>
              <button onClick={logout}>log out</button>
            </div> :
            <div>
              <Link to={'/signup'}>sign up</Link>
              <Link to={'/login'}>log in</Link>
            </div>
          }
        </nav>
        <main>
          <Outlet />
        </main>
      </SessionContext.Provider>
    </>
  )
}

export default App
