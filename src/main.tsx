import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Nota: En TypeScript se suele omitir la extensión, asumiendo que App.tsx existe
import App from './App'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.css';
// Nota: Asumiendo que db es un archivo .ts o .js
import { inicializarBD } from './data/db'; 

// Inicializa la conexión a la base de datos
inicializarBD();

// Intenta obtener el contenedor raíz del DOM
const container = document.getElementById('root');

if (container) {
  // Crea la raíz de React para renderizar la aplicación
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  // Manejo de error si no se encuentra el elemento 'root'
  console.error("Error: No se encontró el elemento 'root' en el documento HTML.");
}
