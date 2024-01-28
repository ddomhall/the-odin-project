import {useState, useEffect} from 'react'

export default function Feed() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/posts').then(res => res.json()).then(res => setPosts(res))
  }, [])

  return (
    <>
      {posts.map(p => {
        return(
          <section key={p._id}>
            <p>{p.content}</p>
            <p>{p.author.username}</p>
            <p>{p.date}</p>
          </section>
        )
      })}
    </>
  )
}
