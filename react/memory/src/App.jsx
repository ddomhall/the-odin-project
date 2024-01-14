import {useState, useEffect} from 'react'
import Card from './components/Card.jsx'
import sig from '/sig.png'
import btpfp from '/btpfp.jpg'
import track from '/track.png'

export default function App() {
  const [images, setImages] = useState([{img: sig, key: 0}, {img: btpfp, key: 1}, {img: track, key: 2}])
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
      <p>{ scores.score == 3 ? 'you win' : 'score: ' + scores.score + ' | best: ' + scores.best}</p>
      <main className="flex gap-6 flex-wrap">
        {images.map(i => <Card key={i.key} i={i.img} f={handleClick}/>)}
      </main>
    </>
  )
}
