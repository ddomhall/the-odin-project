import {useState, useEffect} from 'react'

export default function Feed() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/posts').then(res => res.json()).then(res => setPosts(res))
  }, [])

  return (
    <div className='flex flex-col gap-6'>
      {posts.map(p => {
        return(
          <section key={p._id}>
            <a href={'/posts/' + p._id}>
              <p>{p.content}</p>
            </a>
            <a href={'/users/' + p.author._id}>
              <p>{p.author.username}</p>
            </a>
            <p>{p.date}</p>
          </section>
        )
      })}
    </div>
  )
}
