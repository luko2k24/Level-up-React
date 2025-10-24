import React, { useEffect, useState } from 'react'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../data/db.js'

export default function Admin() {
  const [list, setList] = useState([])
  const [form, setForm] = useState({ id:'', name:'', price:'', category:'', offer:false })
  const [editing, setEditing] = useState(false)

  const refresh = () => setList(getProducts())

  useEffect(() => { refresh() }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    const payload = { ...form, price: Number(form.price), offer: Boolean(form.offer) }
    if (editing) {
      updateProduct(form.id, payload)
    } else {
      if (!form.id) payload.id = `p${Date.now()}`
      createProduct(payload)
    }
    setForm({ id:'', name:'', price:'', category:'', offer:false })
    setEditing(false)
    refresh()
  }

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-5">
        <h2 className="h4">Gestión de productos</h2>
        <form onSubmit={onSubmit} className="row g-2">
          {['id','name','price','category'].map(k => (
            <div className="col-12" key={k}>
              <label className="form-label text-capitalize">{k}</label>
              <input className="form-control" value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} placeholder={k==='id'?'(auto si vacío)': ''} />
            </div>
          ))}
          <div className="col-12 form-check">
            <input id="offer" type="checkbox" className="form-check-input" checked={form.offer} onChange={e=>setForm({...form, offer: e.target.checked})} />
            <label htmlFor="offer" className="form-check-label">En oferta</label>
          </div>
          <div className="col-12 d-flex gap-2">
            <button className="btn btn-primary" type="submit">{editing ? 'Guardar cambios' : 'Crear'}</button>
            <button className="btn btn-outline-secondary" type="button" onClick={()=>{setForm({ id:'', name:'', price:'', category:'', offer:false }); setEditing(false)}}>Limpiar</button>
          </div>
        </form>
      </div>
      <div className="col-12 col-lg-7">
        <h2 className="h4">Listado</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Oferta</th><th></th>
              </tr>
            </thead>
            <tbody>
              {list.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>${p.price.toLocaleString('es-CL')}</td>
                  <td>{p.offer? 'Sí':'No'}</td>
                  <td className="text-end">
                    <div className="btn-group">
                      <button className="btn btn-sm btn-outline-primary" onClick={()=>{setForm(p); setEditing(true)}}>Editar</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={()=>{deleteProduct(p.id); refresh()}}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
