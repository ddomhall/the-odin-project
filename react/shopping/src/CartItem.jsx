export default function CartItem({i}) {
  return (
  <div>
      <div data-testid='ci-title'>title: {i.item.title}</div>
      <div data-testid='ci-quantity'>quantity: {i.quantity}</div>
      <div data-testid='ci-price'>price: {i.item.price * i.quantity}</div>
  </div>
  )
}
