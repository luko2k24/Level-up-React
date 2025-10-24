import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Categorias from './pages/Categorias.jsx'
import Ofertas from './pages/Ofertas.jsx'
import Carrito from './pages/Carrito.jsx'
import Checkout from './pages/Checkout.jsx'
import CompraExitosa from './pages/CompraExitosa.jsx'
import CompraFallida from './pages/CompraFallida.jsx'
import Admin from './pages/Admin.jsx'
import ProductoDetalle from './pages/ProductoDetalle.jsx'

export default function App() {
  return (
    <div className="d-flex min-vh-100 flex-column">
      <Header />
      <main className="container my-4 flex-fill">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compra-exitosa" element={<CompraExitosa />} />
          <Route path="/compra-fallida" element={<CompraFallida />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
