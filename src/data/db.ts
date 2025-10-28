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
 * @param clave La clave de localStorage a leer.
 * @param valorAlternativo El valor a devolver si no existe o falla el parseo.
 * @returns El valor almacenado o el valor alternativo.
 * // Nota: Hemos cambiado T a un tipo más flexible para soportar 'null' en inicializarBD.
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
 * @param clave La clave de localStorage donde escribir.
 * @param valor El valor a almacenar.
 */
function escribir<T>(clave: string, valor: T): void {
  localStorage.setItem(clave, JSON.stringify(valor))
}

// --- Gestión de Productos ---

/**
 * Inicializa la "base de datos" (localStorage) con productos y un carrito vacío
 * si no existen datos previos.
 */
export function inicializarBD(): void {
  // CORRECCIÓN: Usamos 'any' en el genérico para permitir que lea 'Producto[]' o 'null' 
  // (o, mejor aún, le pedimos un tipo más específico basado en la BD)
  
  // Aquí necesitamos leer Producto[] | null. Pasando null, TypeScript infiere T como null.
  // Lo corregimos forzando a leer un tipo más preciso.
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
 * @returns Array de objetos Producto.
 */
export function obtenerProductos(): Producto[] {
  // Ya que en la BD se inicializa con productosIniciales, el valor alternativo
  // debería ser productosIniciales, no un array vacío.
  return leer<Producto[]>(CLAVES_ALMACENAMIENTO.productos, productosIniciales)
}

/**
 * Busca un producto por su ID.
 * @param id El ID del producto.
 * @returns El objeto Producto o undefined si no se encuentra.
 * // CAMBIO: Usamos undefined en lugar de null, ya que .find() devuelve undefined por defecto.
 */
export function obtenerProductoPorId(id: string): Producto | undefined {
  return obtenerProductos().find(p => p.id === id) 
}

/**
 * Agrega un nuevo producto.
 * @param producto El objeto Producto a crear.
 * @returns El producto creado.
 * @throws Error si el ID ya existe.
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
 * @param id El ID del producto a actualizar.
 * @param parcial Objeto con las propiedades a modificar.
 * @returns El producto actualizado.
 * @throws Error si el producto no se encuentra.
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
 * @param id El ID del producto a eliminar.
 */
export function eliminarProducto(id: string): void {
  const productos = obtenerProductos().filter(p => p.id !== id)
  escribir(CLAVES_ALMACENAMIENTO.productos, productos)
}

/**
 * Obtiene una lista ordenada de todas las categorías disponibles.
 * @returns Array de strings con los nombres de las categorías.
 */
export function obtenerCategorias(): string[] {
  const categorias = Array.from(new Set(obtenerProductos().map(p => p.categoria)))
  return categorias.sort()
}

// --- Gestión del Carrito ---

/**
 * Obtiene el contenido actual del carrito.
 * @returns Array de objetos ItemCarrito.
 */
export function obtenerCarrito(): ItemCarrito[] {
  return leer<ItemCarrito[]>(CLAVES_ALMACENAMIENTO.carrito, [])
}

/**
 * Agrega un producto al carrito o incrementa su cantidad si ya existe.
 * @param producto El Producto a agregar.
 * @param cantidad La cantidad a añadir (por defecto 1).
 * @returns El carrito actualizado.
 * @throws Error si el precio del producto es cero o negativo.
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
 * @param id El ID del producto a eliminar del carrito.
 * @returns El carrito actualizado.
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
 * @returns El total en moneda (number).
 */
export function totalCarrito(): number {
  return obtenerCarrito().reduce((acumulador, item) => {
    // Asegurarse de que solo se sumen los productos con precios mayores a cero
    return item.precio > 0 ? acumulador + item.precio * item.cantidad : acumulador;
  }, 0)
}
