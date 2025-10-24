// src/pages/Carrito.jsx
import { Link } from 'react-router-dom'
import useCartState from '../hooks/useCart'

export default function Carrito() {
  const { cart, total, remove, clear } = useCartState()

  if (cart.length === 0) {
    return (
      <div className="empty-state">
        <div style={{fontSize: 28, marginBottom: 8}}>🛒</div>
        Tu carrito está vacío.
        <div className="mt-3">
          <Link to="/categorias" className="btn btn-primary">Ir a comprar</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <h2 className="neon-title">Carrito</h2>
      <div className="row g-4">
        {/* ==== columna izquierda: lista de productos ==== */}
        <div className="col-12 col-lg-8">
          <div className="panel">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(i => (
                    <tr key={i.id}>
                      <td className="fw-semibold">{i.name}</td>
                      <td>{i.qty}</td>
                      <td>${i.price.toLocaleString('es-CL')}</td>
                      <td>${(i.price * i.qty).toLocaleString('es-CL')}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => remove(i.id)}>
                          ✖
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-outline-light" onClick={clear}>Vaciar carrito</button>
              <Link to="/categorias" className="btn btn-outline-light">Seguir comprando</Link>
            </div>
          </div>
        </div>

        {/* ==== columna derecha: resumen sticky ==== */}
        <div className="col-12 col-lg-4">
          <div className="panel position-sticky" style={{top:'90px'}}>
            <h5 className="mb-3" style={{color:'var(--primary)'}}>Resumen de compra</h5>
            <ul className="list-unstyled mb-3">
              {cart.map(i => (
                <li key={i.id} className="d-flex justify-content-between small mb-1">
                  <span>{i.name} × {i.qty}</span>
                  <span>${(i.price * i.qty).toLocaleString('es-CL')}</span>
                </li>
              ))}
            </ul>
            <hr className="border-secondary"/>
            <div className="d-flex justify-content-between mb-3">
              <strong>Total:</strong>
              <strong>${total.toLocaleString('es-CL')}</strong>
            </div>
            <Link to="/checkout" className="btn btn-primary w-100">
              Pagar ahora
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
