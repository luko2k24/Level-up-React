import { addToCart, clearCart, cartTotal, getCart } from '../src/data/db'

describe('Carrito: clearCart => vacío y total $0', () => {
  it('vacía el carrito y total vuelve a 0', () => {
    clearCart()
    addToCart({ id:'a', name:'A', price:1000 })
    addToCart({ id:'b', name:'B', price:500 })
    expect(cartTotal()).toBe(1500)

    clearCart()

    expect(getCart().length).toBe(0)
    expect(cartTotal()).toBe(0)
  })
})
