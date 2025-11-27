const express = require("express");
const cors = require("cors");
const conectarBanco = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

conectarBanco();

const filmesRoutes = require("./routes/filmesRoutes");
app.use("/filmes", filmesRoutes);


app.listen(5000, () => console.log("Server rodando em http://localhost:5000"));
