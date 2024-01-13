import { useState } from 'react'
import Card from './components/Card.jsx'

export default function App() {
  const titles = [1, 2, 3]
  return (
    <>
      Hello world
      {titles.map(t => <Card title={t}/>)}
    </>
  )
}
