import { getProducts, getCategories } from '../src/data/db'

describe('Categorías: únicas y consistentes', () => {
  it('getCategories no repite valores y coincide con categorías presentes', () => {
    const fromFn = getCategories()
    const fromData = Array.from(new Set(getProducts().map(p => p.category)))
    // mismas categorías, sin importar orden
    expect(new Set(fromFn)).toEqual(new Set(fromData))
  })
})
