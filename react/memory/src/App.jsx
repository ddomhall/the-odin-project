import {useState, useEffect} from 'react'
import Card from './components/Card.jsx'
import sig from '../public/sig.png'
import btpfp from '../public/btpfp.jpg'
import track from '../public/track.png'

export default function App() {
  const [images, setImages] = useState([{img: sig, id: 0}, {img: btpfp, id: 1}, {img: track, id: 2}])
  const [scores, setScores] = useState({score: 0, best: 0})
  const [clicked, setClicked] = useState([])

  // useEffect(() => {
  //   const data = fetch('https://api.giphy.com/v1/gifs/random?api_key=qdBh39Uw5FuONO8Xa5MuCBVH5btTBH6z&tag=&rating=g', {mode: 'cors'})
  //   .then(function(response) {
  //     return response.json();
  //   })
  //   .then(function(response) {
  //     setImages([...images, response.data.images.fixed_height.url])
  //   });
  // }, [])
  //
  const handleClick = (e) => {
    console.log(e)
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
      <p>score: {scores.score}</p>
      <p>best: {scores.best}</p>
      <main className="flex gap-6 flex-wrap">
        {images.map(i => <Card key={i.id} i={i.img} f={handleClick}/>)}
      </main>
    </>
  )
}
