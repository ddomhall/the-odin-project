export default function CartItem({i}) {
  return (
  <div>
      <div data-testid='ci-title'>title: {i.item.title}</div>
      <div data-testid='ci-quantity'>quantity: {i.quantity}</div>
      <div data-testid='ci-price'>price: {(Math.round(i.item.price * i.quantity * 100) / 100).toFixed(2)}</div>
  </div>
  )
}
