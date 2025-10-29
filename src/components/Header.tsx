import React, { useState, useEffect, useMemo, FormEvent, ChangeEvent, FC } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ItemCarrito, obtenerCarrito } from '../data/db'; 

const obtenerCarritoSeguro = (): ItemCarrito[] => {
  try {
    return obtenerCarrito();
  } catch (error) {
    console.error("Error al intentar cargar el carrito:", error);
    return [];
  }
};

const Encabezado: FC = () => {
  const [busqueda, setBusqueda] = useState<string>(''); 
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [menuVisible, setMenuVisible] = useState<boolean>(false); 
  const navegar = useNavigate(); 

  useEffect(() => {
    const c = obtenerCarritoSeguro();
    setCarrito(c);
  }, []);

  const totalCLP = useMemo<string>(() => {
    const total = carrito.reduce((acumulador, item) => {
      const precio = Number(item?.precio) || 0;
      const cantidad = Number(item?.cantidad) || 0;
      return acumulador + precio * cantidad;
    }, 0);
    
    return new Intl.NumberFormat('es-CL', {
      style: 'currency', currency: 'CLP', maximumFractionDigits: 0,
    }).format(total);
  }, [carrito]); 

  const manejarBusqueda = (evento: FormEvent<HTMLFormElement>) => { 
    evento.preventDefault();
    const query = busqueda.trim();
    navegar(`/categorias${query ? `?q=${encodeURIComponent(query)}` : ''}`);
    setBusqueda('');
    setMenuVisible(false); 
  };

  const alternarMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const esAdmin = localStorage.getItem('esAdmin') === 'true'; 
  
  const manejarCambioBusqueda = (evento: ChangeEvent<HTMLInputElement>) => {
    setBusqueda(evento.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary sticky-top shadow-lg">
      <div className="container d-flex align-items-center flex-wrap gap-2">
        {/* Marca */}
        <Link to="/" className="brand-title me-3 text-decoration-none p-1">
          <span className="brand-main fs-4 fw-bold text-white">Level-Up</span> 
          <span className="brand-accent fs-4 fw-light text-success">Gamer</span> {/* Usando verde en lugar de amarillo */}
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
            <NavLink end to="/" className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-outline-success' : 'btn-outline-light'}`}>Inicio</NavLink>
            <NavLink to="/categorias" className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-outline-success' : 'btn-outline-light'}`}>Categorías</NavLink>
            <NavLink to="/ofertas" className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-outline-success' : 'btn-outline-light'}`}>Ofertas</NavLink>

            {/* Mostrar Admin solo si está autenticado como admin */}
            {esAdmin && (
              <NavLink to="/admin" className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-outline-danger' : 'btn-outline-light'}`}>Admin Panel</NavLink>
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
            <button className="btn btn-outline-success btn-sm d-none d-md-block">Buscar</button> {/* Verde para buscar */}
          </form>
          
          {/* Carrito con ícono (emoji) */}
          <NavLink to="/carrito" className="btn btn-outline-success d-flex align-items-center p-2">
            <span role="img" aria-label="carrito" className="fa-lg">🛒</span> {/* Emoji del carrito */}
            <span className="ms-2 fw-bold text-dark d-none d-sm-inline-block">{totalCLP}</span>
            <span className="ms-2 fw-bold text-dark d-sm-none">{carrito.length}</span>
          </NavLink>

          {/* Login con ícono de persona (emoji) */}
          <NavLink to="/login" className="btn btn-outline-light p-2 d-none d-md-block">
            <span role="img" aria-label="login" className="fa-lg">👤</span> {/* Emoji de persona */}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Encabezado;
