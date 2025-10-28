import React from 'react';
import { Link } from 'react-router-dom';
// Corregido: Importar el hook con el nombre de archivo/función correcto.
import useEstadoCarrito from '../hooks/useCart'; 
// Corregido: Importar el tipo ItemCarrito desde su fuente original (db.ts), usando 'type'.
import { type ItemCarrito } from '../data/db'; 

// Helper para formatear a CLP
const formatearCLP = (monto: number): string => {
  return monto.toLocaleString('es-CL');
};

export default function Carrito() {
  // Desestructuración en español
  const { 
    carrito, // cart
    total, // total
    eliminar, // remove
    vaciar // clear
  } = useEstadoCarrito(); // Usando el hook corregido

  // Estado vacío
  if (carrito.length === 0) {
    return (
      <div className="empty-state text-center p-5 bg-dark rounded-3 shadow-lg text-light">
        <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🛒</div>
        <h3 className="fw-light">Tu carrito de compras está vacío.</h3>
        <p className="text-secondary">¡Es hora de equiparte para tu próxima aventura!</p>
        <div className="mt-4">
          <Link to="/categorias" className="btn btn-warning btn-lg fw-bold">Ir a comprar</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="neon-title text-warning mb-4">Tu Carrito ({carrito.length} {carrito.length === 1 ? 'ítem' : 'ítems'})</h2>
      <div className="row g-4">
        {/* ==== Columna izquierda: lista de productos ==== */}
        <div className="col-12 col-lg-8">
          <div className="panel p-3 p-md-4 bg-dark text-white rounded-3 shadow-lg">
            <div className="table-responsive">
              <table className="table align-middle table-dark table-striped">
                <thead>
                  <tr className="text-warning">
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Total Ítem</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((i: ItemCarrito) => (
                    <tr key={i.id}>
                      <td className="fw-semibold text-light">{i.nombre}</td>
                      <td>{i.cantidad}</td>
                      <td>${formatearCLP(i.precio)}</td>
                      <td>${formatearCLP(i.precio * i.cantidad)}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          // Llamamos a la función eliminar
                          onClick={() => eliminar(i.id)}> 
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between flex-wrap gap-2 mt-3 pt-3 border-top border-secondary">
              <button className="btn btn-outline-danger fw-bold" onClick={vaciar}>Vaciar carrito</button>
              <Link to="/categorias" className="btn btn-outline-warning fw-bold">Seguir comprando</Link>
            </div>
          </div>
        </div>

        {/* ==== Columna derecha: resumen sticky ==== */}
        <div className="col-12 col-lg-4">
          <div className="panel p-4 bg-dark text-white rounded-3 shadow-lg position-sticky" style={{top:'90px'}}>
            <h5 className="mb-3 text-warning border-bottom border-secondary pb-2">Resumen de Compra</h5>
            <ul className="list-unstyled mb-3 summary-list">
              {carrito.map((i: ItemCarrito) => (
                <li key={i.id} className="d-flex justify-content-between small mb-2 text-secondary">
                  <span className="text-truncate me-2">{i.nombre} <span className="fw-bold text-light">× {i.cantidad}</span></span>
                  <span>${formatearCLP(i.precio * i.cantidad)}</span>
                </li>
              ))}
            </ul>
            <hr className="border-secondary"/>
            <div className="d-flex justify-content-between mb-4 fs-5">
              <strong>Total a Pagar:</strong>
              <strong className="text-warning">${formatearCLP(total)}</strong>
            </div>
            <Link to="/checkout" className="btn btn-warning w-100 btn-lg fw-bold">
              Pagar Ahora
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
