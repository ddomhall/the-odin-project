import {vi} from 'vitest'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from './../src/CartItem.jsx'
import Item from './../src/Item.jsx'

describe('cartitem', () => {
  it('renders all data', () => {
    const props = {item: {title: 'title1', price: 1}, quantity: 1}
    render(<CartItem i={props} />)
    expect(screen.getByTestId('ci-title').textContent).toMatch('title1')
    expect(screen.getByTestId('ci-quantity').textContent).toMatch('1')
    expect(screen.getByTestId('ci-price').textContent).toMatch('1')
  })
})

describe('item', () => {
  it('calls callback', async () => {
    const onClick = vi.fn();
    const props = {id: 1, title: 'title1', description: 'desc1', image: 'image1', price: 1}
    const user = userEvent.setup()

    render(<Item i={props} f={onClick} />)

    const button = screen.getByRole("button");
    await user.click(button);

    expect(onClick).toHaveBeenCalled()
  })
})
