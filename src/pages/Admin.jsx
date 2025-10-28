import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../data/db.js';
import '../styles/admin.css';
const CLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
});

const CATEGORIAS = ['Periféricos', 'Audio', 'Monitores', 'Muebles', 'Almacenamiento', 'Accesorios'];

export default function AdminPanel() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const view = (params.get('view') || 'home').toLowerCase();
  const mode = (params.get('mode') || 'open').toLowerCase();

  const setView = (v, m = 'open') => {
    const next = new URLSearchParams(location.search);
    next.set('view', v);
    next.set('mode', m);
    navigate({ search: `?${next.toString()}` }, { replace: false });
  };

  const stats = useMemo(
    () => ({ compras: 1234, productos: 400, usuarios: 892, pendientes: 17 }),
    []
  );

  const [list, setList] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', price: '', category: '', offer: false });
  const [editing, setEditing] = useState(false);
  const [err, setErr] = useState('');

  const orderedList = useMemo(
    () => [...list].sort((a, b) => String(a.id).localeCompare(String(b.id))),
    [list]
  );

  const refresh = () => {
    try {
      const data = getProducts() || [];
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('getProducts() falló:', e);
      setList([]);
    }
  };

  useEffect(() => { refresh() }, []);

  const onChange = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const validate = () => {
    if (!form.name.trim()) return 'El nombre es obligatorio';
    const price = Number(form.price);
    if (!Number.isFinite(price) || price <= 0) return 'El precio debe ser un número mayor a 0';
    if (!form.category.trim()) return 'Selecciona una categoría';
    return '';
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setErr(msg);
      return;
    }
    setErr('');

    const payload = {
      id: form.id?.trim(),
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category.trim(),
      offer: Boolean(form.offer),
    };

    try {
      if (editing) {
        if (!payload.id) {
          setErr('Falta el ID para editar');
          return;
        }
        updateProduct(payload.id, payload);
      } else {
        if (!payload.id) payload.id = `p${Date.now()}`;
        if (list.some(p => String(p.id) === String(payload.id))) {
          setErr(`Ya existe un producto con ID "${payload.id}"`);
          return;
        }
        createProduct(payload);
      }

      setForm({ id: '', name: '', price: '', category: '', offer: false });
      setEditing(false);
      refresh();
    } catch (e2) {
      console.error('onSubmit error:', e2);
      setErr('No se pudo guardar. Revisa la consola.');
    }
  };

  const onEdit = (p) => {
    setForm({
      id: p.id ?? '',
      name: p.name ?? '',
      price: p.price ?? '',
      category: p.category ?? '',
      offer: !!p.offer
    });
    setEditing(true);
    setErr('');
  };

  const onDelete = (id) => {
    if (!id) return;
    if (!confirm(`¿Eliminar el producto ${id}? Esta acción no se puede deshacer.`)) return;
    try {
      deleteProduct(id);
      refresh();
    } catch (e) {
      console.error('deleteProduct error:', e);
      setErr('No se pudo eliminar el producto.');
    }
  };

  const onClear = () => {
    setForm({ id: '', name: '', price: '', category: '', offer: false });
    setEditing(false);
    setErr('');
  };

  const kpiBox = (title, value, color) => (
    <div className="col-12 col-md-4 mb-3">
      <div
        className="card shadow-sm h-100"
        style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)', background: '#0f0f0f' }}
      >
        <div
          className="p-3"
          style={{
            background: color,
            color: '#000',
            fontWeight: 700,
            letterSpacing: .2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span>{title}</span>
          <span style={{ opacity: .8, fontSize: 12 }}>Dashboard</span>
        </div>
        <div className="p-4 d-flex align-items-end justify-content-between">
          <div style={{ fontSize: 42, fontWeight: 800, lineHeight: 1, color: '#fff' }}>{value}</div>
          <div style={{ color: 'rgba(255,255,255,.75)' }} className="small">Última act.</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0" style={{ color: '#fff' }}>Panel de administración</h2>
      </div>

      <div className="row">
        {kpiBox('Compras', stats.compras, '#30A4FF')}
        {kpiBox('Productos', stats.productos, '#47D16E')}
        {kpiBox('Usuarios', stats.usuarios, '#FFC44D')}
      </div>

      <div className="row">
        <div className="col-12 col-md-6">
          <div className="form-container">
            <h2>Gestión de productos</h2>
            {err && <div className="alert">{err}</div>}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>ID</label>
                <input
                  value={form.id}
                  onChange={e => onChange('id', e.target.value)}
                  disabled={editing}
                  placeholder="(auto si lo dejas vacío)"
                />
              </div>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  value={form.name}
                  onChange={e => onChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={e => onChange('price', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <select
                  value={form.category}
                  onChange={e => onChange('category', e.target.value)}
                  required
                >
                  <option value="">Selecciona</option>
                  {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  checked={form.offer}
                  onChange={e => onChange('offer', e.target.checked)}
                />
                <label>En oferta</label>
              </div>
              <div className="form-actions">
                <button type="submit">{editing ? 'Guardar cambios' : 'Crear'}</button>
                <button type="button" onClick={onClear}>Limpiar</button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="products-list">
            <h2>Listado de productos</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Oferta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orderedList.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>{CLP.format(p.price)}</td>
                    <td>{p.offer ? 'Sí' : 'No'}</td>
                    <td>
                      <button onClick={() => onEdit(p)}>Editar</button>
                      <button onClick={() => onDelete(p.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
                {orderedList.length === 0 && (
                  <tr>
                    <td colSpan="6">No hay productos. Crea el primero.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
