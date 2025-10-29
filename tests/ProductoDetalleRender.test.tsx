import { render, screen } from '@testing-library/react';
import ProductoDetalle from '../src/pages/ProductoDetalle';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// --- INICIO DE LA CORRECCIÓN ---

const mockProducto = {
  id: '1',
  nombre: 'Producto Test',
  categoria: 'Categoría Test',
  precio: 1000,
  imagen: 'test.jpg',
  oferta: true,
};

// 1. EL MOCK DEBE ESTAR ARRIBA, fuera del bloque test()
// 2. El mock debe coincidir con el nombre EN INGLÉS que usa el componente
vi.mock('../data/db', () => ({
  getProductById: vi.fn(() => mockProducto), // Devuelve el producto
  addToCart: vi.fn(), // Añadimos la otra función que importa el componente
}));
// --- FIN DE LA CORRECCIÓN ---

test('shouldRenderProductDetails', () => {
  render(
    <Router>
      <ProductoDetalle />
    </Router>
  );

  // Verifica que el texto de producto, categoría y precio esté en el documento
  expect(screen.getByText(/Producto Test/i)).toBeInTheDocument();
  // Usamos getAllByText porque "Categoría Test" puede aparecer varias veces
  expect(screen.getAllByText(/Categoría Test/i).length).toBeGreaterThan(0);
  expect(screen.getByText('$1,000')).toBeInTheDocument();
  expect(screen.getByAltText('Producto Test')).toBeInTheDocument();
});