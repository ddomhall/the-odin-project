import {useParams} from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'
import Cookies from 'js-cookie'

export default function Profile() {
  const [edit, setEdit] = useState(false)
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const {id}= useParams()
  const {session} = useContext(SessionContext)


  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`).then(res => res.json()).then(res => setUser(res))
    fetch(`http://localhost:3000/users/${id}/posts`).then(res => res.json()).then(res => setPosts(res))
  },[])

  async function editUser(e) {
    e.preventDefault()
    fetch(`http://localhost:3000/users/${id}/update`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: e.target.elements.username.value,
      })
    }).then(window.location.reload())
  }

  async function deleteUser() {
    fetch(`http://localhost:3000/users/${id}/delete`, {method: 'DELETE'}).then(Cookies.remove('session')).then(document.location.replace('/'))
  }

  return(
    <>
      <div className='flex justify-between'>
        {edit ?
          <form onSubmit={editUser}><input name='username' placeholder='username' /><input type='submit' value='edit'/></form> :
          <h1>{user.username}</h1>
        }
        {session == id ?
          <div>
            {edit ?
              <button onClick={() => setEdit(false)}>cancel</button> : 
              <button onClick={() => setEdit(true)}>edit</button>
            }
            <button onClick={deleteUser}>delete</button>
          </div> :
          <button>follow</button>
        }
      </div>
      <div className='flex gap-6 flex-col mt-6'>
        {posts.map(p => {
          return (
            <a href={'/posts/' + p._id} key={p._id} className='w-full'>
              <section >
                <p>{p.content}</p>
                <p>{p.date}</p>
              </section>
            </a>
          )
        })}
      </div>
    </>
  )
}
