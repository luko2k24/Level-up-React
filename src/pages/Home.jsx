import React, { useEffect, useState } from 'react'
import { getProducts, initDB } from '../data/db.js'
import ProductCard from '../components/ProductCard.jsx'
import useCartState from '../hooks/useCart.js'

export default function Home() {
  const [products, setProducts] = useState([])
  const { add } = useCartState()

  useEffect(() => {
    initDB()
    setProducts(getProducts() ?? [])
  }, [])

  const highlights = [
    {
      id: 'hl1',
      title: 'Periféricos',
      icon: '🎮',
      subtitle: 'Teclados, mouse y más',
    },
    { id: 'hl2', title: 'Audio', icon: '🎧', subtitle: 'Headsets y micrófonos' },
    { id: 'hl3', title: 'Monitores', icon: '🖥️', subtitle: '144Hz / 240Hz' },
    { id: 'hl4', title: 'Ofertas', icon: '🔥', subtitle: 'Descuentos activos' },
  ]

  const noticias = [
    {
      id: 'n1',
      titulo: 'Silksong',
      resumen: 'Rumores y hype: la comunidad prepara el lanzamiento.',
      img: '/img/Imagenes/640px-Silksong_cover.png',
      link: 'https://store.steampowered.com/app/1030300/Hollow_Knight_Silksong/'
    },
    {
      id: 'n2',
      titulo: 'VALORANT Champions',
      resumen: 'Próxima sede confirmada y meta en movimiento.',
      img: '/img/Imagenes/Valo.png',
      link: 'https://playvalorant.com/'
    }
  ]

  return (
    <div className="container py-4">
      {/* HERO */}
      <section className="mb-4 p-4 p-md-5 rounded-4 hero-surface border border-1 border-primary-subtle position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 neon-grid" />
        <div className="position-relative">
          <h1 className="fw-bold mb-2">Level-Up Gamer</h1>
          <p className="text-secondary mb-4 m-0">
            Arma tu setup con nuestra selección de hardware y periféricos.
          </p>

          <div className="row g-3 mt-1">
            {highlights.map(h => (
              <div className="col-6 col-md-3" key={h.id}>
                <div className="card card-glow text-center h-100">
                  <div className="card-body py-3">
                    <div className="display-6">{h.icon}</div>
                    <div className="fw-semibold mt-1">{h.title}</div>
                    <small className="text-secondary">{h.subtitle}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Noticias */}
      <section className="mb-5">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h2 className="h4 m-0">Noticias</h2>
          <span className="badge bg-accent">Nuevo</span>
        </div>
        <div className="row g-4">
          {noticias.map(n => (
            <div className="col-12 col-lg-6" key={n.id}>
              <article className="card card-glow h-100">
                <div className="ratio ratio-21x9">
                  <img src={n.img} alt={n.titulo} className="rounded-top object-cover" />
                </div>
                <div className="card-body">
                  <h5 className="card-title mb-1 text-accent">{n.titulo}</h5>
                  <p className="text-secondary">{n.resumen}</p>
                  <a className="btn btn-primary" href={n.link} target="_blank" rel="noreferrer">
                    Ver más
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      {/* Productos */}
      <section>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h2 className="h4 m-0">Tienda</h2>
          <div className="small text-secondary">{products.length} items</div>
        </div>

        <div className="row g-3">
          {products.map(p => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
              <ProductCard product={p} onAdd={add} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
