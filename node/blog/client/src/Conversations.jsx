import {useState, useEffect, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'
import {Link, useParams} from 'react-router-dom'

export default function Message() {
  const [conversations, setConversations] = useState([])
  const {session} = useContext(SessionContext)

  useEffect(() => {
    fetch('http://localhost:3000/conversations', {
      credentials: 'include',
    }).then(res => res.json()).then(res => setConversations(res))
  }, [])

  return (
    <div className='grid grid-cols-3'>
      <aside>
        {conversations ? conversations.map(c => <Link to={'/conversations/' + c._id} key={c._id}>{c.users.map(u => u.username).join(', ')}</Link>) : ''}
      </aside>
      <section className='col-span-2'>
        section
      </section>
    </div>
  )
}
