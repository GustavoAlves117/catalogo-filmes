import { useEffect, useState } from "react";
import FilmeCard from "../components/FilmeCard";
import api from "../api";
import "./Home.css";

export default function Home() {
  const [catalogo, setCatalogo] = useState([]);

  async function carregarCatalogo() {
    try {
      const { data } = await api.get("/filmes");
      setCatalogo(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    carregarCatalogo();

    window.addEventListener("filmeAdicionado", carregarCatalogo);

    return () => {
      window.removeEventListener("filmeAdicionado", carregarCatalogo);
    };
  }, []);

  return (
    <div className="home-container">
      <section>
        <h2>Catálogo Completo</h2>
        <div className="catalogo">
          {catalogo.map(f => (
            <FilmeCard key={f._id} filme={f} />
          ))}
        </div>
      </section>
    </div>
  );
}
