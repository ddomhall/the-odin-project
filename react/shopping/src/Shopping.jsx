import { useState, useEffect } from 'react'
import Item from './Item'
import CartItem from './CartItem'

export default function Shopping() {
  const [cart, setCart] = useState([])
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=5')
      .then(res=>res.json())
      .then(json=>setItems(json))
      .catch((error) => console.error(error));
  }, [])

  function addToCart(e) {
    let item = items.find(i => i.id == e.target.parentElement.dataset.value)
    let quantity = parseInt(e.target.previousSibling.dataset.value)

    if (cart.some(i => i.item == item)) {
      setCart(cart.map(i => i.item == item ? {item: i.item, quantity: i.quantity + quantity} : i))
    } else {
      setCart([...cart, {item: item, quantity: quantity}])
    }
  }

  function checkOut() {
    setCart([])
  }

  return (
    <div className='flex'>
      <div className="flex flex-wrap justify-center gap-6 p-6 mr-36 w-full">
        {items.map(i => <Item key={'i' + i.id} i={i} f={addToCart}/>)}
      </div>
      <aside className="flex flex-col justify-between fixed right-0 w-36 mt-6 h-[calc(100vh-24px)]">
        <div>
          <h1>cart</h1>
          <section className='overflow-y-scroll'>
            {cart.map(i => <CartItem key={'c' + i.item.id} i={i} />)}
          </section>
        </div>
        <button onClick={checkOut}>check Out</button>
      </aside>
    </div>
  )
}
