import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FilmeCard({ filme }) {
  const navigate = useNavigate();
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    const lista = JSON.parse(localStorage.getItem("lista")) || [];
    setSalvo(lista.includes(filme._id));
  }, [filme._id]);


  useEffect(() => {
    function atualizarEstado() {
      const lista = JSON.parse(localStorage.getItem("lista")) || [];
      setSalvo(lista.includes(filme._id));
    }

    window.addEventListener("listaAtualizada", atualizarEstado);

    return () => {
      window.removeEventListener("listaAtualizada", atualizarEstado);
    };
  }, [filme._id]);

  function toggleSalvar() {
    const lista = JSON.parse(localStorage.getItem("lista")) || [];

    if (salvo) {

      const novaLista = lista.filter(id => id !== filme._id);
      localStorage.setItem("lista", JSON.stringify(novaLista));
      setSalvo(false);
    } else {
    
      lista.push(filme._id);
      localStorage.setItem("lista", JSON.stringify(lista));
      setSalvo(true);
    }

   
    window.dispatchEvent(new Event("listaAtualizada"));
  }

  return (
    <div className="card">
      <img
        src={filme.capa}
        alt={filme.titulo}
        className="capa"
        onClick={() => navigate(`/filme/${filme._id}`)}
      />

      <h3>{filme.titulo}</h3>
      <p>{filme.generos.join(", ")} • {filme.ano}</p>

      <button className="btn" onClick={toggleSalvar}>
        {salvo ? "✔ Na sua lista" : "Adicionar na lista"}
      </button>
    </div>
  );
}
