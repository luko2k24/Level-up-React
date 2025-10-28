import { addToCart, clearCart, cartTotal, getCart } from '../src/data/db'

describe('Carrito: clearCart => vacío y total $0', () => {
  it('vacía el carrito => vacío y total $0', () => {
  clearCart();  // Vaciar el carrito

  // Agregar productos con precios válidos
  addToCart({ id: 'a', name: 'A', price: 1000 });
  addToCart({ id: 'b', name: 'B', price: 500 });
  expect(cartTotal()).toBe(1500);

  // Vaciar el carrito
  clearCart();

  expect(getCart().length).toBe(0);  // Verifica que el carrito esté vacío
  expect(cartTotal()).toBe(0);  // Verifica que el total esté a 0
  });


})
