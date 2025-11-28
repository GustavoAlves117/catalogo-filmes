import { useEffect, useState } from "react";
import FilmeCard from "../components/FilmeCard";

export default function Home() {
  const [catalogo, setCatalogo] = useState([]);
  const [minhaLista, setMinhaLista] = useState([]);

  async function carregarCatalogo() {
    try {
      const r = await fetch("http://localhost:5000/filmes");
      const data = await r.json();
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
      const promises = listaIds.map(id =>
        fetch(`http://localhost:5000/filmes/${id}`).then(r => r.json())
      );
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

    // Atualiza quando lista de favoritos mudar
    window.addEventListener("listaAtualizada", carregarMinhaLista);

    // Atualiza catálogo quando novo filme é adicionado via modal
    window.addEventListener("filmeAdicionado", carregarCatalogo);

    return () => {
      window.removeEventListener("listaAtualizada", carregarMinhaLista);
      window.removeEventListener("filmeAdicionado", carregarCatalogo);
    };
  }, []);

  return (
    <div className="home-container">

      {/* Minha lista */}
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

      {/* Catálogo completo */}
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
