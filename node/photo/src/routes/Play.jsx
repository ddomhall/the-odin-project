import {useState} from 'react'

export default function Play() {
  const [characters, setCharacters] = useState([
    {
      id: 0,
      name: 'luffy',
      found: false
    },
    {
      id: 1,
      name: 'zoro',
      found: false
    },
    {
      id: 2,
      name: 'nami',
      found: false
    },
    {
      id: 3,
      name: 'sanji',
      found: false
    },
    {
      id: 4,
      name: 'usopp',
      found: false
    },
    {
      id: 5,
      name: 'robin',
      found: false
    },
    {
      id: 6,
      name: 'chopper',
      found: false
    },
    {
      id: 7,
      name: 'franky',
      found: false
    },
    {
      id: 8,
      name: 'brook',
      found: false
    },
  ])
  const [guess, setGuess] = useState({})
  const x = 120

  function logXY(e) {
    // setGuess({x: Math.round((e.pageX/e.target.width)*100), y: Math.round(((e.pageY-80)/e.target.height)*100)})
    setGuess({x: e.pageX, y: e.pageY-80})
  }

  return (
    <>
      <section className='grid grid-cols-2 grid-rows-1'>
        <div className='flex leading-10'>
          Not found:
          {characters.filter(c => !c.found).map(c => <img src={c.name + '.png'} key={c.id} className='h-10 w-10'/>)}
        </div>
        <div className='flex'>
          Found:
          {characters.filter(c => c.found).map(c => <img src={c.name + '.png'} key={c.id} className='h-10 w-10'/>)}
        </div>
      </section>
      <section className='relative'>
      <img src='opwaldo.png' onClick={logXY}/>
      {!!guess ? <div className='absolute h-12 w-12 border-4 border-black' style={{left: guess.x-24, top: guess.y-24}}></div> : ''}
      </section>
    </>
  )
}
