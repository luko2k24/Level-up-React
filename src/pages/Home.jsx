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

  // Noticias estilo portada
  const noticias = [
    {
      id: 'n1',
      titulo: 'Silk Song',
      resumen: 'Silk Song rompe la plataforma de Steam con casi 600 mil usuarios disponibles',
      img: 'https://images7.alphacoders.com/131/1317721.jpg', // puedes cambiarla por una local
      link: 'https://store.steampowered.com/app/1030300/Hollow_Knight_Silksong/'
    },
    {
      id: 'n2',
      titulo: 'VALORANT CHAMPIONS 2026',
      resumen: '¡El Champions 2026 va a Shanghái!',
      img: 'https://images.alphacoders.com/134/1346305.jpg',
      link: 'https://playvalorant.com/'
    }
  ]

  return (
    <div className="container py-4">

      {/* HERO (bienvenida + logo) */}
      <section className="text-center mb-4">
        <h1 className="fw-bold">¡Bienvenido a nuestra tienda gamer!</h1>
        <img
          src="public/img/inicio/Level-up.png"  // si tienes un logo en public/img/logo.png, cámbialo por "/img/logo.png"
          alt="Level-Up Gamer"
          width={120}
          height={120}
          className="d-block mx-auto my-3 rounded"
          style={{ background: '#0b0c0e', padding: 12 }}
        />
        <p className="text-secondary m-0">
          Explora consolas, periféricos y más para mejorar tu experiencia de juego.
        </p>
      </section>

      {/* NOTICIAS IMPORTANTES */}
      <section className="mb-4">
        <h2 className="h4 text-center mb-3">Noticias Importantes</h2>
        <div className="row g-4 justify-content-center">
          {noticias.map(n => (
            <div className="col-12 col-lg-6" key={n.id}>
              <div
                className="card h-100 shadow-sm"
                style={{ background: '#1c1e22', border: '1px solid #1E90FF' }}
              >
                <div className="ratio ratio-21x9">
                  <img
                    src={n.img}
                    alt={n.titulo}
                    className="card-img-top"
                    style={{ objectFit: 'cover', borderBottom: '1px solid #1E90FF' }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title mb-1" style={{ color: '#39FF14' }}>
                    {n.titulo}
                  </h5>
                  <p className="card-text text-light-emphasis">{n.resumen}</p>
                  <a
                    href={n.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ background: '#1E90FF', borderColor: '#1E90FF' }}
                  >
                    Ver más
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIENDA (tu grilla original) */}
      <section className="mb-2">
        <h2 className="h4 mb-3">Tienda</h2>
        <div className="row g-3">
          {products.map(p => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
              <ProductCard product={p} onAdd={add} />
            </div>
          ))}
        </div>
      </section>

      {/* Franja simple como en tu captura (opcional) */}
      <div
        className="mt-4"
        style={{ height: 12, background: '#1E90FF', borderRadius: 8 }}
      />
    </div>
  )
}
