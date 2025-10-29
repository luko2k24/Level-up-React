import { render, screen } from '@testing-library/react';
import ProductoDetalle from '../src/pages/ProductoDetalle';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// --- INICIO DE LA CORRECCIÓN ---

// 1. EL MOCK DEBE ESTAR ARRIBA, fuera del bloque test()
vi.mock('../data/db', () => ({
  getProductById: vi.fn(() => undefined), // Devuelve undefined
  addToCart: vi.fn(),
}));
// --- FIN DE LA CORRECCIÓN ---

test('shouldShowProductNotFound', () => {
  render(
    <Router>
      <ProductoDetalle />
    </Router>
  );

  // Verifica que el mensaje "Producto no encontrado." se muestre en pantalla
  expect(screen.getByText('Producto no encontrado.')).toBeInTheDocument();
});