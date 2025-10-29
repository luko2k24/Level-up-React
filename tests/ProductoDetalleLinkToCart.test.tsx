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
  oferta: true,
};

// 1. EL MOCK DEBE ESTAR ARRIBA, fuera del bloque test()
vi.mock('../data/db', () => ({
  getProductById: vi.fn(() => mockProducto), // Devuelve el producto
  addToCart: vi.fn(),
}));
// --- FIN DE LA CORRECCIÓN ---

test('shouldRenderLinkToCart', () => {
  render(
    <Router>
      <ProductoDetalle />
    </Router>
  );

  // Verifica que el enlace "Ir al carrito" esté presente si el producto existe
  const link = screen.getByRole('link', { name: /ir al carrito/i });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', '/carrito'); // Verifica el href del enlace
});