const mongoose = require("mongoose");

async function conectarBanco() {
    try {
        await mongoose.connect("mongodb://localhost:27017/catalogo_filmes");
        console.log("MongoDB conectado!");
    } catch (erro) {
        console.error("Erro ao conectar ao banco:", erro);
    }
}

module.exports = conectarBanco;
