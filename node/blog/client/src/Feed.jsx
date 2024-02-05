import {useState, useEffect, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'
import {Link} from 'react-router-dom'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const {session} = useContext(SessionContext)

  useEffect(() => {
    if (session) fetch(`http://localhost:3000/posts?id=${session}`).then(res => res.json()).then(res => setPosts(res))
  }, [])

  return (
    <div className='flex flex-col gap-6 w-96 m-auto'>
      {posts.map(p => {
        return(
          <section key={p._id}>
            <Link to={'/posts/' + p._id}>
              <p>{p.content}</p>
            </Link>
            <Link to={'/users/' + p.author._id}>
              <p>{p.author.username}</p>
            </Link>
            <p>{p.date}</p>
          </section>
        )
      })}
    </div>
  )
}
