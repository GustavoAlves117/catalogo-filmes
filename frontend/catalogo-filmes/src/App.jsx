import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FilmeDetalhe from "./pages/FilmeDetalhe";
import Header from "./components/Header";
import NovoFilme from "./pages/NovoFilme"; // agora é modal, continuamos importando

export default function App() {
  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <BrowserRouter>
      {/* Header existe apenas aqui */}
      <Header onAbrirModal={() => setAbrirModal(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<FilmeDetalhe />} />
        {/* removemos a rota /novo (agora é modal). Se ainda tiver rota /novo no histórico, tudo ok. */}
      </Routes>

      {/* Modal de novo filme: renderiza por cima das rotas */}
      {abrirModal && (
        <NovoFilme
          onClose={() => setAbrirModal(false)}
        />
      )}
    </BrowserRouter>
  );
}
