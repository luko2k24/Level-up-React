import React, { useState, ChangeEvent, FormEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FormularioIngreso.css';
import { NavLink } from 'react-router-dom';

// Se define el componente como un Functional Component (FC)
const FormularioIngreso: FC = () => {
  // Tipamos los estados. Aunque TS puede inferir 'string', es buena práctica ser explícito.
  const [correo, setCorreo] = useState<string>('');
  const [contraseña, setContraseña] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  // 'navigate' (inglés) se traduce a 'navegar' (español)
  const navegar = useNavigate();

  // Tipamos el evento del formulario: FormEvent
  // También traducimos 'e' a 'evento'
  const manejarEnvio = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    // Validación de campos vacíos
    if (correo === '' || contraseña === '') {
      setError('Ambos campos son requeridos');
      return;
    }

    // Simulación de autenticación
    if (correo === 'admin@duocuc.cl' && contraseña === '1234') {
      alert('Ingreso exitoso');
      setError('');
      // Usamos la variable en español 'navegar'
      navegar('../Admin'); // Redirige a la página principal
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
            // Tipamos el evento de input: ChangeEvent<HTMLInputElement>
            // También traducimos 'e' a 'evento'
            onChange={(evento: ChangeEvent<HTMLInputElement>) => setCorreo(evento.target.value)}
            placeholder="Ingresa tu correo electrónico"
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={contraseña}
            onChange={(evento: ChangeEvent<HTMLInputElement>) => setContraseña(evento.target.value)}
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
        ¿No tienes cuenta? <NavLink to="/register">Regístrate</NavLink>
      </p>
    </div>
  );
};

export default FormularioIngreso;