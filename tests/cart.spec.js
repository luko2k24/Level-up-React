import { addToCart, clearCart, getCart } from '../src/data/db.js'

describe('Carrito - estado', () => {
  beforeEach(() => { clearCart() })

  it('agrega items y suma cantidad al mismo producto', () => {
    addToCart({ id:'x', name:'X', price:10 })
    addToCart({ id:'x', name:'X', price:10 })
    const cart = getCart()
    expect(cart.length).toBe(1)
    expect(cart[0].qty).toBe(2)
  })
})
