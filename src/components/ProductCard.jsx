// src/components/ProductCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const FALLBACK = '/img/placeholder.png'

export default function ProductCard({ product, onAdd, onView }) {
  if (!product) return null
  const { id, name, price, image, category, offer } = product

  return (
    <div className="card h-100">
      {/* Marco UNIFORME: 4:3, centrado, sin recorte */}
      <div className="ratio ratio-4x3 product-media">
        <img
          src={image || FALLBACK}
          onError={(e) => { e.currentTarget.src = FALLBACK }}
          loading="lazy"
          alt={name}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          {category && <span className="badge badge-category">{category}</span>}
          {offer && <span className="badge badge-oferta">Oferta</span>}
        </div>

        <h5 className="card-title">{name}</h5>
        {category && <p className="card-text text-secondary">{category}</p>}
        <p className="fs-5 mb-3">${Number(price).toLocaleString('es-CL')}</p>

        <div className="d-flex gap-2 mt-auto">
          {id ? (
            <Link to={`/producto/${id}`} className="btn btn-outline-light btn-sm">Ver</Link>
          ) : (
            <button className="btn btn-outline-light btn-sm" onClick={onView}>Ver</button>
          )}
          <button className="btn btn-primary btn-sm" onClick={() => onAdd && onAdd(product)}>
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}
