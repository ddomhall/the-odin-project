import {useState} from 'react'

export default function Item({info}) {
  const [quantity, setQuantity] = useState(1)

  function addQuantity() {
    setQuantity(q => q + 1)
  }

  function subQuantity() {
    if (quantity != 1) setQuantity(q => q - 1)
  }

  return (
    <div className='flex flex-col w-32 h-32'>
      <div>name: {info.name}</div>
      <div>price: {info.price}</div>
      <div className='flex justify-evenly'>
        <button onClick={subQuantity} className='w-full'>-</button>
        <div className='w-full text-center'>{quantity}</div>
        <button onClick={addQuantity} className='w-full'>+</button>
      </div>
      <button>add to cart</button>
    </div>
  )
}
