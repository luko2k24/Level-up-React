// src/components/FormularioRegistro.tsx
import React, { useState, ChangeEvent, FormEvent, FC } from 'react';
import '../styles/FormularioRegistro.css';

const FormularioRegistro: FC = () => {
  // --- Estados Tipados ---
  // Todos los inputs de texto y select devuelven 'string'
  const [nombre, setNombre] = useState<string>('');
  
  // 'edad' se recibe como string desde el <input type="number">
  // Lo manejaremos como string y lo convertiremos a número solo en la validación
  const [edad, setEdad] = useState<string>(''); 
  
  const [correo, setCorreo] = useState<string>('');
  const [contraseña, setContraseña] = useState<string>('');
  const [confirmarContraseña, setConfirmarContraseña] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [comuna, setComuna] = useState<string>('');
  
  // Estados para mensajes
  const [error, setError] = useState<string>('');
  const [exito, setExito] = useState<string>('');
  const [descuento, setDescuento] = useState<string>('');

  // --- Manejador del Formulario ---
  // Tipamos el evento del formulario
  const manejarEnvio = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    // Validación de campos vacíos
    if (!nombre || !edad || !correo || !contraseña || !confirmarContraseña || !region || !comuna) {
      setError('Todos los campos son requeridos');
      setExito('');
      return;
    }

    // Validación de contraseñas
    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden');
      setExito('');
      return;
    }

    // Validación de mayor de edad (convertimos 'edad' a número)
    const edadNumero = parseInt(edad, 10);
    if (edadNumero < 18) {
      setError('Debes ser mayor de edad para registrarte');
      setExito('');
      return;
    }

    // Validación de correo de universidad
    if (correo.endsWith('@duocuc.cl')) {
      setDescuento('¡Felicidades! Obtienes un 20% de descuento de por vida.');
    } else {
      setDescuento('');
    }

    // Simulación de un registro exitoso
    setExito('¡Registro exitoso!');
    setError('');
  };

  // --- Tipado de Eventos OnChange ---
  // Un solo manejador para todos los inputs de texto/número/email/password
  // Usamos 'ChangeEvent' y especificamos que viene de un 'HTMLInputElement'
  const manejarCambioInput = (evento: ChangeEvent<HTMLInputElement>, setEstado: (valor: string) => void) => {
    setEstado(evento.target.value);
  };

  // Manejador específico para el <select>
  // Usamos 'ChangeEvent' y especificamos que viene de un 'HTMLSelectElement'
  const manejarCambioSelect = (evento: ChangeEvent<HTMLSelectElement>) => {
    setRegion(evento.target.value);
  };


  return (
    <div className="formulario-registro">
      <h2>Registro</h2>
      <form onSubmit={manejarEnvio}>
        
        <div className="input-group">
          <label>Nombre completo</label>
          <input
            type="text"
            value={nombre}
            onChange={(evento) => manejarCambioInput(evento, setNombre)}
            placeholder="Ingresa tu nombre completo"
          />
        </div>

        <div className="input-group">
          <label>Edad</label>
          <input
            type="number"
            value={edad}
            onChange={(evento) => manejarCambioInput(evento, setEdad)}
            placeholder="Ingresa tu edad"
          />
        </div>

        <div className="input-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            value={correo}
            onChange={(evento) => manejarCambioInput(evento, setCorreo)}
            placeholder="Ingresa tu correo electrónico"
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={contraseña}
            onChange={(evento) => manejarCambioInput(evento, setContraseña)}
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <div className="input-group">
          <label>Confirmar contraseña</label>
          <input
            type="password"
            value={confirmarContraseña}
            onChange={(evento) => manejarCambioInput(evento, setConfirmarContraseña)}
            placeholder="Confirma tu contraseña"
          />
        </div>

        <div className="input-group">
          <label>Región</label>
          {/* El 'onChange' del select usa su propio manejador tipado */}
          <select value={region} onChange={manejarCambioSelect}>
            <option value="">Selecciona una región</option>
            <option value="Arica y Parinacota">Arica y Parinacota</option>
            <option value="Tarapacá">Tarapacá</option>
            <option value="Antofagasta">Antofagasta</option>
            <option value="Atacama">Atacama</option>
            <option value="Coquimbo">Coquimbo</option>
            <option value="Valparaíso">Valparaíso</option>
            <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
            <option value="O'Higgins">O'Higgins</option>
            <option value="Maule">Maule</option>
            <option value="Ñuble">Ñuble</option>
            <option value="Biobío">Biobío</option>
            <option value="La Araucanía">La Araucanía</option>
            <option value="Los Ríos">Los Ríos</option>
            <option value="Los Lagos">Los Lagos</option>
            <option value="Aysén">Aysén</option>
            <option value="Magallanes y la Antártica Chilena">Magallanes y la Antártica Chilena</option>
          </select>
        </div>

        <div className="input-group">
          <label>Comuna</label>
          <input
            type="text"
            value={comuna}
            onChange={(evento) => manejarCambioInput(evento, setComuna)}
            placeholder="Ingresa tu comuna"
          />
        </div>

        {error && <p className="error">{error}</p>}
        {exito && <p className="success">{exito}</p>}
        {descuento && <p className="descuento">{descuento}</p>}
        <button type="submit" className="btn-registrar">Registrarse</button>
      </form>
    </div>
  );
};

export default FormularioRegistro;