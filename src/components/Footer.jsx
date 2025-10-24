import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container d-flex justify-content-between flex-wrap gap-2">
        <span>© {new Date().getFullYear()} Level‑Up Gamer</span>
        <span className="text-secondary">Hecho con React + Bootstrap</span>
      </div>
    </footer>
  )
}
