import React from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from '../src/components/ProductCard.jsx'

describe('ProductCard', () => {
  it('renderiza nombre y precio', (done) => {
    // host donde montamos React
    const host = document.createElement('div')
    document.body.appendChild(host)
    const root = createRoot(host)

    const product = {
      id: 'p1',
      name: 'Mouse',
      price: 1000,
      category: 'Periféricos',
      image: '/img/placeholder.png'
    }

    // Envolver en Router porque ProductCard usa <Link>
    root.render(
      <MemoryRouter>
        <ProductCard product={product} onAdd={()=>{}} onView={()=>{}} />
      </MemoryRouter>
    )

    // Damos un tick para que React pinte y luego asertamos
    setTimeout(() => {
      try {
        expect(host.textContent).toContain('Mouse')
        expect(host.textContent).toContain('1.000') // formato chileno
        root.unmount()
        document.body.removeChild(host)
        done()
      } catch (err) {
        root.unmount()
        document.body.removeChild(host)
        done.fail(err)
      }
    }, 0)
  })
})
