// src/data/db.js
// Simulación de base de datos + persistencia en localStorage

const STORAGE_KEYS = {
  products: 'lvl_products',
  cart: 'lvl_cart'
}

const seedProducts = [
  { id: 'p1', name: 'Teclado Mecánico RGB', price: 39990, category: 'Periféricos', offer: true, image: '/img/productos/teclado.jpg' },
  { id: 'p2', name: 'Mouse Gamer 12K DPI', price: 19990, category: 'Periféricos', offer: false, image: '/img/productos/mouse.jpg' },
  { id: 'p3', name: 'Audífonos 7.1', price: 29990, category: 'Audio', offer: true, image: '/img/productos/audifonos.jpg' },
  { id: 'p4', name: 'Silla Ergonométrica', price: 129990, category: 'Muebles', offer: false, image: '/img/productos/silla.jpg' },
  { id: 'p5', name: 'Monitor 27" 144Hz', price: 189990, category: 'Monitores', offer: false, image: '/img/productos/monitor.jpg' },
]

function read(key, fallback) {
  const raw = localStorage.getItem(key)
  if (!raw) return fallback
  try { return JSON.parse(raw) } catch { return fallback }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}   

// Inicializa productos si no existen
export function initDB() {
  const current = read(STORAGE_KEYS.products, null)
  if (!current) write(STORAGE_KEYS.products, seedProducts)
  const cart = read(STORAGE_KEYS.cart, null)
  if (!cart) write(STORAGE_KEYS.cart, [])
}

export function getProducts() {
  return read(STORAGE_KEYS.products, [])
}

export function getProductById(id) {
  return getProducts().find(p => p.id === id) || null
}

export function createProduct(prod) {
  const products = getProducts()
  const exists = products.find(p => p.id === prod.id)
  if (exists) throw new Error('ID duplicado')
  products.push(prod)
  write(STORAGE_KEYS.products, products)
  return prod
}

export function updateProduct(id, partial) {
  const products = getProducts()
  const idx = products.findIndex(p => p.id === id)
  if (idx === -1) throw new Error('No encontrado')
  products[idx] = { ...products[idx], ...partial }
  write(STORAGE_KEYS.products, products)
  return products[idx]
}

export function deleteProduct(id) {
  const products = getProducts().filter(p => p.id !== id)
  write(STORAGE_KEYS.products, products)
}

export function getCategories() {
  const cats = Array.from(new Set(getProducts().map(p => p.category)))
  return cats.sort()
}

// Carrito
export function getCart() {
  return read(STORAGE_KEYS.cart, [])
}

export function addToCart(product, qty = 1) {
  if (product.price <= 0) throw new Error('El precio del producto debe ser mayor a cero');  // Validación de precio positivo
  
  const cart = getCart()
  const idx = cart.findIndex(i => i.id === product.id)
  if (idx >= 0) { cart[idx].qty += qty }
  else { cart.push({ id: product.id, name: product.name, price: product.price, qty }) }
  write(STORAGE_KEYS.cart, cart)
  return cart
}

export function removeFromCart(id) {
  const cart = getCart().filter(i => i.id != id)
  write(STORAGE_KEYS.cart, cart)
  return cart
}

export function clearCart() {
  write(STORAGE_KEYS.cart, [])
}

export function cartTotal() {
  return getCart().reduce((acc, i) => {
    // Asegurarse de que solo se sumen los productos con precios mayores a cero
    return i.price > 0 ? acc + i.price * i.qty : acc;
  }, 0)
}
