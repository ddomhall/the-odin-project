import {useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'

export default function create() {
  const {session} = useContext(SessionContext)

  async function postApi(e) {
    e.preventDefault()
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: e.target.elements.content.value,
        author: session,
      })
    }).then(res => res.json()).then(res => {
        if (res.status == 200) {
          console.log(0, res)
        } else {
          console.log(1, res)
        }
      })
  }


  return (
    <form onSubmit={postApi} className='flex flex-col'>
      <input name='content' placeholder='content' />
      <input type='submit' value='post' />
    </form>
  )
}
