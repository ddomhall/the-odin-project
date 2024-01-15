import { useState, useEffect } from 'react'
import Item from './Item'

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
    setCart([...cart, items.find(i => i.id == e.target.parentElement.dataset.value)])
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
            {cart.map(i => <div key={'c'+i.id}>{i.name}</div>)}
          </section>
        </div>
        <button>check Out</button>
      </aside>
    </div>
  )
}
