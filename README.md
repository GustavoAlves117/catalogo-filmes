<h1>Catálogo de Filmes</h1>

<h2>Descrição</h2>
<p>
Projeto completo composto por Frontend (React) e Backend (Node.js + Express + MongoDB). O sistema permite cadastrar, listar, editar e excluir filmes, além de exibir detalhes, capa, trailer e outras informações. Esta versão do projeto já está configurada com as URLs de deploy (backend e banco online). Para rodar localmente, é necessário alterar as URLs e configurar um MongoDB local.
</p>

<h2>Instalação</h2>

<p>1. Clone o repositório:</p>
<pre>git clone https://github.com/GustavoAlves117/catalogo-filmes.git</pre>

<p>2. Instale as dependências do backend:</p>
<pre>
cd backend
npm install
</pre>

<p>3. Instale as dependências do frontend:</p>
<pre>
cd ../frontend/catalogo-filmes
npm install
</pre>

<h2>Configuração para rodar localmente (LocalHost): </h2>
<p>Se necessário, edite o arquivo <code>backend/src/.env </code> com:</p>

<pre>
MONGO_URI=sua_string_de_conexao_do_banco_de_dados
PORT=5000
</pre>

<h2>Execução</h2>

<h3>Rodar o Backend</h3>
<p>Dentro da pasta <code>backend</code>:</p>
<pre>node src/server.js</pre>

<p>Servidor ficará acessível em:</p>
<pre>http://localhost:5000</pre>

<h3>Rodar o Frontend</h3>
<p>Dentro de <code>frontend/catalogo-filmes</code>:</p>
<pre>npm start</pre>

<p>Aplicação React ficará acessível em:</p>
<pre>http://localhost:3000</pre>

<h2>Endpoints da API</h2>

<h3>GET /filmes</h3>
<p>Retorna todos os filmes.</p>

<h3>GET /filmes/:id</h3>
<p>Retorna um único filme.</p>

<h3>POST /filmes</h3>
<p>Cria um novo filme.</p>

<h3>PUT /filmes/:id</h3>
<p>Atualiza um filme já existente.</p>

<h3>DELETE /filmes/:id</h3>
<p>Remove um filme.</p>

<h2>Modelo JSON Utilizado</h2>
<pre>[
  {
    "_id": "692b13155f61c006e0d93d60",
    "titulo": "The Truman Show",
    "sinopse": "awdaw",
    "ano": 2121,
    "duracao": 121,
    "generos": ["SUSPENSE", "COMEDIA"],
    "diretor": "Peter Weir",
    "elenco": ["Jim Carey"],
    "nota": 10,
    "capa": "https://m.media-amazon.com/images/I/71zEnyA+49L._AC_UF894,1000_QL80_.jpg",
    "trailer": "https://www.youtube.com/watch?v=0-t3hIGW4jY",
    "destaque": false,
    "createdAt": "2025-11-29T15:36:53.506Z",
    "updatedAt": "2025-11-29T15:36:53.506Z",
    "__v": 0
  }
]
</pre>

<h2>Exemplos de Chamadas</h2>

<h3>POST /filmes</h3>
<pre>
fetch("http://localhost:3000/filmes", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    titulo: "The Truman Show",
    sinopse: "awdaw",
    ano: 2121,
    duracao: 121,
    generos: ["SUSPENSE", "COMEDIA"],
    diretor: "Peter Weir",
    elenco: ["Jim Carey"],
    nota: 10,
    capa: "https://m.media-amazon.com/images/I/71zEnyA+49L._AC_UF894,1000_QL80_.jpg",
    trailer: "https://www.youtube.com/watch?v=0-t3hIGW4jY",
    destaque: false
  })
});
</pre>

<h3>PUT /filmes/:id</h3>
<pre>
fetch("http://localhost:3000/filmes/ID_AQUI", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    titulo: "The Truman Show Atualizado",
    sinopse: "Nova sinopse",
    ano: 2025,
    duracao: 130,
    generos: ["DRAMA"],
    diretor: "Peter Weir",
    elenco: ["Jim Carey"],
    nota: 9,
    capa: "https://nova-capa.jpg",
    trailer: "https://youtube.com/novo",
    destaque: true
  })
});
</pre>

<h3>DELETE /filmes/:id</h3>
<pre>
fetch("http://localhost:3000/filmes/ID_AQUI", {
  method: "DELETE"
});
</pre>
