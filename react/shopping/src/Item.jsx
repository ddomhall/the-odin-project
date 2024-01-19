import {useState} from 'react'

export default function Item({i, f}) {
  const [quantity, setQuantity] = useState(1)

  function handleClick(e) {
    f(e)
    setQuantity(1)
  }

  return (
    <div className='flex flex-col w-56 h-min' data-value={i.id}>
      <img data-testid='i-image' src={i.image} className='h-56'/>
      <div data-testid='i-title'>title: {i.title}</div>
      <div data-testid='i-desc'>description: {i.description}</div>
      <div data-testid='i-price'>price: {i.price}</div>
      <div className='flex' data-value={quantity}>
        <label htmlFor={'q' + i.id}>quantity: </label>
        <input id={'q' + i.id} className='w-full text-center' type='number' min='1' value={quantity} onChange={e => setQuantity(e.target.value)}/>
      </div>
      <button onClick={handleClick}>add to cart</button>
    </div>
  )
}
