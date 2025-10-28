// tests/components/productCard.render.spec.js
import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import ProductCard from '../src/components/ProductCard' // ajusta ruta si difiere

afterEach(cleanup)

describe('ProductCard (componente) - render y evento add', () => {
  it('renderiza nombre y precio correctamente y llama add', () => {
    const product = { id: 'p-test', name: 'Test Prod', price: 123, image: '/img.png' }
    const mockAdd = jasmine.createSpy('addToCart') // jasmine spy
    const { getByText } = render(<ProductCard product={product} onAdd={mockAdd} />)

    expect(getByText('Test Prod')).toBeTruthy()
    // Busca el precio en formato que uses, o el número
    expect(getByText(/123/)).toBeTruthy()

    const btn = getByText(/Agregar|Add to cart|Añadir/i) // intenta varios textos
    if (btn) {
      fireEvent.click(btn)
      expect(mockAdd).toHaveBeenCalled()
    }
  })
})
