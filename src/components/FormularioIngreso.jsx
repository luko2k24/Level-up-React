import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../styles/FormularioIngreso.css';
import { NavLink } from 'react-router-dom';
const FormularioIngreso = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Inicializar useNavigate

  const manejarEnvio = (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (correo === '' || contraseña === '') {
      setError('Ambos campos son requeridos');
      return;
    }

    // Simulación de autenticación (solo para demostración)
    if (correo === 'admin@duocuc.cl' && contraseña === '1234') {
      alert('Ingreso exitoso');
      setError('');
      // Redirigir a la página de inicio o dashboard
      navigate('../Admin'); // Redirige a la página principal
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="formulario-ingreso">
      <h2>Ingreso</h2>
      <form onSubmit={manejarEnvio}>
        <div>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
      <p className="informacion-descuento">
        Si tu correo termina en <b>@duocuc.cl</b> obtienes 20% de descuento de por vida.
      </p>
      <p>
        ¿No tienes cuenta? <NavLink to="/register">Regístrate</NavLink>  {/* Ruta correcta a la página de registro */}
      </p>
    </div>
  );
};

export default FormularioIngreso;
