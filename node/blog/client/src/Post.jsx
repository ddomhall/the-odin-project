import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

export default function Profile() {
  const [post, setPost] = useState({_id: '', content: '', author: {username: ''}, date: ''})
  const {id}= useParams()


  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`).then(res => res.json()).then(res => setPost(res))
  },[])

  return(
    <>
      <section key={post._id}>
        <p>{post.content}</p>
        <a href={'/users/' + post.author._id}>
          <p>{post.author.username}</p>
        </a>
        <p>{post.date}</p>
      </section>
    </>
  )
}

