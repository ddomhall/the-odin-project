import { useState } from 'react'

function App() {
  const [data, setData] = useState({name: '', email: '', number: ''})

  const handleSubmit = (e) => {
    e.preventDefault()
    const obj = {}
    const formData = new FormData(e.currentTarget)
    for (let [key, value] of formData.entries()) {
      obj[key] = value
    }
    setData(obj)
    e.currentTarget.reset()
  }

  return (
    <>
      {data.name != '' ? <section><div>name: {data.name}</div><div>email: {data.email}</div><div>number: {data.number}</div><button>Edit</button></section> : 
      <form id="general" onSubmit={handleSubmit}>
        <input name="name" placeholder="name" required/>
        <input name="email" placeholder="email" type="email" required/>
        <input name="number" placeholder="number" type="tel" required/>
        <button>Submit</button>
      </form>
      }
    </>
  )
}

export default App
