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
  const headerRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    // fetch('http://localhost:3000/').then(res => res.json()).then(res => console.log(res))
  }, [])

  function placeGuess(e) {
    // setGuess({x: Math.round((e.pageX/e.target.width)*100), y: Math.round(((e.pageY-80)/e.target.height)*100)})
    guessRef.current.style.display = 'block'
    let x
    let y
    if (e.pageX < 24) {
      x = 24
    } else if (e.pageX > imageRef.current.clientWidth - 24) {
      x = imageRef.current.clientWidth - 24
    } else {
      x = e.pageX
    }

    if (e.pageY < 24 + 40 + headerRef.current.clientHeight) {
      y = 24 + 40 + headerRef.current.clientHeight
    } else if (e.pageY > 40 + headerRef.current.clientHeight + imageRef.current.clientHeight - 24) {
      y = 40 + headerRef.current.clientHeight + imageRef.current.clientHeight - 24
    } else {
      y = e.pageY
    }

    setGuess({x, y: y-40-headerRef.current.clientHeight})
    console.log(guess)
  }

  function cancelGuess() {
    guessRef.current.style.display = 'none'
  }

  async function submitGuess(e) {
    // console.log(e.target.textContent)
    const x = Math.round(guess.x / (imageRef.current.clientWidth)*100)
    const y = Math.round(guess.y / (imageRef.current.clientHeight)*100)
    console.log(x, y)
    cancelGuess()
  }

  return (
    <>
      <section className='grid grid-cols-2 grid-rows-1' ref={headerRef}>
        <div className='flex leading-10 justify-between flex-wrap'>
          Not found:
          {characters.filter(c => !c.found).map(c => <img src={c.name + '.png'} key={c.id} className='h-10 w-10'/>)}
        </div>
        <div className='flex leading-10 justify-between flex-wrap'>
          Found:
          {characters.filter(c => c.found).map(c => <img src={c.name + '.png'} key={c.id} className='h-10 w-10'/>)}
        </div>
      </section>
      <section className='relative'>
        <img src='opwaldo.png' onClick={placeGuess} ref={imageRef}/>
        {!!guess ?
          <div className='hidden' ref={guessRef}>
            <div className='absolute h-12 w-12 border-4 border-black pointer-events-none' style={{left: guess.x-24, top: guess.y-24}}></div>
            <div className='fixed top-0 bg-black w-screen'>
              <p className='text-center h-10 leading-10'>who did you find?</p>
              <div className='flex flex-wrap justify-between'>
                {characters.filter(c => !c.found).map(c => {
                  return (
                    <div key={c.id} onClick={submitGuess} className='flex leading-10'>
                      <img src={c.name + '.png'} className='h-10 w-10 pointer-events-none'/>
                      <p className='pointer-events-none w-20'>{c.name}</p>
                    </div>
                  )
                })}
                <button className='h-10 w-20' onClick={cancelGuess}>cancel</button>
              </div>
            </div>
          </div> : ''}
      </section>
    </>
  )
}
