// src/components/Header.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { getCart, cartTotal } from '../data/db'

export default function Header(){
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const total = useMemo(() => cartTotal(), [getCart()]) // refresca al navegar
  const location = useLocation()

  const onSubmit = (e) => {
    e.preventDefault()
    const query = q.trim()
    // enviamos a /categorias con ?q=busqueda
    nav(`/categorias${query ? `?q=${encodeURIComponent(query)}` : ''}`)
    setQ('')
  }

  return (
    <nav className="navbar navbar-dark" style={{background: 'var(--surface)'}}>
      <div className="container">
        {/* Marca */}
        <Link className="navbar-brand" to="/">Level-Up Gamer</Link>

        {/* Buscador centrado (similar al mock) */}
        <form className="d-none d-md-flex align-items-center gap-2 flex-grow-1 mx-3" onSubmit={onSubmit}>
          <input
            className="form-control"
            placeholder="Buscar"
            value={q}
            onChange={(e)=>setQ(e.target.value)}
          />
          <button className="btn btn-outline-light">Buscar</button>
        </form>

        {/* Navegación derecha */}
        <div className="navbar-nav flex-row gap-3 align-items-center">
          <Link className={`nav-link ${location.pathname.startsWith('/categorias')?'active':''}`} to="/categorias">Categorías</Link>
          <Link className={`nav-link ${location.pathname.startsWith('/ofertas')?'active':''}`} to="/ofertas">Ofertas</Link>

          {/* Carrito con badge de total $ */}
          <Link className={`nav-link position-relative ${location.pathname.startsWith('/carrito')?'active':''}`} to="/carrito">
            Carrito
            <span className="badge rounded-pill ms-2" style={{background:'var(--success)'}}>
              ${total.toLocaleString('es-CL')}
            </span>
          </Link>

          <Link className={`nav-link ${location.pathname.startsWith('/admin')?'active':''}`} to="/admin">Admin</Link>
        </div>
      </div>
    </nav>
  )
}
