// Simulación de base de datos + persistencia en localStorage

/**
 * Interfaz para definir la estructura de un Producto.
 */
export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  oferta: boolean;
  imagen: string;
}

/**
 * Interfaz para definir la estructura de un Item dentro del Carrito.
 */
export interface ItemCarrito {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number; // Cantidad de unidades de este producto en el carrito
}

// Definición de las claves de almacenamiento en localStorage
const CLAVES_ALMACENAMIENTO = {
  productos: 'lvl_productos',
  carrito: 'lvl_carrito'
}

// Productos iniciales (Seed data)
const productosIniciales: Producto[] = [
  { id: 'p1', nombre: 'Teclado Mecánico RGB', precio: 39990, categoria: 'Periféricos', oferta: true, imagen: '/img/productos/teclado.jpg' },
  { id: 'p2', nombre: 'Mouse Gamer 12K DPI', precio: 19990, categoria: 'Periféricos', oferta: false, imagen: '/img/productos/mouse.jpg' },
  { id: 'p3', nombre: 'Audífonos 7.1', precio: 29990, categoria: 'Audio', oferta: true, imagen: '/img/productos/audifonos.jpg' },
  { id: 'p4', nombre: 'Silla Ergonométrica', precio: 129990, categoria: 'Muebles', oferta: false, imagen: '/img/productos/silla.jpg' },
  { id: 'p5', nombre: 'Monitor 27" 144Hz', precio: 189990, categoria: 'Monitores', oferta: false, imagen: '/img/productos/monitor.jpg' },
]

/**
 * Lee un valor de localStorage y lo parsea a JSON.
 */
function leer<T>(clave: string, valorAlternativo: T): T {
  const crudo = localStorage.getItem(clave)
  if (!crudo) return valorAlternativo
  try {
    return JSON.parse(crudo) as T
  } catch {
    return valorAlternativo
  }
}

/**
 * Escribe un valor en localStorage, serializándolo a JSON.
 */
function escribir<T>(clave: string, valor: T): void {
  localStorage.setItem(clave, JSON.stringify(valor))
}

// --- Gestión de Productos ---


 
export function inicializarBD(): void {
 
  
  // Aquí necesitamos leer Producto[] | null. Pasando null, TypeScript infiere T como null.
  const productosActuales = leer<Producto[] | null>(CLAVES_ALMACENAMIENTO.productos, null)
  if (!productosActuales) {
    escribir(CLAVES_ALMACENAMIENTO.productos, productosIniciales)
  }

  // Hacemos lo mismo para el carrito
  const carritoActual = leer<ItemCarrito[] | null>(CLAVES_ALMACENAMIENTO.carrito, null)
  if (!carritoActual) {
    escribir(CLAVES_ALMACENAMIENTO.carrito, [])
  }
}

/**
 * Obtiene la lista completa de productos.
 */
export function obtenerProductos(): Producto[] {
  return leer<Producto[]>(CLAVES_ALMACENAMIENTO.productos, productosIniciales)
}

/**
 * Busca un producto por su ID.
 */
export function obtenerProductoPorId(id: string): Producto | undefined {
  return obtenerProductos().find(p => p.id === id) 
}

/**
  Agrega un nuevo producto.
 */
export function crearProducto(producto: Producto): Producto {
  const productos = obtenerProductos()
  const existe = productos.find(p => p.id === producto.id)
  if (existe) {
    throw new Error('ID duplicado: El producto con este ID ya existe.')
  }
  productos.push(producto)
  escribir(CLAVES_ALMACENAMIENTO.productos, productos)
  return producto
}

/**
 * Actualiza parcialmente un producto existente.
 */
export function actualizarProducto(id: string, parcial: Partial<Producto>): Producto {
  const productos = obtenerProductos()
  const indice = productos.findIndex(p => p.id === id)
  if (indice === -1) {
    throw new Error('Producto no encontrado para actualizar.')
  }
  
  // Combina el producto existente con las propiedades parciales
  productos[indice] = { ...productos[indice], ...parcial }
  escribir(CLAVES_ALMACENAMIENTO.productos, productos)
  return productos[indice]
}

/**
 * Elimina un producto por su ID.
 */
export function eliminarProducto(id: string): void {
  const productos = obtenerProductos().filter(p => p.id !== id)
  escribir(CLAVES_ALMACENAMIENTO.productos, productos)
}

/**
 * Obtiene una lista ordenada de todas las categorías disponibles.
 */
export function obtenerCategorias(): string[] {
  const categorias = Array.from(new Set(obtenerProductos().map(p => p.categoria)))
  return categorias.sort()
}



// --- Gestión del Carrito ---

/**
 * Obtiene el contenido actual del carrito.
 */
export function obtenerCarrito(): ItemCarrito[] {
  return leer<ItemCarrito[]>(CLAVES_ALMACENAMIENTO.carrito, [])
}

/**
 * Agrega un producto al carrito o incrementa su cantidad si ya existe.
 */
export function agregarAlCarrito(producto: Producto, cantidad: number = 1): ItemCarrito[] {
  if (producto.precio <= 0) {
    throw new Error('El precio del producto debe ser mayor a cero para agregarlo al carrito.');
  }
    
  const carrito = obtenerCarrito()
  const indice = carrito.findIndex(i => i.id === producto.id)
  
  if (indice >= 0) {
    // Si ya existe, incrementa la cantidad
    carrito[indice].cantidad += cantidad
  } else {
    // Si no existe, agrega un nuevo item
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad
    })
  }
  escribir(CLAVES_ALMACENAMIENTO.carrito, carrito)
  return carrito
}

/**
 * Elimina un item completamente del carrito por ID.
 */
export function eliminarDelCarrito(id: string): ItemCarrito[] {
  const carrito = obtenerCarrito().filter(i => i.id !== id)
  escribir(CLAVES_ALMACENAMIENTO.carrito, carrito)
  return carrito
}

/**
 * Vacía completamente el carrito.
 */
export function vaciarCarrito(): void {
  escribir(CLAVES_ALMACENAMIENTO.carrito, [])
}

/**
 * Calcula el valor total de todos los items en el carrito.
 */
export function totalCarrito(): number {
  return obtenerCarrito().reduce((acumulador, item) => {
    return item.precio > 0 ? acumulador + item.precio * item.cantidad : acumulador;
  }, 0)
}
