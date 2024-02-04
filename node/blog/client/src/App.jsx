import {Outlet} from 'react-router-dom'
import {useState, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'
import Cookies from 'js-cookie'

function App() {
  const [session, setSession] = useState(Cookies.get('session'))

  function logout() {
    Cookies.remove('session')
    window.location.reload()
  }

  async function searchUser(e) {
    e.preventDefault()
    const user = await fetch(`http://localhost:3000/search?username=${e.target.search.value}`).then(res => res.json())
    console.log(user)
    window.location.replace(`/users/${user._id}`)
  }

  return (
    <>
      <SessionContext.Provider value={{session, setSession}}>
        <nav className='flex w-full justify-between mb-6'>
          <a href='/'>logo</a>
          <form onSubmit={searchUser}>
            <input name='search' />
            <input type='submit' value='search' />
          </form>
          {session ? 
            <div>
              <a href='/message'>message</a>
              <a href='/create'>create</a>
              <a href={'/users/' + session }>profile</a>
              <button onClick={logout}>log out</button>
            </div> :
            <div>
              <a href='/signup'>sign up</a>
              <a href='/login'>log in</a>
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
