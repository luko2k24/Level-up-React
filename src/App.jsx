// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

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
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

export default function App() {
  return (
    <div className="d-flex min-vh-100 flex-column">
      <Header />

      <main className="container my-4 flex-fill">
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compra-exitosa" element={<CompraExitosa />} />
          <Route path="/compra-fallida" element={<CompraFallida />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
