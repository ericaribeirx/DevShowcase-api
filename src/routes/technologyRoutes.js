const express = require("express");

const { validateTechnology } = require("../dtos/technologyDTO");

const { technologyOutputDTO } = require("../dtos/outputs/technologyOutputDTO");

const {
  createTechnology,
  findAllTechnologies
} = require("../repositories/technologyRepository");

const { ValidationError } = require("../errors/AppError");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const errors = validateTechnology(req.body);

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    const technology = await createTechnology(req.body);
    res.status(201).json(technologyOutputDTO(technology));
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const technologies = await findAllTechnologies();

    res.json(technologies.map(technologyOutputDTO));
  } catch (error) {
    next(error);
  }
});

module.exports = router;