import { getProducts } from '../src/data/db'

describe('Filtros: categorías y ofertas', () => {
  it('filtra por categoría', () => {
    const list = getProducts()
    const cat = list[0].category
    const filtered = list.filter(p => p.category === cat)
    expect(filtered.length).toBeGreaterThan(0)
    expect(filtered.every(p => p.category === cat)).toBeTrue()
  })

it('filtra ofertas (offer === true)', () => {
  const offers = getProducts().filter(p => p.offer === true);
  expect(offers.every(p => p.offer === true)).toBeTrue();  
});

})
