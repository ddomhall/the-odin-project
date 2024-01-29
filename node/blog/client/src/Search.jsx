import {useState, useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'

export default function Search() {
  const [users, setUsers] = useState([])
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch(`http://localhost:3000/users?search=${searchParams.get('search')}`).then(res => res.json()).then(res => setUsers(res))
  },[])

  return (
    <>
      {users == [] ? 'no users found' : users.map(u => <a href={'/users/' + u._id}><section>{u.username}</section></a>)}
    </>
  )
}
