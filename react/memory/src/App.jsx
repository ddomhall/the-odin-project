import {useState, useEffect} from 'react'
import Card from './components/Card.jsx'

export default function App() {
  const [images, setImages] = useState([])
  const [scores, setScores] = useState({score: 0, best: 0})

  useEffect(() => {
    const data = fetch('https://api.giphy.com/v1/gifs/random?api_key=qdBh39Uw5FuONO8Xa5MuCBVH5btTBH6z&tag=&rating=g', {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      setImages([...images, response.data.images.fixed_height.url])
    });
  }, [])

  const handleClick = (e) => {
    setScores({...scores, score: scores.score + 1})
  }

  return (
    <>
      <p>score: {scores.score}</p>
      <p>best: {scores.best}</p>
      <main className="flex gap-6 flex-wrap">
        {images.map(i => <Card key={i} i={i} f={handleClick}/>)}
      </main>
    </>
  )
}
