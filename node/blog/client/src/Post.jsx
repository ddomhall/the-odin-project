import {useParams} from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'

export default function Profile() {
  const {session} = useContext(SessionContext)
  const [post, setPost] = useState({_id: '', content: '', author: {username: ''}, date: ''})
  const [comments, setComments] = useState([])
  const [edit, setEdit] = useState(false)
  const {id}= useParams()

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`).then(res => res.json()).then(res => setPost(res))
    fetch(`http://localhost:3000/posts/${id}/comments/`).then(res => res.json()).then(res => setComments(res))
  },[])

  async function commentApi(e) {
    e.preventDefault()
    fetch(`http://localhost:3000/posts/${id}/comments/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: e.target.elements.content.value,
        author: session,
      })
    }).then(window.location.reload())
  }

  async function editPost(e) {
    e.preventDefault()
    fetch(`http://localhost:3000/posts/${id}/update`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: e.target.elements.content.value,
      })
    }).then(window.location.reload())
  }

  async function deletePost() {
    console.log(0)
  }

  return(
    <>
      {!edit ?
        <section>
          <p>{post.content}</p>
          <a href={'/users/' + post.author._id}>
            <p>{post.author.username}</p>
          </a>
          <p>{post.date}</p>
        </section> :
        <form onSubmit={editPost} className='flex flex-col'>
          <input name='content' placeholder='content' />
          <input type='submit' value='edit' />
        </form>
      }
      {session == post.author._id ?
        <div className='flex justify-between'>
          {edit ?
            <button onClick={() => setEdit(false)}>cancel</button> :
            <button onClick={() => setEdit(true)}>edit</button>
          }
          <button onClick={deletePost}>delete</button>
        </div> : ''
      }
      <form onSubmit={commentApi} className='flex flex-col'>
        <input name='content' placeholder='content' />
        <input type='submit' value='comment' />
      </form>
      <section className='flex flex-col gap-6'>
        {comments.map(c => {
          return (
            <div key={c._id} className='flex flex-col'>
              <a href={'/comments/' + c._id}>{c.content}</a>
              <a href={'/users/' + c.author._id}>{c.author.username}</a>
              <p>{c.date}</p>
            </div>
          )
        })}
      </section>
    </>
  )
}

