import React, { useState, useEffect, useMemo, FormEvent, ChangeEvent, FC } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// Importamos las interfaces correctas y las funciones de la DB
import { ItemCarrito, obtenerCarrito } from '../data/db'; 

// --- 1. Tipos de Carrito y DB ---
// Ya no necesitamos la interfaz CartItem, usamos ItemCarrito de db.ts
// Ya no necesitamos la interfaz DBModule, importamos las funciones directamente

// --- 2. Fallback Seguro y Tipado para Carrito ---

// Fallback seguro tipado para leer carrito usando la función correcta
const obtenerCarritoSeguro = (): ItemCarrito[] => {
  try {
    // Usamos la función obtenerCarrito tipada y asíncrona (si fuera necesario, aquí es síncrona)
    return obtenerCarrito();
  } catch (error) {
      console.error("Error al intentar cargar el carrito:", error);
      return [];
  }
};


const Encabezado: FC = () => { // Header -> Encabezado
  // --- Estados Tipados ---
  const [busqueda, setBusqueda] = useState<string>(''); 
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]); // cart -> carrito, usando ItemCarrito
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  
  // 'nav' (inglés) se traduce a 'navegar' (español)
  const navegar = useNavigate(); 

  // --- 3. Efectos y Lógica ---
  
  useEffect(() => {
    // Al montar el componente, cargamos el carrito
    const c = obtenerCarritoSeguro();
    setCarrito(c);
    
    // NOTE: En un entorno React real, usarías un Context o Zustand para actualizar
    // este estado cuando se modifica el carrito en otro componente.
  }, []);

  // Total CLP: Calcula el total del carrito y lo formatea
  const totalCLP = useMemo<string>(() => {
    const total = carrito.reduce((acumulador, item) => {
      // Usamos las propiedades correctas: 'precio' y 'cantidad'
      const precio = Number(item?.precio) || 0;
      const cantidad = Number(item?.cantidad) || 0;
      return acumulador + precio * cantidad;
    }, 0);
    
    return new Intl.NumberFormat('es-CL', {
      style: 'currency', currency: 'CLP', maximumFractionDigits: 0,
    }).format(total);
  }, [carrito]); // Depende solo de 'carrito'

  // Manejador de la búsqueda
  const manejarBusqueda = (evento: FormEvent<HTMLFormElement>) => { 
    evento.preventDefault();
    const query = busqueda.trim();
    navegar(`/categorias${query ? `?q=${encodeURIComponent(query)}` : ''}`);
    setBusqueda('');
    setMenuVisible(false); // Ocultar el menú después de la búsqueda
  };

  const alternarMenu = () => { // toggleMenu -> alternarMenu
    setMenuVisible(!menuVisible);
  };

  // Verificar si el usuario está autenticado como admin
  const esAdmin = localStorage.getItem('esAdmin') === 'true'; // Variable renombrada a esAdmin
  
  // Tipado del evento de input
  const manejarCambioBusqueda = (evento: ChangeEvent<HTMLInputElement>) => {
    setBusqueda(evento.target.value);
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary sticky-top shadow-lg">
      <div className="container d-flex align-items-center flex-wrap gap-2">
        {/* Marca */}
        <Link to="/" className="brand-title me-3 text-decoration-none p-1">
          <span className="brand-main fs-4 fw-bold text-white">Level-Up</span> 
          <span className="brand-accent fs-4 fw-light text-warning">Gamer</span>
        </Link>

        {/* Menú hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={alternarMenu}
          aria-controls="navbarNav"
          aria-expanded={menuVisible ? 'true' : 'false'}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú y Carrito */} 
        <div className={`collapse navbar-collapse ${menuVisible ? 'show' : ''}`} id="navbarNav">
          <div className="navbar-nav gap-2">
            <NavLink end to="/" className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-warning text-dark' : 'btn-outline-light'}`}>Inicio</NavLink>
            <NavLink to="/categorias" className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-warning text-dark' : 'btn-outline-light'}`}>Categorías</NavLink>
            <NavLink to="/ofertas" className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-warning text-dark' : 'btn-outline-light'}`}>Ofertas</NavLink>

            {/* Mostrar Admin solo si está autenticado como admin */}
            {esAdmin && (
              <NavLink to="/admin" className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-danger text-white' : 'btn-outline-danger'}`}>Admin Panel</NavLink>
            )}
          </div>
        </div>

        {/* Buscador y Login/Carrito (alineados a la derecha) */}
        <div className="d-flex align-items-center ms-lg-auto gap-3 flex-grow-1 flex-lg-grow-0">
          <form className="d-flex align-items-center flex-grow-1" onSubmit={manejarBusqueda} role="search">
            <input
              className="form-control form-control-sm me-2"
              type="search"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={manejarCambioBusqueda}
              style={{ minWidth: '150px' }}
            />
            <button className="btn btn-outline-warning btn-sm d-none d-md-block">Buscar</button>
          </form>
          
          {/* Carrito como logo */}
          <NavLink to="/carrito" className="btn btn-warning d-flex align-items-center p-2">
            <i className="fa fa-shopping-cart fa-lg"></i>
            <span className="ms-2 fw-bold text-dark d-none d-sm-inline-block">{totalCLP}</span>
            <span className="ms-2 fw-bold text-dark d-sm-none">{carrito.length}</span>
          </NavLink>

          {/* Login con ícono de persona */}
          <NavLink to="/login" className="btn btn-outline-light p-2 d-none d-md-block">
            <i className="fa fa-user fa-lg"></i>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Encabezado;
