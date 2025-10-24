// src/pages/ProductoDetalle.jsx
import { useParams, Link } from 'react-router-dom'
import { getProductById, addToCart } from '../data/db'

export default function ProductoDetalle(){
  const { id } = useParams()
  const p = getProductById(id)

  if (!p) {
    return (
      <div className="empty-state">
        Producto no encontrado.
        <div className="mt-3">
          <Link className="btn btn-primary" to="/categorias">Volver a la tienda</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Breadcrumb simple */}
      <nav className="breadcrumb-gamer mb-2 small">
        <Link to="/categorias" className="link-light text-decoration-none">Categorías</Link>
        <span className="sep">/</span>
        <span className="text-muted">{p.category}</span>
      </nav>

      <h2 className="neon-title">{p.name}</h2>
      <div className="neon-sub">{p.category}</div>

      <div className="row g-4">
        {/* IMAGEN 4:3 */}
        <div className="col-12 col-lg-6">
          <div className="panel">
            <div className="ratio ratio-4x3 product-hero">
              <img src={p.image} alt={p.name} loading="lazy" />
            </div>
          </div>
        </div>

        {/* INFO / PRECIO / CTA */}
        <div className="col-12 col-lg-6">
          <div className="panel">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge badge-category">{p.category}</span>
              {p.offer && <span className="badge badge-oferta">Oferta</span>}
            </div>

            <h3 className="mb-3">${Number(p.price).toLocaleString('es-CL')}</h3>

            {/* Specs demo (opcional): si quieres, puedes añadir props reales en la DB */}
            <ul className="list-unstyled small text-muted mb-4">
              <li>• Garantía 6 meses</li>
              <li>• Despacho a todo Chile</li>
              <li>• Imagen referencial</li>
            </ul>

            <div className="d-grid gap-2">
              <button className="btn btn-primary btn-lg" onClick={() => addToCart(p)}>
                Agregar al carrito
              </button>
              <Link className="btn btn-outline-light" to="/carrito">Ir al carrito</Link>
            </div>
          </div>
        </div>

        {/* DESCRIPCIÓN (placeholder corta) */}
        <div className="col-12">
          <div className="panel">
            <h5 className="mb-2" style={{color:'var(--primary)'}}>Descripción</h5>
            <p className="text-muted mb-0">
              {p.name} de la categoría {p.category}. Producto de demostración para la evaluación:
              catálogo, carrito y checkout con look gamer y Bootstrap.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
