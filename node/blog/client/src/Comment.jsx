import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

export default function Comment() {
  const [comment, setComment] = useState({content: '', author: {username: ''}, date: ''})
  const {id} = useParams()

  useEffect(() => {
    fetch(`http://localhost:3000/comments/${id}`).then(res => res.json()).then(res => setComment(res))
  })

  return (
    <>
      <section>
        <p>{comment.content}</p>
        <a href={'/users/' + comment.author._id}>{comment.author.username}</a>
        <p>{comment.date}</p>
      </section>
    </>
  )
}
