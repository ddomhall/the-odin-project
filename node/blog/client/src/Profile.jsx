import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

export default function Profile() {
  const [user, setUser] = useState({})
  const {id}= useParams()


  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`).then(res => res.json()).then(res => setUser(res))
  },[])

  return <><div>{user.username}</div><button>follow</button></>
}
