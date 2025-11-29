import { Link } from "react-router-dom";
import icon from "../assets/icon.png";
import "./Header.css";

export default function Header({ onAbrirModal }) {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={icon} className="logo-header" alt="Logo" />
      </Link>

      <nav>
        <Link className="header-link" to="/">Home</Link>
        <Link
          onClick={onAbrirModal}
          className="header-link btn-abrir-modal"
        >
          Adicionar Filme
        </Link>
      </nav>
    </header>
  );
}
