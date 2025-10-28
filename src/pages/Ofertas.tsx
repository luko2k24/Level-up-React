import { JSX, useEffect, useState } from 'react'
import { obtenerProductos, agregarAlCarrito, type Producto } from '../data/db'
import ProductCard from '../components/ProductCard'
import { useNavigate } from 'react-router-dom'


export default function Ofertas(): JSX.Element {
  // Tipamos el estado para que sea un array de Producto (el importado de db)
  const [productos, setProductos] = useState<Producto[]>([])
  const nav = useNavigate()

  useEffect(() => {
    // Ya que obtenerProductos debería devolver Producto[], no necesitamos el 'as Producto[]'
    const todosLosProductos = obtenerProductos();
    // Filtramos los productos que tienen 'oferta'
    setProductos(todosLosProductos.filter(p => p.oferta)) 
  }, [])

  return (
    <>
      <h2 className="neon-title text-warning mb-4">Ofertas</h2>
      <div className="panel p-4 bg-dark text-white rounded-3 shadow-lg">
        <div className="row g-4">
          {productos.map(p => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
              <ProductCard
                // Ahora product={p} es válido porque 'p' usa la interfaz completa de db.ts
                product={p}
                onAdd={() => agregarAlCarrito(p)}
                onView={() => nav(`/producto/${p.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
