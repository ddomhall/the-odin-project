import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from './../src/CartItem.jsx'

describe('cartitem', () => {
  it('renders all data', () => {
    const props = {item: {title: 'title1', price: 1}, quantity: 1}
    render(<CartItem i={props} />)
    expect(screen.getByTestId('ci-title').textContent).toMatch('title1')
    expect(screen.getByTestId('ci-quantity').textContent).toMatch('1')
    expect(screen.getByTestId('ci-price').textContent).toMatch('1')
  })
})
