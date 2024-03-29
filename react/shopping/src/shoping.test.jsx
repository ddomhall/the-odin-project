import {vi} from 'vitest'
import { render, screen, fireEvent } from "@testing-library/react";
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
  it('renders all data', () => {
    const props = {id: 1, title: 'title1', description: 'desc1', image: 'image1', price: 1}
    const onClick = vi.fn();
    const user = userEvent.setup()

    render(<Item i={props} f={onClick} />)

    expect(screen.getByTestId('i-title').textContent).toMatch('title1')
    expect(screen.getByTestId('i-desc').textContent).toMatch('desc1')
    expect(screen.getByTestId('i-image').src).toMatch('image1')
    expect(screen.getByTestId('i-price').textContent).toMatch('1')
  })

  it('updates quantity', async () => {
    const onClick = vi.fn();
    const props = {id: 1, title: 'title1', description: 'desc1', image: 'image1', price: 1}
    const user = userEvent.setup()

    render(<Item i={props} f={onClick} />)

    const input = screen.getByTestId('i-quantity')
    fireEvent.change(input, {target: {value: 2}})

    expect(input).toHaveValue(2)
  })

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
