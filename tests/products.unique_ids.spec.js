import { getProducts } from '../src/data/db'

describe('Productos: IDs únicos en la semilla', () => {
  it('no hay IDs duplicados', () => {
    const ids = getProducts().map(p => p.id)
    const uniq = new Set(ids)
    expect(uniq.size).toBe(ids.length)
  })
})
