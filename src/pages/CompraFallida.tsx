import React, { JSX } from 'react'
import { Link } from 'react-router-dom' 

/**
 * Componente que se muestra cuando la compra no se puede completar (ej. carrito vacío, error de validación).
 * No requiere lógica ni hooks de estado.
 */
export default function CompraFallida(): JSX.Element {
  return (
    <div className="text-center">
      <h1 style={{ color: 'var(--danger)' }}>No se pudo completar el pago 😞</h1>
      <p className="lead">Inténtalo nuevamente o elige otro método.</p>
      
      <div className="d-flex justify-content-center gap-2 mt-3">
        {/* Botón para volver al formulario de checkout */}
        <Link to="/checkout" className="btn btn-primary">Reintentar</Link>
        
        {/* Botón para volver al inicio/tienda */}
        <Link to="/" className="btn btn-outline-secondary">Volver a la tienda</Link>
      </div>
    </div>
  )
}
