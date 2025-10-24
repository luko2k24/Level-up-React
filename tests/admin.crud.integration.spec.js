import { getProducts, createProduct, updateProduct, deleteProduct } from '../src/data/db'

describe('Admin/DB CRUD integración simple', () => {
  it('create → update → delete mantiene consistencia', () => {
    const before = getProducts().length

    createProduct({
      id: 'ptest-int',
      name: 'Tester',
      price: 1234,
      category: 'Periféricos',
      offer: false,
      image: '/img/placeholder.png'
    })

    // existe tras create
    let p = getProducts().find(x => x.id === 'ptest-int')
    expect(p).toBeDefined()
    expect(p.name).toBe('Tester')
    expect(getProducts().length).toBe(before + 1)

    // update conserva otros campos
    updateProduct('ptest-int', { price: 4321, offer: true })
    p = getProducts().find(x => x.id === 'ptest-int')
    expect(p.price).toBe(4321)
    expect(p.offer).toBeTrue()
    expect(p.category).toBe('Periféricos') // no lo tocamos

    // delete lo quita
    deleteProduct('ptest-int')
    expect(getProducts().length).toBe(before)
  })
})
