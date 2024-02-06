import {useState, useEffect, useContext} from 'react'
import {SessionContext} from './SessionContext.jsx'
import {Link, useParams} from 'react-router-dom'

export default function Message() {
  const [conversations, setConversations] = useState([])
  const [user, setUser] = useState({})
  const {session} = useContext(SessionContext)

  useEffect(() => {
    async function getUserConversations() {
    await fetch('http://localhost:3000/conversations', {
      credentials: 'include',
    }).then(res => res.json()).then(res => {
        setConversations(res.map(c => c = {id: c._id, users: c.users.map(u => u.username).join(', ')}))
      })
    }
    getUserConversations()
  }, [])

  return (
    <div className='grid grid-cols-3'>
      <aside className='flex flex-col'>
        {conversations ? conversations.map(c => <Link to={'/conversations/' + c.id} key={c.id}>{c.users}</Link>) : ''}
      </aside>
      <section className='col-span-2'>
        section
      </section>
    </div>
  )
}
