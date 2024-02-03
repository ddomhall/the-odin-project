import {useState, useRef, useEffect} from 'react'

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
  const [guess, setGuess] = useState({x: 0, y: 0})
  const guessRef = useRef(null)

  useEffect(() => {
    fetch('http://localhost:3000/').then(res => res.json()).then(res => console.log(res))
  }, [])

  function placeGuess(e) {
    // setGuess({x: Math.round((e.pageX/e.target.width)*100), y: Math.round(((e.pageY-80)/e.target.height)*100)})
    guessRef.current.style.display = 'block'
    setGuess({x: e.pageX, y: e.pageY-80})
  }

  function cancelGuess() {
    guessRef.current.style.display = 'none'
  }

  function submitGuess(e) {
    console.log(e.target.textContent)
    cancelGuess()
  }

  return (
    <>
      <section className='grid grid-cols-2 grid-rows-1'>
        <div className='flex leading-10 justify-between'>
          Not found:
          {characters.filter(c => !c.found).map(c => <img src={c.name + '.png'} key={c.id} className='h-10 w-10'/>)}
        </div>
        <div className='flex leading-10 justify-between'>
          Found:
          {characters.filter(c => c.found).map(c => <img src={c.name + '.png'} key={c.id} className='h-10 w-10'/>)}
        </div>
      </section>
      <section className='relative'>
        <img src='opwaldo.png' onClick={placeGuess}/>
        {!!guess ?
          <div className='hidden' ref={guessRef}>
            <div className='absolute h-12 w-12 border-4 border-black pointer-events-none' style={{left: guess.x-24, top: guess.y-24}}></div>
            <div className='fixed top-0 bg-black w-full'>
              <p className='text-center h-10 leading-10'>who did you find?</p>
              <div className='flex'>
                {characters.filter(c => !c.found).map(c => {
                  return (
                    <div key={c.id} onClick={submitGuess} className='flex w-full leading-10'>
                      <img src={c.name + '.png'} className='h-10 w-10  pointer-events-none'/>
                      <p className='pointer-events-none w-full'>{c.name}</p>
                    </div>
                  )
                })}
                <button className='h-10 w-full' onClick={cancelGuess}>cancel</button>
              </div>
            </div>
          </div> : ''}
      </section>
    </>
  )
}
