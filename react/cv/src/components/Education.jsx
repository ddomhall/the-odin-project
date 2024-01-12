import {useState} from 'react'

export default function Education() {
  const [data, setData] = useState({school: '', subject: '', date: '', edit: true})

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
        <div>Education:</div>
        <form id="general" onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input name="school" placeholder="school" defaultValue={data.school} required/>
          <input name="subject" placeholder="subject" defaultValue={data.subject} required/>
          <input name="date" placeholder="date" type="date" defaultValue={data.date} required/>
          <button className="cursor-pointer">Submit</button>
        </form>
      </section>
    )
  } else {
    return (
      <section>
        <div>Education:</div>
        <div>school: {data.school}</div>
        <div>subject: {data.subject}</div>
        <div>date: {data.date}</div>
        <button onClick={edit}>Edit</button>
      </section>
    )
  }
}


