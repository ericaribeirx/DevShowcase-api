const express = require("express");

const { validateTechnology } = require("../dtos/technologyDTO");

const { technologyOutputDTO } = require("../dtos/outputs/technologyOutputDTO");

const {
  createTechnology,
  findAllTechnologies
} = require("../repositories/technologyRepository");

const router = express.Router();

router.post("/", async (req, res) => {
  const errors = validateTechnology(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      erros: errors
    });
  }

  try {
    const technology = await createTechnology(req.body);
    res.status(201).json(technologyOutputDTO(technology));

  } catch (error) {
    res.status(500).json({
      erro: "Erro ao criar tecnologia"
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const technologies = await findAllTechnologies();

    res.json(technologies.map(technologyOutputDTO));
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar tecnologias"
    });
  }
});

module.exports = router;