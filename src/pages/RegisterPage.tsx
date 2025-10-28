// src/pages/RegisterPage.tsx
import React from 'react';
// Asegúrate de que el componente FormularioRegistro también esté en formato TS (FormularioRegistro.tsx)
import FormularioRegistro from '../components/FormularioRegistro'; 

/**
 * Componente funcional para la página de registro.
 * Renderiza el formulario de registro.
 * @returns Elemento JSX
 */
const RegisterPage: React.FC = () => {
  return (
    <div className="register-page">
      {/* El componente FormularioRegistro contendrá la lógica y el layout del formulario */}
      <FormularioRegistro />
    </div>
  );
};

export default RegisterPage;