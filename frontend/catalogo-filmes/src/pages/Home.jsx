import { useEffect, useState } from "react";
import FilmeCard from "../components/FilmeCard";
import api from "../api";
import "./Home.css";

export default function Home() {
  const [catalogo, setCatalogo] = useState([]);
  const [minhaLista, setMinhaLista] = useState([]);

  async function carregarCatalogo() {
    try {
      const { data } = await api.get("/filmes");
      setCatalogo(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function carregarMinhaLista() {
    const listaIds = JSON.parse(localStorage.getItem("lista")) || [];
    if (listaIds.length === 0) {
      setMinhaLista([]);
      return;
    }

    try {
      const promises = listaIds.map(id => api.get(`/filmes/${id}`).then(r => r.data));
      const resultados = await Promise.all(promises);
      setMinhaLista(resultados);
    } catch (err) {
      console.error(err);
      setMinhaLista([]);
    }
  }

  useEffect(() => {
    carregarCatalogo();
    carregarMinhaLista();

    window.addEventListener("listaAtualizada", carregarMinhaLista);
    window.addEventListener("filmeAdicionado", carregarCatalogo);

    return () => {
      window.removeEventListener("listaAtualizada", carregarMinhaLista);
      window.removeEventListener("filmeAdicionado", carregarCatalogo);
    };
  }, []);

  return (
    <div className="home-container">
      {minhaLista.length > 0 && (
        <section>
          <h2>Minha Lista</h2>
          <div className="catalogo">
            {minhaLista.map(f => (
              <FilmeCard key={f._id} filme={f} />
            ))}
          </div>
        </section>
      )}

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
