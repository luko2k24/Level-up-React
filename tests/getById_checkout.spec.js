import { getProducts, getProductById, clearCart, addToCart, cartTotal } from '../src/data/db'

describe('getProductById y lógica de checkout', () => {
  it('getProductById devuelve el producto correcto', () => {
    const one = getProducts()[0]
    const found = getProductById(one.id)
    expect(found).toBeDefined()
    expect(found.id).toBe(one.id)
  })

  it('checkout aprueba si hay items y total > 0', () => {
    clearCart()
    addToCart({ id:'p1', name:'A', price:1000 })
    expect(cartTotal()).toBeGreaterThan(0)
    const aprobado = cartTotal() > 0
    expect(aprobado).toBeTrue()
  })

  it('checkout NO aprueba si el carrito está vacío', () => {
    clearCart()
    expect(cartTotal()).toBe(0)
    const aprobado = cartTotal() > 0
    expect(aprobado).toBeFalse()
  })
})
