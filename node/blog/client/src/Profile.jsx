import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

export default function Profile() {
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const {id}= useParams()


  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`).then(res => res.json()).then(res => setUser(res))
    fetch(`http://localhost:3000/users/${id}/posts`).then(res => res.json()).then(res => setPosts(res))
  },[])

  return(
    <>
      <div className='flex justify-between'>
        <h1>{user.username}</h1>
        <button>follow</button>
      </div>
      {posts.map(p => {
        return (
          <section key={p._id}>
            <p>{p.content}</p>
            <p>{p.date}</p>
          </section>
        )
      })}
    </>
  )
}
