import {useState, useEffect} from 'react'

export default function Leaderboard() {
  const [timings, setTimings] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/timings').then(res => res.json()).then(res => setTimings(res))
  },[])

  return (
    <div className='w-96 m-auto'>
      {timings.map((t, i) => {
        return (
          <section className='flex justify-between' key={i}>
            <p>name: {t.name}</p>
            <p>time: {t.time}s</p>
          </section>
        )
      })}
    </div>
  )
}
