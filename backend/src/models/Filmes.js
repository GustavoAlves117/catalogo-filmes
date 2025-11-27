const mongoose = require("mongoose");

const FilmeSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true
        },
        sinopse: {
            type: String,
            required: true
        },
        ano: {
            type: Number,
            required: true,
            min: 1888 
        },
        duracao: {
            type: Number, 
            required: true
        },
        generos: {
            type: [String],
            required: true
        },
        diretor: {
            type: String,
            required: true
        },
        elenco: {
            type: [String],
            required: true
        },
        nota: {
            type: Number,
            min: 0,
            max: 10,
            default: null
        },
        capa: {
            type: String, 
            required: true
        },
        trailer: {
            type: String, 
            required: false
        },
        destaque: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true 
    }
);

module.exports = mongoose.model("Filme", FilmeSchema);
