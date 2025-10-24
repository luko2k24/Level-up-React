import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function CompraExitosa() {
  const loc = useLocation()
  const monto = loc.state?.monto ?? 0
  return (
    <div className="text-center">
      <h1>¡Compra realizada con éxito! 🎉</h1>
      <p className="lead">Monto pagado: ${monto.toLocaleString('es-CL')}</p>
      <Link to="/" className="btn btn-primary mt-3">Volver a la tienda</Link>
    </div>
  )
}
