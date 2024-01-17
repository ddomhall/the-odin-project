import {useState} from 'react'

export default function Item({i, f}) {
  const [quantity, setQuantity] = useState(1)

  function handleClick(e) {
    f(e)
    setQuantity(1)
  }

  return (
    <div className='flex flex-col w-56 h-min' data-value={i.id}>
      <img src={i.image} className='h-56'/>
      <div>title: {i.title}</div>
      <div>description: {i.description}</div>
      <div>price: {i.price}</div>
      <div className='flex' data-value={quantity}>
        <label htmlFor={'q' + i.id}>quantity: </label>
        <input id={'q' + i.id} className='w-full text-center' type='number' min='1' value={quantity} onChange={e => setQuantity(e.target.value)}/>
      </div>
      <button onClick={handleClick}>add to cart</button>
    </div>
  )
}
