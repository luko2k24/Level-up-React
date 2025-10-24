import { getProducts, createProduct, updateProduct, deleteProduct } from '../src/data/db'

describe('DB - Productos (CRUD)', () => {
  it('createProduct agrega un producto', () => {
    const before = getProducts().length
    createProduct({ id:'ptest', name:'X', price:1000, category:'C', offer:false, image:'/img/placeholder.png' })
    const after = getProducts().length
    expect(after).toBe(before + 1)
    deleteProduct('ptest')
  })

  it('updateProduct modifica campos', () => {
    createProduct({ id:'ptest', name:'X', price:1000, category:'C', offer:false, image:'/img/placeholder.png' })
    updateProduct('ptest', { price:2000, offer:true })
    const p = getProducts().find(x => x.id === 'ptest')
    expect(p.price).toBe(2000)
    expect(p.offer).toBeTrue()
    deleteProduct('ptest')
  })

  it('deleteProduct elimina un producto', () => {
    createProduct({ id:'ptest', name:'X', price:1000, category:'C', offer:false, image:'/img/placeholder.png' })
    const before = getProducts().length
    deleteProduct('ptest')
    const after = getProducts().length
    expect(after).toBe(before - 1)
  })
})
