import { Link } from "react-router-dom";
import icon from "../assets/icon.png";

export default function Header({ onAbrirModal }) {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={icon} className="logo-header" alt="Logo" />
      </Link>

      <nav>
        <Link className="header-link" to="/">Home</Link>
        <button
          onClick={onAbrirModal}
          className="header-link btn-abrir-modal"
          style={{
            color: "white",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Adicionar Filme
        </button>
      </nav>
    </header>
  );
}
