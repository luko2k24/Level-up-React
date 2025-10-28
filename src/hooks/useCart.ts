import { useEffect, useState } from 'react'
import { 
    obtenerCarrito, 
    agregarAlCarrito, 
    eliminarDelCarrito, 
    vaciarCarrito, 
    totalCarrito,
    type Producto, 
    type ItemCarrito
} from '../data/db'

export default function useEstadoCarrito() {
  // Especificamos explícitamente que el estado 'carrito' es un array de 'ItemCarrito'
  const [carrito, setCarrito] = useState<ItemCarrito[]>([])  
  const [total, setTotal] = useState<number>(0)

  // Función para refrescar el estado del carrito y el total
  const refrescar = () => {
    setCarrito(obtenerCarrito())  
    setTotal(totalCarrito())  
  }

  // Llamada a refrescar cuando el componente se monta
  useEffect(() => {
    refrescar()
  }, [])

  // Funciones para manejar las operaciones del carrito
  const agregar = (producto: Producto, cantidad: number = 1) => { 
    agregarAlCarrito(producto, cantidad); 
    refrescar() 
  }
  
  const eliminar = (id: string) => { 
    eliminarDelCarrito(id); 
    refrescar() 
  }
  
  const vaciar = () => { 
    vaciarCarrito(); 
    refrescar() 
  }

  // Retorna el estado del carrito, total y las funciones para modificarlo
  return { carrito, total, agregar, eliminar, vaciar }
}
