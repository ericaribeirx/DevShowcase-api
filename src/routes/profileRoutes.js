const express = require("express");

const {
  createProfile,
  findProfileById
} = require("../repositories/profileRepository");

const { validateProfile } = require("../dtos/profileDTO");

const { profileOutputDTO } = require("../dtos/outputs/profileOutputDTO");

const { ValidationError, NotFoundError } = require("../errors/AppError");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const errors = validateProfile(req.body);

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    const profile = await createProfile(req.body);
    res.status(201).json(profileOutputDTO(profile));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      throw new ValidationError(["Id de perfil inválido"]);
    }

    const profile = await findProfileById(id);

    if (!profile) {
      throw new NotFoundError("Perfil não encontrado");
    }

    res.json(profileOutputDTO(profile));
  } catch (error) {
    next(error);
  }
});

module.exports = router;