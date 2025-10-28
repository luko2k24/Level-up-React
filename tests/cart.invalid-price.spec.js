// tests/cart.invalid-price.spec.js
import { clearCart, addToCart, getCart, cartTotal } from '../src/data/db'

describe('Carrito: precios inválidos', () => {
  beforeEach(() => clearCart())

  it('no permite precio NEGATIVO', () => {
    expect(() => addToCart({ id: 'neg', name: 'N', price: -50 })).toThrowError(/precio.*mayor a cero/i)
    expect(getCart().length).toBe(0)
    expect(cartTotal()).toBe(0)
  })

  it('no permite precio CERO', () => {
    expect(() => addToCart({ id: 'zero', name: 'Z', price: 0 })).toThrowError(/precio.*mayor a cero/i)
    expect(getCart().length).toBe(0)
    expect(cartTotal()).toBe(0)
  })
})
