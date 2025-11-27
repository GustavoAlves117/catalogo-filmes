const express = require("express");
const router = express.Router();
const FilmesController = require("../controllers/filmesController");


router.get("/", FilmesController.listar);


router.get("/:id", FilmesController.buscarPorId);


router.post("/", FilmesController.criar);


router.put("/:id", FilmesController.atualizar);


router.delete("/:id", FilmesController.deletar);

module.exports = router;
