import { addToCart, clearCart, cartTotal, getCart } from '../src/data/db';


describe('Carrito - estado', () => {
  beforeEach(() => { clearCart() })
  
  
  it('agrega items y suma cantidad al mismo producto', () => {
  clearCart();  // Vaciar carrito antes de la prueba

  // Agregar un producto
  addToCart({ id: 'x', name: 'X', price: 10 });
  addToCart({ id: 'x', name: 'X', price: 10 }); // Mismo producto, diferente cantidad

  const cart = getCart();
  expect(cart.length).toBe(1);
  expect(cart[0].qty).toBe(2);  // Verifica que la cantidad del producto sea 2
  expect(cartTotal()).toBe(20);  // Verifica que el total es 20 (10 * 2)
  });

})
