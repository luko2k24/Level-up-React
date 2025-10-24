// src/pages/Checkout.jsx
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCart, cartTotal, clearCart } from '../data/db'

const initialForm = {
  nombre: '',
  apellidos: '',
  correo: '',
  calle: '',
  depto: '',
  region: '',
  comuna: '',
  indicaciones: ''
}

export default function Checkout(){
  const nav = useNavigate()
  const cart = getCart()
  const total = cartTotal()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  const handle = (k, v) => setForm(s => ({ ...s, [k]: v }))

  const isEmpty = useMemo(() => cart.length === 0 || total <= 0, [cart, total])

  const validate = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'Requerido'
    if (!form.apellidos.trim()) e.apellidos = 'Requerido'
    if (!/^\S+@\S+\.\S+$/.test(form.correo)) e.correo = 'Correo inválido'
    if (!form.calle.trim()) e.calle = 'Requerido'
    if (!form.region.trim()) e.region = 'Requerido'
    if (!form.comuna.trim()) e.comuna = 'Requerido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (isEmpty) { nav('/compra-fallida'); return }
    if (!validate()) return
    clearCart()
    nav('/compra-exitosa')
  }

  if (isEmpty){
    return (
      <div className="empty-state">
        Tu carrito está vacío. <a href="/categorias" className="btn btn-primary ms-2">Ir a comprar</a>
      </div>
    )
  }

  return (
    <>
      <h2 className="neon-title">Checkout</h2>

      <div className="row g-4">
        {/* Izquierda: Resumen de compra (tabla) */}
        <div className="col-12 col-lg-6">
          <div className="panel">
            <h5 className="mb-3" style={{color:'var(--primary)'}}>Carrito de compra</h5>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th className="text-center">Cant.</th>
                    <th className="text-end">Precio</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(i => (
                    <tr key={i.id}>
                      <td className="fw-semibold">{i.name}</td>
                      <td className="text-center">{i.qty}</td>
                      <td className="text-end">${i.price.toLocaleString('es-CL')}</td>
                      <td className="text-end">${(i.price * i.qty).toLocaleString('es-CL')}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end fw-bold">Total a pagar</td>
                    <td className="text-end fw-bold">${total.toLocaleString('es-CL')}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Derecha: Formulario (sticky) */}
        <div className="col-12 col-lg-6">
          <div className="panel position-sticky" style={{top:'90px'}}>
            <h5 className="mb-3" style={{color:'var(--primary)'}}>Información del cliente</h5>
            <form className="row g-3" onSubmit={submit} noValidate>
              {/* Nombre / Apellidos */}
              <div className="col-md-6">
                <label className="form-label">Nombre*</label>
                <input
                  className={`form-control ${errors.nombre?'is-invalid':''}`}
                  value={form.nombre}
                  onChange={e=>handle('nombre', e.target.value)}
                />
                {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Apellidos*</label>
                <input
                  className={`form-control ${errors.apellidos?'is-invalid':''}`}
                  value={form.apellidos}
                  onChange={e=>handle('apellidos', e.target.value)}
                />
                {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
              </div>

              {/* Correo */}
              <div className="col-12">
                <label className="form-label">Correo*</label>
                <input
                  type="email"
                  className={`form-control ${errors.correo?'is-invalid':''}`}
                  value={form.correo}
                  onChange={e=>handle('correo', e.target.value)}
                />
                {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
              </div>

              <h6 className="mt-2" style={{color:'var(--muted)'}}>Dirección de entrega</h6>

              {/* Calle / Depto */}
              <div className="col-md-8">
                <label className="form-label">Calle*</label>
                <input
                  className={`form-control ${errors.calle?'is-invalid':''}`}
                  value={form.calle}
                  onChange={e=>handle('calle', e.target.value)}
                />
                {errors.calle && <div className="invalid-feedback">{errors.calle}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label">Depto (opcional)</label>
                <input
                  className="form-control"
                  value={form.depto}
                  onChange={e=>handle('depto', e.target.value)}
                />
              </div>

              {/* Región / Comuna */}
              <div className="col-md-6">
                <label className="form-label">Región*</label>
                <input
                  className={`form-control ${errors.region?'is-invalid':''}`}
                  value={form.region}
                  onChange={e=>handle('region', e.target.value)}
                />
                {errors.region && <div className="invalid-feedback">{errors.region}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Comuna*</label>
                <input
                  className={`form-control ${errors.comuna?'is-invalid':''}`}
                  value={form.comuna}
                  onChange={e=>handle('comuna', e.target.value)}
                />
                {errors.comuna && <div className="invalid-feedback">{errors.comuna}</div>}
              </div>

              {/* Indicaciones */}
              <div className="col-12">
                <label className="form-label">Indicaciones (opcional)</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={form.indicaciones}
                  onChange={e=>handle('indicaciones', e.target.value)}
                  placeholder="Ej: Entre calles, edificio, no tiene timbre…"
                />
              </div>

              {/* Botón pagar */}
              <div className="col-12 d-grid mt-2">
                <button className="btn btn-primary btn-lg">
                  Pagar ahora ${total.toLocaleString('es-CL')}
                </button>
              </div>
              <p className="small text-muted mt-1">Los campos con * son obligatorios.</p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
