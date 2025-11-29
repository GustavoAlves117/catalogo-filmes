import { useEffect, useState } from "react";
import FilmeCard from "../components/FilmeCard";
import api from "../api";

export default function MinhaLista() {
  const [minhaLista, setMinhaLista] = useState([]);

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
    carregarMinhaLista();
    window.addEventListener("listaAtualizada", carregarMinhaLista);
    return () => window.removeEventListener("listaAtualizada", carregarMinhaLista);
  }, []);

  return (
    <div className="home-container">
      <h2>Minha Lista</h2>
      {minhaLista.length === 0 ? (
        <p>Você não adicionou nenhum filme ainda.</p>
      ) : (
        <div className="catalogo">
          {minhaLista.map(f => (
            <FilmeCard key={f._id} filme={f} />
          ))}
        </div>
      )}
    </div>
  );
}
