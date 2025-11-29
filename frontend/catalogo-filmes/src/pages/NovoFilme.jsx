import { useState } from "react";
import api from "../api";

export default function NovoFilme({ onClose }) {
  const [form, setForm] = useState({
    titulo: "",
    sinopse: "",
    ano: "",
    duracao: "",
    generos: "",
    diretor: "",
    elenco: "",
    nota: "",
    capa: "",
    trailer: "",
    destaque: false
  });
  const [enviando, setEnviando] = useState(false);

  function atualizar(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function enviar(e) {
    e.preventDefault();
    setEnviando(true);

    const payload = {
      titulo: form.titulo,
      sinopse: form.sinopse,
      ano: Number(form.ano),
      duracao: Number(form.duracao),
      generos: form.generos.split(",").map(g => g.trim()).filter(Boolean),
      diretor: form.diretor,
      elenco: form.elenco.split(",").map(a => a.trim()).filter(Boolean),
      nota: Number(form.nota),
      capa: form.capa,
      trailer: form.trailer,
      destaque: form.destaque
    };

    try {
      await api.post("/filmes", payload);
      window.dispatchEvent(new Event("filmeAdicionado"));
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar os dados.");
    } finally {
      setEnviando(false);
    }
  }

  function clicarFora(e) {
    if (e.target.classList.contains("modal-overlay")) onClose();
  }

  return (
    <div className="modal-overlay" onClick={clicarFora}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>

        <h2>Adicionar Filme</h2>

        <form onSubmit={enviar} className="form-modal">
          <input
            name="titulo"
            placeholder="Título"
            value={form.titulo}
            onChange={atualizar}
            required
          />

          <textarea
            name="sinopse"
            placeholder="Sinopse"
            rows={4}
            className="textarea"
            value={form.sinopse}
            onChange={atualizar}
            required
          />

          <input
            name="ano"
            placeholder="Ano"
            type="number"
            value={form.ano}
            onChange={atualizar}
            required
          />

          <input
            name="duracao"
            placeholder="Duração (minutos)"
            type="number"
            value={form.duracao}
            onChange={atualizar}
            required
          />

          <input
            name="generos"
            placeholder="Gêneros (separados por vírgula)"
            value={form.generos}
            onChange={atualizar}
            required
          />

          <input
            name="diretor"
            placeholder="Diretor"
            value={form.diretor}
            onChange={atualizar}
            required
          />

          <input
            name="elenco"
            placeholder="Elenco (separado por vírgula)"
            value={form.elenco}
            onChange={atualizar}
            required
          />

          <input
            name="nota"
            placeholder="Nota (0 a 10)"
            type="number"
            value={form.nota}
            onChange={atualizar}
            required
          />

          <input
            name="capa"
            placeholder="URL da capa"
            value={form.capa}
            onChange={atualizar}
            required
          />

          <input
            name="trailer"
            placeholder="URL do trailer"
            value={form.trailer}
            onChange={atualizar}
          />

          <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              type="checkbox"
              name="destaque"
              checked={form.destaque}
              onChange={atualizar}
            />
            Destaque?
          </label>

          <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
            <button className="btn" type="submit" disabled={enviando}>
              {enviando ? "Enviando..." : "Cadastrar"}
            </button>
            <button type="button" onClick={onClose} className="btn btn-secundario">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
