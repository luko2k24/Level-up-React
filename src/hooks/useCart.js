import { useEffect, useState } from 'react'
import { getCart, addToCart, removeFromCart, clearCart, cartTotal } from '../data/db.js'

export default function useCartState() {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  const refresh = () => {
    setCart(getCart())
    setTotal(cartTotal())
  }

  useEffect(() => {
    refresh()
  }, [])

  const add = (p, qty=1) => { addToCart(p, qty); refresh() }
  const remove = (id) => { removeFromCart(id); refresh() }
  const clear = () => { clearCart(); refresh() }

  return { cart, total, add, remove, clear }
}
