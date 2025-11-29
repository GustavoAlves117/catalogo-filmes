require('dotenv').config();
const mongoose = require("mongoose");

async function conectarBanco() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB conectado!");
    } catch (erro) {
        console.error("Erro ao conectar ao banco:", erro);
    }
}

module.exports = conectarBanco;
