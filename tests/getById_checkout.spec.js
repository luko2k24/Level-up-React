
import {
  getProducts,
  getProductById,
  clearCart,
  addToCart,
  cartTotal,
  getCart
} from '../src/data/db'

describe('getProductById y lógica de checkout', () => {
  
  it('getProductById devuelve el producto correcto cuando existe', () => {
    const one = getProducts()[0]
    const found = getProductById(one.id)

    expect(found).toBeDefined()  // Verifica que el producto exista
    expect(found.id).toBe(one.id)  // Verifica que el id coincida
    expect(found.name).toBe(one.name)  // Verifica que el nombre coincida
  })

  it('getProductById retorna null si el id no existe', () => {
    const notFound = getProductById('non-existent-id')
    expect(notFound).toBeNull()  // Verifica que retorne null cuando el producto no existe
  })

  it('checkout aprueba si hay items y total > 0', () => {
    clearCart()
    addToCart({ id: 'p1', name: 'A', price: 1000 })
    expect(cartTotal()).toBeGreaterThan(0)  // Verifica que el total sea mayor a 0
    const aprobado = cartTotal() > 0
    expect(aprobado).toBeTrue()  // Asegura que el carrito se apruebe cuando el total es positivo
  })

  it('checkout NO aprueba si el carrito está vacío', () => {
    clearCart()
    expect(cartTotal()).toBe(0)  // Verifica que el total sea 0 cuando el carrito está vacío
    const aprobado = cartTotal() > 0
    expect(aprobado).toBeFalse()  // Asegura que no se apruebe el checkout cuando el carrito está vacío
  })

  // ── Casos de ramas: precios inválidos ────────────────────────────────────────
  it('NO permite agregar producto con precio NEGATIVO (lanza error) y el total queda 0', () => {
    clearCart()
    expect(() =>
      addToCart({ id: 'neg', name: 'Negativo', price: -500 })
    ).toThrowError(/precio.*mayor a cero/i)  // Verifica que se lance un error por precio negativo

    // Tras el throw, el carrito no debe cambiar
    expect(getCart().length).toBe(0)
    expect(cartTotal()).toBe(0)  // El total sigue siendo 0
  })

  it('NO permite agregar producto con precio 0 (lanza error) y el total queda 0', () => {
    clearCart()
    expect(() =>
      addToCart({ id: 'zero', name: 'Cero', price: 0 })
    ).toThrowError(/precio.*mayor a cero/i)  // Verifica que se lance un error por precio cero

    // Tras el throw, el carrito no debe cambiar
    expect(getCart().length).toBe(0)
    expect(cartTotal()).toBe(0)  // El total sigue siendo 0
  })
})
