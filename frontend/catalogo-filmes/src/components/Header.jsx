import { useState } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/icon.png";
import "./Header.css";

export default function Header({ onAbrirModal }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">

      <Link to="/" className="logo">
        <img src={icon} className="logo-header" alt="Logo" />
      </Link>

      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <Link className="header-link" to="/">Home</Link>
        <Link className="header-link" to="/minha-lista">Minha Lista</Link>
        <Link onClick={onAbrirModal} className="header-link btn-abrir-modal">
          Adicionar Filme
        </Link>
      </nav>

    </header>
  );
}
