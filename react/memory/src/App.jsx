import {useState, useEffect} from 'react'
import Card from './components/Card.jsx'

export default function App() {
  const [images, setImages] = useState([])
  const [scores, setScores] = useState({score: 0, best: 0})
  const [clicked, setClicked] = useState([])

  async function getImages() {
    const promises = []
    const newImages = []
    for (let i = 0; i < 10; i++) {
      promises.push(fetch('https://api.giphy.com/v1/gifs/random?api_key=39BVPnodKgEtMeqYkH4A65OWGayOHJGg&tag=&rating=g', {mode: 'cors'}))
    }


    const res = await Promise.all(promises)
    const data = await Promise.all(res.map(r => r.json()))
      .then(res => res.map(i => newImages.push({img: i.data.images.fixed_height.url, key: Math.random()})))
      .then(res => setImages(newImages))
  }

  useEffect(() => {
    getImages()
  }, [])

  useEffect(() => {
    setImages(images.sort((a, b) => 0.5 - Math.random()))
  }, [scores.score])

  const handleClick = (e) => {
    if (clicked.includes(e.target.src)) {
      setScores({score: 0, best: scores.score > scores.best ? scores.score : scores.best})
      setClicked([])
    } else {
      setScores({...scores, score: scores.score + 1})
      setClicked([...clicked, e.target.src])
    }
  }

  return (
    <>
      <p>{ scores.score == 10 ? 'you win' : 'score: ' + scores.score + ' | best: ' + scores.best}</p>
      <main className="flex gap-6 flex-wrap">
        {images.map(i => <Card key={i.key} i={i.img} f={handleClick}/>)}
      </main>
    </>
  )
}
