import {useState} from 'react'
import Card from './components/Card.jsx'

export default function App() {
  const [scores, setScores] = useState({score: 0, best: 0})
  const titles = [1, 2, 3]

  const handleClick = (e) => {
    setScores({...scores, score: scores.score + 1})
  }

  return (
    <>
      <p>score: {scores.score}</p>
      <p>best: {scores.best}</p>
      <main className="flex gap-6">
      {titles.map(t => <Card key={t} title={t} f={handleClick}/>)}
      </main>
    </>
  )
}
