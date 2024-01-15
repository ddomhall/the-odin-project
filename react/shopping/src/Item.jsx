import {useState} from 'react'

export default function Item({i, f}) {
  const [quantity, setQuantity] = useState(1)

  function addQuantity() {
    setQuantity(q => q + 1)
  }

  function subQuantity() {
    if (quantity != 1) setQuantity(q => q - 1)
  }

  return (
    <div className='flex flex-col w-32 h-32' data-value={i.id}>
      <div>name: {i.name}</div>
      <div>price: {i.price}</div>
      <div className='flex justify-evenly' data-value={quantity}>
        <button className='w-full' onClick={subQuantity}>-</button>
        <div className='w-full text-center'>{quantity}</div>
        <button className='w-full' onClick={addQuantity}>+</button>
      </div>
      <button onClick={f}>add to cart</button>
    </div>
  )
}
