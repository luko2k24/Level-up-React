import React, { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
let safeGetCart = () => {
  try {
    const mod = require('../data/db.js')
    if (mod.getCart) return mod.getCart()
  } catch (_) {}
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]')
  } catch (_) {
    return []
  }
}

export default function Header() {
  const [q, setQ] = useState('')
  const [cart, setCart] = useState([])
  const nav = useNavigate()

  useEffect(() => {
    const c = safeGetCart()
    setCart(Array.isArray(c) ? c : [])
  }, [])

  const totalCLP = useMemo(() => {
    const total = cart.reduce((acc, it) => {
      const price = Number(it?.price) || 0
      const qty = Number(it?.qty) || 1
      return acc + price * qty
    }, 0)
    return new Intl.NumberFormat('es-CL', {
      style: 'currency', currency: 'CLP', maximumFractionDigits: 0
    }).format(total)
  }, [cart])

  const onSearch = (e) => {
    e.preventDefault()
    const query = q.trim()
    nav(`/categorias${query ? `?q=${encodeURIComponent(query)}` : ''}`)
    setQ('')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-glass border-bottom border-primary-subtle sticky-top">
      <div className="container d-flex align-items-center flex-wrap gap-2">
        {/* Brand */}
        <Link to="/" className="brand-title me-2 text-decoration-none">
          <span className="brand-main">Level-Up</span> <span className="brand-accent">Gamer</span>
        </Link>

        {/* Menú como botones */}
        <div className="d-flex align-items-center flex-wrap ms-auto order-2 order-lg-1">
          <NavLink end to="/" className={({isActive}) => `btn btn-outline-light btn-sm me-2 ${isActive ? 'active' : ''}`}>Inicio</NavLink>
          <NavLink to="/categorias" className={({isActive}) => `btn btn-outline-light btn-sm me-2 ${isActive ? 'active' : ''}`}>Categorías</NavLink>
          <NavLink to="/ofertas" className={({isActive}) => `btn btn-outline-light btn-sm me-2 ${isActive ? 'active' : ''}`}>Ofertas</NavLink>
          <NavLink to="/admin" className={({isActive}) => `btn btn-outline-light btn-sm me-2 ${isActive ? 'active' : ''}`}>Admin</NavLink>
        </div>

        {/* Buscador */}
        <form className="d-flex align-items-center order-3 ms-lg-3" onSubmit={onSearch} role="search">
          <input
            className="form-control search-compact me-2"
            type="search"
            placeholder="Buscar"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="btn btn-outline-light btn-sm">Buscar</button>
        </form>

        {/* Carrito + Login */}
        <div className="ms-lg-3 d-flex align-items-center gap-2 order-4">
          <NavLink to="/carrito" className="btn btn-light">
            Carrito <span className="badge bg-dark ms-2">{totalCLP}</span>
          </NavLink>

          {/* Botón Login “vacío” por ahora */}
          <NavLink to="/login" className="btn btn-outline-light">
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  )
}