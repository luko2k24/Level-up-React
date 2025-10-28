import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { obtenerProductos, obtenerCategorias, agregarAlCarrito, Producto } from '../data/db'; 
import ProductCard from '../components/ProductCard'; 

// Tipos para las opciones de ordenación
type OpcionOrdenacion = 'relevancia' | 'precio_asc' | 'precio_desc' | 'nombre';

export default function Categorias() {

  // Hooks y Contexto
  const navegar = useNavigate();
  const [parametrosBusqueda] = useSearchParams();
  
  // Estado local
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todas');
  const [orden, setOrden] = useState<OpcionOrdenacion>('relevancia');

  // Obtención de datos
  const consultaBusqueda: string = (parametrosBusqueda.get('q') || '').toLowerCase();
  const categoriasDisponibles: string[] = obtenerCategorias();
  const todasLasCategorias: string[] = ['Todas', ...categoriasDisponibles];
  const listaProductos: Producto[] = obtenerProductos();

  // --- 1. Conteo de Productos por Categoría ---
  const conteos: { [key: string]: number } = useMemo(() => {
    const mapaConteos: { [key: string]: number } = {};
    categoriasDisponibles.forEach(c => {
      mapaConteos[c] = listaProductos.filter(p => p.categoria === c).length;
    });
    return mapaConteos;
  }, [listaProductos, categoriasDisponibles]);

  // --- 2. Filtrado de Productos (por categoría y búsqueda) ---
  const productosFiltrados: Producto[] = useMemo(() => {
    let arr: Producto[] = 
      categoriaSeleccionada === 'Todas'
        ? listaProductos
        : listaProductos.filter(p => p.categoria === categoriaSeleccionada);
    
    // Filtrar por consulta de búsqueda
    if (consultaBusqueda) {
      arr = arr.filter(p => p.nombre.toLowerCase().includes(consultaBusqueda));
    }
    return arr;
  }, [categoriaSeleccionada, consultaBusqueda, listaProductos]);

  // --- 3. Ordenación de Productos ---
  const productosOrdenados: Producto[] = useMemo(() => {
    const arr = [...productosFiltrados];
    switch (orden) {
      case 'precio_asc':   arr.sort((a, b) => a.precio - b.precio); break;
      case 'precio_desc': arr.sort((a, b) => b.precio - a.precio); break;
      case 'nombre':      arr.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
      default: break; // 'relevancia' no requiere ordenación extra
    }
    return arr;
  }, [productosFiltrados, orden]);

  // --- Textos de la Interfaz ---
  const totalResultados: number = productosOrdenados.length;
  const textoTotal: string = totalResultados === 1 ? '1 resultado' : `${totalResultados} resultados`;
  const textoBusqueda: string = consultaBusqueda ? ` para “${parametrosBusqueda.get('q')}”` : '';
  const textoCategoria: string = categoriaSeleccionada !== 'Todas' ? ` en ${categoriaSeleccionada}` : '';


  // --- Manejadores de Eventos ---
  const manejarAgregarAlCarrito = (producto: Producto): void => {
    agregarAlCarrito(producto); // Asumo que db.ts tiene la función 'agregarAlCarrito'
  };

  const manejarVerDetalle = (id: string): void => {
    navegar(`/producto/${id}`);
  };

  return (
    <>
      <h2 className="neon-title">Catálogo de Productos</h2>
      <div className="neon-sub">
        {textoTotal}{textoBusqueda}{textoCategoria}
      </div>

      {/* Barra de Herramientas: Píldoras de Categoría + Ordenación */}
      <div className="cat-toolbar d-flex flex-wrap gap-2 align-items-center mb-4 p-3 rounded-3 bg-dark shadow-sm">
        {/* Píldoras de Categoría */}
        <div className="d-flex flex-wrap gap-2">
          {todasLasCategorias.map(c => {
            const activo: boolean = c === categoriaSeleccionada;
            const conteo: number = c === 'Todas' ? listaProductos.length : (conteos[c] || 0);
            return (
              <button
                key={c}
                className={`pill ${activo ? 'active' : ''}`}
                onClick={() => setCategoriaSeleccionada(c)}
                type="button"
              >
                {c}
                <span className="count">{conteo}</span>
              </button>
            );
          })}
        </div>

        {/* Dropdown de Ordenación */}
        <div className="ms-auto d-flex align-items-center gap-2">
          <label className="text-muted small text-white-50">Ordenar por:</label>
          <select
            className="form-select form-select-sm sort-select bg-secondary text-white border-0"
            value={orden}
            onChange={e => setOrden(e.target.value as OpcionOrdenacion)}
          >
            <option value="relevancia">Relevancia</option>
            <option value="precio_asc">Precio (Menor a Mayor)</option>
            <option value="precio_desc">Precio (Mayor a Menor)</option>
            <option value="nombre">Nombre (A–Z)</option>
          </select>
        </div>
      </div>

      {/* Grid de Productos */}
      {productosOrdenados.length === 0 ? (
        <div className="empty-state bg-dark p-5 rounded-3 shadow-lg text-white">
          <div style={{fontSize: 32, marginBottom: 10}}>😔</div>
          No encontramos productos{textoBusqueda}. 
          Intenta ajustar tus filtros o búsqueda.
        </div>
      ) : (
        <div className="panel">
          <div className="row g-3">
            {productosOrdenados.map((p: Producto) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
                <ProductCard
                  product={p}
                  onAdd={() => manejarAgregarAlCarrito(p)}
                  onView={() => manejarVerDetalle(p.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
