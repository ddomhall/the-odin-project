import { useState } from 'react'
import General from './components/General.jsx'
import Education from './components/Education.jsx'
import Experience from './components/Experience.jsx'

function App() {
  const edit = () => {
    setData({...data, edit: true})
  }

  return (
    <>
      <General edit={edit}/>
      <Education edit={edit}/>
      <Experience edit={edit}/>
    </>
  )
}

export default App
