export default function cartItem({i}) {
  return (
  <>
      <div>name: {i.item.name}</div>
      <div>quantity: {i.quantity}</div>
  </>
  )
}
