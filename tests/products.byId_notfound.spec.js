import { getProductById } from '../src/data/db'

describe('getProductById: no encontrado', () => {
  it('retorna undefined cuando el id no existe', () => {
    const p = getProductById('___does-not-exist___')
    expect(!!p).toBeFalse()
  })
})
