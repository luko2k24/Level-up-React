import React from 'react'

export default function Home() {
  // === DATOS: Noticias recientes ===
  const noticias = [
    {
      id: 'worlds-2025',
      titulo: 'Worlds 2025: fechas y sede en China',
      resumen:
        'Riot adelantó calendario y ciudades sede del Mundial de League of Legends 2025. La definición promete estadio lleno y nuevo formato.',
      img: 'https://images.contentstack.io/v3/assets/bltad9188aa9a70543a/blt7f294c3f7e1a2c6f/66fbf77c7b9a538a9767a66d/LOL_Worlds2025_KeyArt.jpg',
      link: '/img/inicio/Worlds.jpg',
      etiqueta: 'Nuevo'
    },
    {
      id: 'switch2',
      titulo: 'Adios al mercado del videjuego CS2',
      resumen:
        'El mercado de skins de CS2 ha bajado de valor debido a una actualización de Valve que permitió revertir los intercambios durante 7 días.',
      img: '/img/inicio/CS2.jpg',
      link: 'https://azat.tv/en/valve-cs2-knife-trade-up-update-skin-market-crash/#:~:text=Immediate%20Market%20Impact:%20Billions%20Wiped,the%20CS2%20economy%20was%20shattered',
      etiqueta: 'Actualizado'
    }
  ]

  return (
    <div className="container py-4">

      {/* ======= Cabecera Noticias ======= */}
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h2 className="h4 m-0 text-brand">Noticias</h2>
        <span className="badge bg-accent">En tiempo real</span>
      </div>

      {/* ======= Trending / Atajos ======= */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        <span className="badge rounded-pill bg-success-subtle text-success-emphasis border border-success-subtle">#Worlds2025</span>
        <span className="badge rounded-pill bg-success-subtle text-success-emphasis border border-success-subtle">#Switch2</span>
        <span className="badge rounded-pill bg-success-subtle text-success-emphasis border border-success-subtle">#eSports</span>
        <span className="badge rounded-pill bg-success-subtle text-success-emphasis border border-success-subtle">#NextGen</span>
      </div>

      {/* ======= Widgets ligeros para “llenar” sin recargar ======= */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card card-glow h-100">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <div className="text-soft small">Torneos activos</div>
                <div className="fs-5 fw-semibold">18</div>
              </div>
              <i className="bi bi-trophy fs-3 text-accent"></i>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card card-glow h-100">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <div className="text-soft small">Lanzamientos del mes</div>
                <div className="fs-5 fw-semibold">9</div>
              </div>
              <i className="bi bi-controller fs-3 text-accent"></i>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card card-glow h-100">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <div className="text-soft small">Ofertas destacadas</div>
                <div className="fs-5 fw-semibold">12</div>
              </div>
              <i className="bi bi-lightning-charge fs-3 text-accent"></i>
            </div>
          </div>
        </div>
      </div>

      {/* ======= Tarjetas de Noticias ======= */}
      <section>
        <div className="row g-4">
          {noticias.map(n => (
            <div className="col-12 col-lg-6" key={n.id}>
              <article className="card card-glow h-100">
                <div className="ratio ratio-21x9">
                  <img src={n.img} alt={n.titulo} className="rounded-top object-cover" />
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h5 className="card-title mb-0 text-brand">{n.titulo}</h5>
                    {n.etiqueta && (
                      <span className="badge bg-success-subtle text-success-emphasis border border-success-subtle">
                        {n.etiqueta}
                      </span>
                    )}
                  </div>
                  <p className="text-soft">{n.resumen}</p>
                  <a className="btn btn-primary" href={n.link} target="_blank" rel="noreferrer">
                    Ver más
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
