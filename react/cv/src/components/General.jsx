import {useState} from 'react'

export default function General() {
  const [data, setData] = useState({name: '', email: '', number: '', edit: true})

  const handleSubmit = (e) => {
    e.preventDefault()
    const obj = {edit: false}
    const formData = new FormData(e.currentTarget)
    for (let [key, value] of formData.entries()) {
      obj[key] = value
    }
    setData(obj)
    e.currentTarget.reset()
  }

  const edit = () => {
    setData({...data, edit: true})
  }

  if (data.edit) {
    return (
      <section>
        <div>General:</div>
        <form id="general" onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input name="name" placeholder="name" defaultValue={data.name} required/>
          <input name="email" placeholder="email" type="email" defaultValue={data.email} required/>
          <input name="number" placeholder="number" type="tel" defaultValue={data.number} required/>
          <button className="cursor-pointer">Submit</button>
        </form>
      </section>
    )
  } else {
    return (
      <section>
        <div>General:</div>
        <div>name: {data.name}</div>
        <div>email: {data.email}</div>
        <div>number: {data.number}</div>
        <button onClick={edit}>Edit</button>
      </section>
    )
  }
}
