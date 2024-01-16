import { useState, useEffect } from 'react'
import Item from './Item'
import CartItem from './CartItem'

export default function Shopping() {
  const [cart, setCart] = useState([])
  const [items, setItems] = useState([
    {
      name: 'item1',
      price: 1.00,
      id: 1,
    },
    {
      name: 'item2',
      price: 2.00,
      id: 2,
    },
    {
      name: 'item3',
      price: 3.00,
      id: 3,
    },
  ]
  )

  function addToCart(e) {
    let item = items.find(i => i.id == e.target.parentElement.dataset.value)
    let quantity = parseInt(e.target.previousSibling.dataset.value)

    if (cart.some(i => i.item == item)) {
      setCart(cart.map(i => i.item == item ? {item: i.item, quantity: i.quantity + quantity} : i))
    } else {
      setCart([...cart, {item: item, quantity: quantity}])
    }
  }

  return (
    <div className="grid grid-cols-5 h-[calc(100vh-24px)]">
      <div className="col-span-4 flex flex-wrap gap-6 p-6">
        {items.map(i => <Item key={'i' + i.id} i={i} f={addToCart}/>)}
      </div>
      <aside className="col-span-1 flex flex-col justify-between">
        <div>
          <h1>cart</h1>
          <section>
            {cart.map(i => <CartItem key={'c' + i.item.id} i={i} />)}
          </section>
        </div>
        <button>check Out</button>
      </aside>
    </div>
  )
}
