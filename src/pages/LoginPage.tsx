import React from 'react';
// Importamos el componente de forma tipada. 
// Asumimos que la ruta es correcta, pero cambiamos la extensión a .tsx si es un archivo tipado.
// NOTA: Si FormularioIngreso.jsx no ha sido migrado a TS/TSX, mantén la extensión '.jsx'.
// Para este ejemplo, asumiremos que se mantiene la ruta relativa original, pero indicando que es un componente.
import FormularioIngreso from '../components/FormularioIngreso'; 

/**
 * Componente de la página de inicio de sesión.
 * Simplemente sirve como contenedor para el componente FormularioIngreso.
 */
const LoginPage: React.FC = () => {
  return (
    <div className="register-page">
      {/* El componente FormularioRegistro contendrá la lógica y el layout del formulario */}
      <FormularioIngreso />
    </div>
  );
};

export default LoginPage;