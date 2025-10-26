import React, { useEffect, useMemo, useState } from 'react'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../data/db.js'

const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
})

const CATEGORIAS = ['Periféricos', 'Audio', 'Monitores', 'Muebles', 'Almacenamiento', 'Accesorios']

export default function Admin() {
  const [list, setList] = useState([])
  const [form, setForm] = useState({ id: '', name: '', price: '', category: '', offer: false })
  const [editing, setEditing] = useState(false)
  const [err, setErr] = useState('')

  const orderedList = useMemo(
    () => [...list].sort((a, b) => String(a.id).localeCompare(String(b.id))),
    [list]
  )

  const refresh = () => {
    try {
      const data = getProducts() || []
      setList(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error('getProducts() falló:', e)
      setList([])
    }
  }

  useEffect(() => { refresh() }, [])

  const onChange = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const validate = () => {
    if (!form.name.trim()) return 'El nombre es obligatorio'
    const price = Number(form.price)
    if (!Number.isFinite(price) || price <= 0) return 'El precio debe ser un número mayor a 0'
    if (!form.category.trim()) return 'Selecciona una categoría'
    return ''
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const msg = validate()
    if (msg) {
      setErr(msg)
      return
    }
    setErr('')

    const payload = {
      id: form.id?.trim(),
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category.trim(),
      offer: Boolean(form.offer),
    }

    try {
      if (editing) {
        if (!payload.id) {
          setErr('Falta el ID para editar')
          return
        }
        updateProduct(payload.id, payload)
      } else {
        // Si no mandas ID, se genera con timestamp
        if (!payload.id) payload.id = `p${Date.now()}`
        // Evita IDs duplicadas
        if (list.some(p => String(p.id) === String(payload.id))) {
          setErr(`Ya existe un producto con ID "${payload.id}"`)
          return
        }
        createProduct(payload)
      }

      setForm({ id: '', name: '', price: '', category: '', offer: false })
      setEditing(false)
      refresh()
    } catch (e2) {
      console.error('onSubmit error:', e2)
      setErr('No se pudo guardar. Revisa la consola.')
    }
  }

  const onEdit = (p) => {
    setForm({
      id: p.id ?? '',
      name: p.name ?? '',
      price: p.price ?? '',
      category: p.category ?? '',
      offer: !!p.offer
    })
    setEditing(true)
    setErr('')
  }

  const onDelete = (id) => {
    if (!id) return
    if (!confirm(`¿Eliminar el producto ${id}? Esta acción no se puede deshacer.`)) return
    try {
      deleteProduct(id)
      refresh()
    } catch (e) {
      console.error('deleteProduct error:', e)
      setErr('No se pudo eliminar el producto.')
    }
  }

  const onClear = () => {
    setForm({ id: '', name: '', price: '', category: '', offer: false })
    setEditing(false)
    setErr('')
  }

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-5">
        <h2 className="h4 mb-3">Gestión de productos</h2>

        {err && (
          <div className="alert alert-warning py-2">{err}</div>
        )}

        <form onSubmit={onSubmit} className="row g-3" autoComplete="off">
          {/* ID (opcional al crear) */}
          <div className="col-12">
            <label className="form-label">ID</label>
            <input
              className="form-control"
              placeholder="(auto si lo dejas vacío)"
              value={form.id}
              onChange={e => onChange('id', e.target.value)}
              disabled={editing} // normalmente no se cambia el ID al editar
            />
          </div>

          {/* Nombre */}
          <div className="col-12">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              value={form.name}
              onChange={e => onChange('name', e.target.value)}
              placeholder="Ej: Teclado Mecánico RGB"
              required
            />
          </div>

          {/* Precio */}
          <div className="col-12 col-sm-6">
            <label className="form-label">Precio</label>
            <input
              type="number"
              min="1"
              className="form-control"
              value={form.price}
              onChange={e => onChange('price', e.target.value)}
              placeholder="Ej: 39990"
              required
            />
          </div>

          {/* Categoría */}
          <div className="col-12 col-sm-6">
            <label className="form-label">Categoría</label>
            <select
              className="form-select"
              value={form.category}
              onChange={e => onChange('category', e.target.value)}
              required
            >
              <option value="">Selecciona…</option>
              {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Oferta */}
          <div className="col-12">
            <div className="form-check">
              <input
                id="offer"
                type="checkbox"
                className="form-check-input"
                checked={form.offer}
                onChange={e => onChange('offer', e.target.checked)}
              />
              <label htmlFor="offer" className="form-check-label">En oferta</label>
            </div>
          </div>

          <div className="col-12 d-flex gap-2">
            <button className="btn btn-primary" type="submit">
              {editing ? 'Guardar cambios' : 'Crear'}
            </button>
            <button className="btn btn-outline-secondary" type="button" onClick={onClear}>
              Limpiar
            </button>
          </div>
        </form>
      </div>

      {/* Tabla */}
      <div className="col-12 col-lg-7">
        <h2 className="h4 mb-3">Listado</h2>
        <div className="table-responsive">
          <table className="table table-dark table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th className="text-end">Precio</th>
                <th className="text-center">Oferta</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orderedList.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td className="text-end">{CLP.format(Number(p.price) || 0)}</td>
                  <td className="text-center">{p.offer ? 'Sí' : 'No'}</td>
                  <td className="text-end">
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onEdit(p)}
                        type="button"
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(p.id)}
                        type="button"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {orderedList.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No hay productos. Crea el primero con el formulario.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
