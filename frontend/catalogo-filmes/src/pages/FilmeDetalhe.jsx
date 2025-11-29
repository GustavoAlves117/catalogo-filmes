import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function FilmeDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState(null);
  const [abrirModal, setAbrirModal] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [ano, setAno] = useState("");
  const [generos, setGeneros] = useState("");
  const [duracao, setDuracao] = useState("");
  const [diretor, setDiretor] = useState("");
  const [elenco, setElenco] = useState("");
  const [nota, setNota] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [capa, setCapa] = useState("");
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    api.get(`/filmes/${id}`)
      .then(({ data }) => {
        setFilme(data);
        setTitulo(data.titulo);
        setAno(data.ano);
        setGeneros(data.generos.join(", "));
        setDuracao(data.duracao);
        setDiretor(data.diretor);
        setElenco(data.elenco.join(", "));
        setNota(data.nota);
        setSinopse(data.sinopse);
        setCapa(data.capa);
        setTrailer(data.trailer);
      })
      .catch(err => console.log(err));
  }, [id]);

  async function deletarFilme() {
    const deseja = window.confirm("Tem certeza que deseja excluir?");
    if (!deseja) return;

    await api.delete(`/filmes/${id}`);
    navigate("/");
  }

  async function salvarEdicao() {
    const atualizado = {
      titulo,
      ano,
      generos: generos.split(",").map(g => g.trim()),
      duracao,
      diretor,
      elenco: elenco.split(",").map(e => e.trim()),
      nota,
      sinopse,
      capa,
      trailer,
    };

    await api.put(`/filmes/${id}`, atualizado);
    setFilme(atualizado);
    setAbrirModal(false);
  }

  if (!filme) return <h2>Carregando...</h2>;

  return (
    <div className="detalhes-container">
      <img src={filme.capa} className="detalhe-capa" alt={filme.titulo} />

      <div className="detalhes-texto">
        <h1>{filme.titulo}</h1>

        <p><strong>Gêneros:</strong> {filme.generos.join(", ")}</p>
        <p><strong>Ano:</strong> {filme.ano}</p>
        <p><strong>Duração:</strong> {filme.duracao} min</p>
        <p><strong>Diretor:</strong> {filme.diretor}</p>
        <p><strong>Elenco:</strong> {filme.elenco.join(", ")}</p>
        <p><strong>Nota:</strong> {filme.nota}/10</p>

        <p className="descricao">{filme.sinopse}</p>

        {filme.trailer && (
          <a
            className="btn"
            href={filme.trailer}
            target="_blank"
            rel="noreferrer"
          >
            ▶ Assistir Trailer
          </a>
        )}

        <div className="botoes-edicao">
          <button className="btn editar" onClick={() => setAbrirModal(true)}>
            Editar
          </button>

          <button className="btn deletar" onClick={deletarFilme}>
            Excluir
          </button>
        </div>
      </div>

      {abrirModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setAbrirModal(false)}>X</button>

            <h2>Editar Filme</h2>

            <div className="form-modal">
              <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" />
              <input value={ano} onChange={(e) => setAno(e.target.value)} placeholder="Ano" />
              <input value={duracao} onChange={(e) => setDuracao(e.target.value)} placeholder="Duração (min)" />
              <input value={diretor} onChange={(e) => setDiretor(e.target.value)} placeholder="Diretor" />

              <input value={generos} onChange={(e) => setGeneros(e.target.value)} placeholder="Gêneros separados por vírgula" />
              <input value={elenco} onChange={(e) => setElenco(e.target.value)} placeholder="Elenco separado por vírgula" />

              <input value={nota} onChange={(e) => setNota(e.target.value)} placeholder="Nota" />
              <input value={capa} onChange={(e) => setCapa(e.target.value)} placeholder="URL da capa" />
              <input value={trailer} onChange={(e) => setTrailer(e.target.value)} placeholder="URL do trailer" />

              <textarea
                className="textarea"
                value={sinopse}
                onChange={(e) => setSinopse(e.target.value)}
                placeholder="Sinopse"
                style={{ width: "100%", height: "120px", marginTop: "10px" }}
              ></textarea>

              <button className="btn" onClick={salvarEdicao}>Salvar alterações</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
