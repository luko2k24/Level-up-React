// tests/branches.coverage.spec.js
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getProductById,
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  cartTotal
} from '../src/data/db'

describe('Ramas y errores CRUD y carrito (para coverage)', () => {
  beforeEach(() => {
    clearCart()
  })

  it('createProduct lanza error con ID duplicado', () => {
    const baseCount = getProducts().length
    const existing = getProducts()[0]
    expect(() => createProduct({ id: existing.id, name: 'X', price: 100 })).toThrowError(/ID duplicado/i)
    expect(getProducts().length).toBe(baseCount)
  })

  it('updateProduct lanza error si no existe', () => {
    const fakeId = 'no-existe-xyz'
    expect(() => updateProduct(fakeId, { name: 'nuevo' })).toThrowError(/No encontrado/i)
  })

  it('deleteProduct elimina producto existente', () => {
    // crear temporal y borrar
    const temp = { id: 'temp-delete', name: 'temp', price: 1, category: 'T' }
    createProduct(temp)
    const before = getProducts().length
    deleteProduct('temp-delete')
    expect(getProducts().find(p => p.id === 'temp-delete')).toBeUndefined()
    expect(getProducts().length).toBe(before - 1)
  })

  it('getCategories devuelve lista única y ordenada', () => {
    const cats = getCategories()
    // debe coincidir con set(unique) y estar ordenado
    const unique = Array.from(new Set(getProducts().map(p => p.category))).sort()
    expect(cats).toEqual(unique)
  })

  it('removeFromCart deja el carrito igual si id no existe', () => {
    clearCart()
    addToCart({ id: 'a', name: 'A', price: 100 })
    const before = getCart().length
    removeFromCart('no-existe')
    expect(getCart().length).toBe(before)
  })

  it('addToCart incrementa qty cuando el mismo id se agrega', () => {
    clearCart()
    addToCart({ id: 'x', name: 'X', price: 10 })
    addToCart({ id: 'x', name: 'X', price: 10 })
    const c = getCart().find(i => i.id === 'x')
    expect(c.qty).toBe(2)
    expect(cartTotal()).toBe(20)
  })
})
