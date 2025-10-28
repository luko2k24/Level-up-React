import { useParams, Link } from 'react-router-dom';
import { obtenerProductoPorId, agregarAlCarrito, type Producto } from '../data/db'; 
import { useState, useEffect } from 'react'; 
import { nanoid } from 'nanoid';


export default function ProductoDetalle() {
  // Extrae el 'id' de los parámetros de la URL. useParams devuelve un objeto de cadenas.
  const { id } = useParams<{ id: string }>();

  // Inicializamos el estado del producto
  const [producto, setProducto] = useState<Producto | undefined>(undefined);

  // Efecto para cargar el producto
  useEffect(() => {
    // CORRECCIÓN: Validamos que 'id' exista antes de llamar a la función.
    if (id) {
      // obtenerProductoPorId devuelve Producto o undefined.
      const p = obtenerProductoPorId(id);
      setProducto(p);
    } else {
      // Si no hay ID, limpiamos el estado
      setProducto(undefined);
    }
  }, [id]);

  // Usamos 'p' como alias para claridad en el JSX, si está cargado
  const p = producto;

  // Manejo del estado: Producto no encontrado
  if (!p) {
    // Si no está definido y el ID existe 
    return (
      <div className="empty-state text-center p-5 bg-dark rounded-3 shadow-lg text-light">
        <h3 className="fw-light">Producto no encontrado.</h3>
        <p className="text-secondary">Asegúrate de que la URL sea correcta.</p>
        <div className="mt-4">
          <Link className="btn btn-warning btn-lg fw-bold" to="/categorias">Volver a la tienda</Link>
        </div>
      </div>
    );
  }

  // Función para manejar la adición al carrito
  const handleAddToCart = (producto: Producto) => {
    agregarAlCarrito(producto);
  };

  return (
    <>
      {/* Navegación (Breadcrumb simple) */}
      <nav className="breadcrumb-gamer mb-2 small text-light">
        <Link to="/categorias" className="link-warning text-decoration-none">Categorías</Link>
        <span className="sep text-warning mx-2">/</span>
        <span className="text-muted">{p.categoria}</span>
      </nav>

      {/* Títulos principales */}
      <h2 className="neon-title text-warning mb-1">{p.nombre}</h2>
      <div className="neon-sub text-muted small mb-4">{p.categoria}</div>

      <div className="row g-4">
        {/* IMAGEN 4:3 */}
        <div className="col-12 col-lg-6">
          <div className="panel p-3 bg-dark rounded-3 shadow-lg">
            <div className="ratio ratio-4x3 product-hero overflow-hidden rounded-3">
              <img src={p.imagen} alt={p.nombre} loading="lazy" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>

        {/* INFO / PRECIO / CTA */}
        <div className="col-12 col-lg-6">
          <div className="panel p-4 bg-dark text-white rounded-3 shadow-lg">
            <div className="d-flex align-items-center gap-2 mb-2">
              {/* Insignias de categoría y oferta */}
              <span className="badge bg-warning text-dark fw-bold">{p.categoria}</span>
              {p.oferta && <span className="badge bg-danger fw-bold">¡Oferta!</span>}
            </div>

            {/* Precio formateado para Chile (CLP) */}
            <h3 className="mb-3 text-warning">${Number(p.precio).toLocaleString('es-CL')}</h3>

            {/* Especificaciones / Listado de información */}
            <ul className="list-unstyled small text-muted mb-4">
              <li>• Garantía 6 meses</li>
              <li>• Despacho a todo Chile</li>
              <li>• Imagen referencial</li>
            </ul>

            {/* Botones de acción */}
            <div className="d-grid gap-2">
              <button
                className="btn btn-warning btn-lg fw-bold"
                onClick={() => handleAddToCart(p)} // Usamos la función tipada
              >
                Agregar al carrito
              </button>
              <Link className="btn btn-outline-light fw-bold" to="/carrito">Ir al carrito</Link>
            </div>
          </div>
        </div>

        {/* DESCRIPCIÓN (placeholder corta) */}
        <div className="col-12">
          <div className="panel p-4 bg-dark text-white rounded-3 shadow-lg">
            <h5 className="mb-3 text-warning border-bottom border-secondary pb-2">Descripción</h5>
            <p className="text-muted mb-0">
              **{p.nombre}** de la categoría **{p.categoria}**. Producto de demostración para la evaluación:
              catálogo, carrito y checkout con look gamer y Bootstrap.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
