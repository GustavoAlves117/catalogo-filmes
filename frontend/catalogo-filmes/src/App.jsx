import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FilmeDetalhe from "./pages/FilmeDetalhe";
import Header from "./components/Header";
import NovoFilme from "./pages/NovoFilme"; 

export default function App() {
  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <BrowserRouter>

      <Header onAbrirModal={() => setAbrirModal(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<FilmeDetalhe />} />
       
      </Routes>

      {abrirModal && (
        <NovoFilme
          onClose={() => setAbrirModal(false)}
        />
      )}
    </BrowserRouter>
  );
}
