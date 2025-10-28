import React, { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
// Importamos la interfaz Producto de la capa de datos para asegurar consistencia
import { Producto } from '../data/db'; 

// --- 1. Definición de Tipos ---

// Interfaz para los Props del componente (usa Producto)
interface TarjetaProductoProps {
product?: Producto | null; // El producto puede ser nulo o indefinido
  onAdd?: (product: Producto) => void; // Cambiado a 'onAdd' para mantener la consistencia con el componente
 onView?: () => void;
}

const FALLBACK = 'https://placehold.co/400x300/1C2833/FFFFFF?text=Sin+Imagen';

// Definimos el componente como Functional Component (FC) con sus props tipados
const ProductCard: FC<TarjetaProductoProps> = ({ product, onAdd, onView }) => {
 // Si no hay producto, retornamos null inmediatamente
  if (!product) return null;

 // Destructuramos las propiedades del producto, usando nombres en ESPAÑOL
  const { id, nombre, precio, imagen, categoria, oferta } = product;

// Tipado para el evento onError de la imagen
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
// Usamos e.currentTarget para acceder al elemento img
  (e.currentTarget as HTMLImageElement).src = FALLBACK;
};

// Usamos un botón para 'Ver' si el ID no existe (solo si onView existe)
 const isViewLink = id && onView === undefined;
 
 // Convertimos el precio a number antes de formatear
 const precioFormateado = Number(precio).toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0
    });

 return (
  <div className="card h-100 shadow-sm border-0 bg-dark text-white">
    {/* Marco UNIFORME: 4:3, centrado, sin recorte */}
  <div className="ratio ratio-4x3 product-media overflow-hidden rounded-top" style={{ backgroundColor: '#1e1e1e' }}>
        <img
          src={imagen || FALLBACK} // Usamos 'imagen'
          onError={handleError} 
          loading="lazy"
          alt={nombre} // Usamos 'nombre'
          className="object-fit-cover w-100 h-100"
        />
  </div>

        <div className="card-body d-flex flex-column p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          {categoria && <span className="badge bg-secondary text-uppercase fw-normal">{categoria}</span>}
          {oferta && <span className="badge bg-danger text-uppercase fw-bold">¡Oferta!</span>}
        </div>
    
         <h5 className="card-title text-truncate mb-1">{nombre}</h5>
           {categoria && <p className="card-text text-muted small">{categoria}</p>}
            {/* Usamos la variable formateada */}
          <p className="fs-4 fw-bold text-success mb-3 mt-auto">{precioFormateado}</p>

        <div className="d-flex gap-2">
              {/* Lógica para decidir si es Link o Button */}
           {isViewLink ? (
               <Link to={`/producto/${id}`} className="btn btn-outline-light btn-sm flex-grow-1">Ver Detalle</Link>
            ) : (
  // Si no tiene ID o si onView está definido, usamos el botón.
             <button 
                 className="btn btn-outline-light btn-sm flex-grow-1" 
                     onClick={onView}
                     disabled={!onView && !id} 
             >
                Ver Detalle
             </button>
     )}
   
           <button 
             className="btn btn-warning btn-sm flex-grow-1" 
             onClick={() => onAdd && onAdd(product)}
              disabled={!onAdd} 
           >
          Agregar al Carrito
            </button>
         </div>
       </div>
    </div>
    );
}

export default ProductCard;
