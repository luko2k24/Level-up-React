import React, { JSX } from 'react'
import { Link, useLocation } from 'react-router-dom' 

// 1. Define la interfaz para el estado que se pasa a través de la ruta.
interface EstadoRutaCompra {
  monto: number;
}

// El componente se tipa para devolver un elemento JSX.
export default function CompraExitosa(): JSX.Element {
  // 2. Usamos useLocation. En react-router-dom v6, el estado (state) es de tipo 'unknown'.
  // Para un tipado más robusto que satisfaga a la v6, podemos usar el hook de forma más simple.
  const loc = useLocation();
  
  // 3. Tipamos de forma segura. Accedemos a loc.state y lo asertamos como el tipo de estado.
  // Usamos 'as EstadoRutaCompra' después de verificar que existe, o un objeto vacío.
  const estado = loc.state as EstadoRutaCompra | null;

  // 4. Extraemos el monto de forma segura, usando el encadenamiento opcional y
  // proporcionando 0 como valor predeterminado si el estado o el monto no existen.
  // La aserción 'as EstadoRutaCompra | null' resuelve la mayoría de los errores de useLocation.
  const monto = estado?.monto ?? 0;

  return (
    <div className="text-center">
      <h1>¡Compra realizada con éxito! 🎉</h1>
      {/* Usamos toLocaleString para formatear el número como moneda chilena (es-CL) */}
      <p className="lead">Monto pagado: ${monto.toLocaleString('es-CL')}</p>
      <Link to="/" className="btn btn-primary mt-3">Volver a la tienda</Link>
    </div>
  )
}