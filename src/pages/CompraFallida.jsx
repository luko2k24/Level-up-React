import React from 'react'
import { Link } from 'react-router-dom'

export default function CompraFallida() {
  return (
    <div className="text-center">
      <h1>No se pudo completar el pago 😞</h1>
      <p className="lead">Inténtalo nuevamente o elige otro método.</p>
      <div className="d-flex justify-content-center gap-2 mt-3">
        <Link to="/checkout" className="btn btn-primary">Reintentar</Link>
        <Link to="/" className="btn btn-outline-secondary">Volver a la tienda</Link>
      </div>
    </div>
  )
}
