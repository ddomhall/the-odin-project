import { useState } from 'react'

function App() {

  return (
    <>
      <form id="general" className="flex flex-col gap-6">
        <input placeholder="name"/>
        <input placeholder="email" type="email"/>
        <input placeholder="number" type="tel"/>
        <input type="submit" value="Submit"/>
      </form>
    </>
  )
}

export default App
