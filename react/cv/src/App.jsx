import { useState } from 'react'

function App() {
  const [data, setData] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const obj = {}
    const formData = new FormData(e.currentTarget)
    for (let [key, value] of formData.entries()) {
      obj[key] = value
    }
    setData([...data, obj])
    e.currentTarget.reset()
  }

  return (
    <>
      <form id="general" onSubmit={handleSubmit}>
        <input name="name" placeholder="name" required/>
        <input name="email" placeholder="email" type="email" required/>
        <input name="number" placeholder="number" type="tel" required/>
        <input type="submit" value="Submit"/>
      </form>
    </>
  )
}

export default App
