import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getProducts, getCategories, addToCart } from '../data/db'
import ProductCard from '../components/ProductCard'

export default function Categorias() {
  const nav = useNavigate()
  const [params] = useSearchParams()
  const q = (params.get('q') || '').toLowerCase()

  const categories = getCategories()
  const allCats = ['Todas', ...categories]
  const [cat, setCat] = useState('Todas')
  const [sort, setSort] = useState('relevance')

  const list = getProducts()

  const counts = useMemo(() => {
    const m = {}
    categories.forEach(c => { m[c] = list.filter(p => p.category === c).length })
    return m
  }, [list, categories])

  const filtered = useMemo(() => {
    let arr = (cat === 'Todas') ? list : list.filter(p => p.category === cat)
    if (q) arr = arr.filter(p => p.name.toLowerCase().includes(q))
    return arr
  }, [cat, q, list])

  const data = useMemo(() => {
    const arr = [...filtered]
    switch (sort) {
      case 'price_asc':  arr.sort((a,b)=>a.price-b.price); break
      case 'price_desc': arr.sort((a,b)=>b.price-a.price); break
      case 'name':       arr.sort((a,b)=>a.name.localeCompare(b.name)); break
      default: break
    }
    return arr
  }, [filtered, sort])

  const totalText = data.length === 1 ? '1 resultado' : `${data.length} resultados`
  const qText = q ? ` para “${params.get('q')}”` : ''

  return (
    <>
      <h2 className="neon-title">Categorías</h2>
      <div className="neon-sub">
        {totalText}{qText}{cat !== 'Todas' ? ` en ${cat}` : ''}
      </div>

      {/* Toolbar: pills + orden */}
      <div className="cat-toolbar d-flex flex-wrap gap-2 align-items-center mb-3">
        <div className="d-flex flex-wrap gap-2">
          {allCats.map(c => {
            const active = c === cat
            const count = c === 'Todas' ? list.length : (counts[c] || 0)
            return (
              <button
                key={c}
                className={`pill ${active ? 'active' : ''}`}
                onClick={() => setCat(c)}
                type="button"
              >
                {c}
                <span className="count">{count}</span>
              </button>
            )
          })}
        </div>

        <div className="ms-auto d-flex align-items-center gap-2">
          <label className="text-muted small">Ordenar:</label>
          <select
            className="form-select form-select-sm sort-select"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="relevance">Relevancia</option>
            <option value="price_asc">Precio (menor a mayor)</option>
            <option value="price_desc">Precio (mayor a menor)</option>
            <option value="name">Nombre (A–Z)</option>
          </select>
        </div>
      </div>

      {/* Grid dentro de panel */}
      {data.length === 0 ? (
        <div className="empty-state">
          <div style={{fontSize: 28, marginBottom: 8}}>🔎</div>
          No encontramos productos{q ? ` para “${params.get('q')}”` : ''}.
        </div>
      ) : (
        <div className="panel">
          <div className="row g-3">
            {data.map(p => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
                <ProductCard
                  product={p}
                  onAdd={() => addToCart(p)}
                  onView={() => nav(`/producto/${p.id}`)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
