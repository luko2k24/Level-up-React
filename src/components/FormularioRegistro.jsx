// src/components/FormularioRegistro.jsx
import React, { useState } from 'react';
import '../styles/FormularioRegistro.css';
const FormularioRegistro = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [descuento, setDescuento] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();

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

    // Validación de mayor de edad
    if (edad < 18) {
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

  return (
    <div className="formulario-registro">
      <h2>Registro</h2>
      <form onSubmit={manejarEnvio}>
        <div className="input-group">
          <label>Nombre completo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa tu nombre completo"
          />
        </div>
        <div className="input-group">
          <label>Edad</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            placeholder="Ingresa tu edad"
          />
        </div>
        <div className="input-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
          />
        </div>
        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <div className="input-group">
          <label>Confirmar contraseña</label>
          <input
            type="password"
            value={confirmarContraseña}
            onChange={(e) => setConfirmarContraseña(e.target.value)}
            placeholder="Confirma tu contraseña"
          />
        </div>
        <div className="input-group">
          <label>Región</label>
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
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
            onChange={(e) => setComuna(e.target.value)}
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
