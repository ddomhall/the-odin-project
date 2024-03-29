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
      found: true
    },
    {
      id: 2,
      name: 'nami',
      found: true
    },
    {
      id: 3,
      name: 'sanji',
      found: true
    },
    {
      id: 4,
      name: 'usopp',
      found: true
    },
    {
      id: 5,
      name: 'robin',
      found: true
    },
    {
      id: 6,
      name: 'chopper',
      found: true
    },
    {
      id: 7,
      name: 'franky',
      found: true
    },
    {
      id: 8,
      name: 'brook',
      found: true
    },
  ])
  const [guess, setGuess] = useState({x: 0, y: 0})
  const [guessResult, setGuessResult] = useState()
  const guessRef = useRef(null)
  const headerRef = useRef(null)
  const imageRef = useRef(null)
  const resultRef = useRef(null)
  const winRef = useRef(null)

  useEffect(() => {
    fetch('http://localhost:3000/start', {method: 'POST'})
  },[])

  function placeGuess(e) {
    guessRef.current.style.display = 'block'

    let x
    let y

    if (e.pageX < 20) {
      x = 20
    } else if (e.pageX > imageRef.current.clientWidth - 20) {
      x = imageRef.current.clientWidth - 20
    } else {
      x = e.pageX
    }

    if (e.pageY < 20 + 40 + headerRef.current.clientHeight) {
      y = 20 + 40 + headerRef.current.clientHeight
    } else if (e.pageY > 40 + headerRef.current.clientHeight + imageRef.current.clientHeight - 20) {
      y = 40 + headerRef.current.clientHeight + imageRef.current.clientHeight - 20
    } else {
      y = e.pageY
    }

    setGuess({x, y: y-40-headerRef.current.clientHeight})
  }

  function cancelGuess() {
    guessRef.current.style.display = 'none'
  }

  async function submitGuess(e) {
    const name = e.target.textContent
    const result = await fetch(`http://localhost:3000/guess?name=${name}&x=${Math.round(guess.x / (imageRef.current.clientWidth)*100)}&y=${Math.round(guess.y / (imageRef.current.clientHeight)*100)}`).then(res => res.json())

    if (result == '1') {
      setCharacters(characters.map(c => c.name == name ? {name: name, found: true} : c))
      setGuessResult('correct')

      if (characters.filter(c => c.found).length == 8) {
        fetch('http://localhost:3000/stop', {method: 'POST'})
        winRef.current.showModal()
      } else {
        resultRef.current.showModal()
      }
    } else {
      setGuessResult('wrong')
      resultRef.current.showModal()
    }

    cancelGuess()
  }

  function submitResult(e) {
    e.preventDefault()
    fetch(`http://localhost:3000/submit?name=${e.target.elements.name.value}`, {method: 'POST'})
    winRef.current.close()
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
          {characters.filter(c => c.found).map(c => <img src={c.name + '.png'} key={c.id * 10} className='h-10 w-10'/>)}
        </div>
      </section>
      <section className='relative'>
        <img src='opwaldo.png' onClick={placeGuess} ref={imageRef}/>
        {!!guess ?
          <div className='hidden' ref={guessRef}>
            <div className='absolute h-10 w-10 border-4 border-black pointer-events-none' style={{left: guess.x-20, top: guess.y-20}}></div>
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
        <dialog className='w-40 text-center' ref={resultRef}>
          <p className='h-10 leading-10'>{guessResult}</p>
          <button className='h-10 w-full' onClick={() => resultRef.close()}>close</button>
        </dialog>
        <dialog className='w-40 text-center' ref={winRef}>
          <p className='h-10 leading-10'>you win</p>
          <p className='h-10 leading-10'>submit score?</p>
          <form onSubmit={submitResult}>
            <input name='name' placeholder='name' className='h-10 leading-10 w-full'/>
            <input type='submit' className='h-10 w-full'/>
          </form>
        </dialog>
      </section>
    </>
  )
}
