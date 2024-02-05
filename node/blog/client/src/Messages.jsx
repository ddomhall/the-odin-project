import {useEffect} from 'react'

export default function Message() {
  useEffect(() => {
    fetch('http://localhost:3000/messages').then(res => res.json()).then(res => console.log(res))
  })
  return (
  <div className='grid grid-cols-3'>
      <aside>
        aside
      </aside>
      <section className='col-span-2'>
        section
      </section>
  </div>
  )
}
