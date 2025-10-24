import { useEffect, useState } from 'react'
import { getProducts } from '../data/db'
import ProductCard from '../components/ProductCard'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../data/db'

export default function Ofertas() {
  const [products, setProducts] = useState([])
  const nav = useNavigate()

  useEffect(() => {
    setProducts(getProducts().filter(p => p.offer))
  }, [])

  return (
    <>
      <h2 className="neon-title">Ofertas</h2>
      <div className="panel">
        <div className="row g-3">
          {products.map(p => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
              <ProductCard
                product={p}
                onAdd={() => addToCart(p)}
                onView={() => nav(`/producto/${p.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
