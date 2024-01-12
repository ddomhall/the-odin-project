import {useState} from 'react'

export default function Experience() {
  const [data, setData] = useState({company: '', position: '', responsibilities: '', from: '', to: '', edit: true})

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
        <div>Experience:</div>
        <form id="general" onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input name="company" placeholder="company" defaultValue={data.company} required/>
          <input name="position" placeholder="position" defaultValue={data.position} required/>
          <input name="responsibilities" placeholder="responsibilities" defaultValue={data.responsibilities} required/>
          <input name="from" placeholder="from" type="date" defaultValue={data.from} required/>
          <input name="to" placeholder="to" type="date" defaultValue={data.to} required/>
          <button className="cursor-pointer">Submit</button>
        </form>
      </section>
    )
  } else {
    return (
      <section>
        <div>Experience:</div>
        <div>company: {data.company}</div>
        <div>position: {data.position}</div>
        <div>responsibilities: {data.responsibilities}</div>
        <div>from: {data.from}</div>
        <div>to: {data.to}</div>
        <button onClick={edit}>Edit</button>
      </section>
    )
  }
}



