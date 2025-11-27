const Filme = require("../models/Filmes");

module.exports = {

    async listar(req, res) {
        try {
            const filmes = await Filme.find();
            res.json(filmes);
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao buscar filmes." });
        }
    },


    async buscarPorId(req, res) {
        try {
            const filme = await Filme.findById(req.params.id);
            if (!filme) {
                return res.status(404).json({ erro: "Filme não encontrado." });
            }
            res.json(filme);
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao buscar filme." });
        }
    },

    async criar(req, res) {
        try {
            const novoFilme = await Filme.create(req.body);
            res.status(201).json(novoFilme);
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao criar filme.", detalhes: erro });
        }
    },

    
    async atualizar(req, res) {
        try {
            const filmeAtualizado = await Filme.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!filmeAtualizado) {
                return res.status(404).json({ erro: "Filme não encontrado." });
            }

            res.json(filmeAtualizado);
        } catch (erro) {
            res.status(400).json({ erro: "Erro ao atualizar filme.", detalhes: erro });
        }
    },


    async deletar(req, res) {
        try {
            const filmeDeletado = await Filme.findByIdAndDelete(req.params.id);

            if (!filmeDeletado) {
                return res.status(404).json({ erro: "Filme não encontrado." });
            }

            res.json({ mensagem: "Filme removido com sucesso!" });
        } catch (erro) {
            res.status(500).json({ erro: "Erro ao deletar filme." });
        }
    },
};
