export default function cartItem({i}) {
  return (
  <>
      <div>title: {i.item.title}</div>
      <div>quantity: {i.quantity}</div>
      <div>price: {i.item.price * i.quantity}</div>
  </>
  )
}
