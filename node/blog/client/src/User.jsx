import {useParams} from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'

export default function Profile() {
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const {id}= useParams()
  const {session} = useContext(SessionContext)


  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`).then(res => res.json()).then(res => setUser(res))
    fetch(`http://localhost:3000/users/${id}/posts`).then(res => res.json()).then(res => setPosts(res))
  },[])

  return(
    <>
      <div className='flex justify-between mb-6'>
        <h1>{user.username}</h1>
        {session == id ? "" : <button>follow</button>}
      </div>
      <div className='flex gap-6 flex-col'>
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
