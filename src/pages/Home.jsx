import React, { useEffect, useState } from 'react'
import { getProducts, initDB } from '../data/db.js'
import ProductCard from '../components/ProductCard.jsx'
import useCartState from '../hooks/useCart.js'

export default function Home() {
  const [products, setProducts] = useState([])
  const { add } = useCartState()

  useEffect(() => {
    initDB()
    setProducts(getProducts())
  }, [])

  return (
    <div>
      <h1 className="mb-3">Tienda</h1>
      <div className="row g-3">
        {products.map(p => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
            <ProductCard product={p} onAdd={add} />
          </div>
        ))}
      </div>
    </div>
  )
}
