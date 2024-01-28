import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/users').then(res => res.json().then(res => setData(res)))
  },[])

  return (
    <>
      {data.map(u => <p>{u.username}</p>)}
    </>
  )
}

export default App
