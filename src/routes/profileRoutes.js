const express = require("express");

const {
  createProfile,
  findProfileById
} = require("../repositories/profileRepository");

const { validateProfile } = require("../dtos/profileDTO");

const { profileOutputDTO } = require("../dtos/outputs/profileOutputDTO");

const router = express.Router();

router.post("/", async (req, res) => {
  const errors = validateProfile(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      erros: errors
    });
  }

  try {
    const profile = await createProfile(req.body);
  res.status(201).json(profileOutputDTO(profile));

 } catch (error) {
  console.error(error);

  res.status(500).json({
    erro: "Erro ao criar perfil"
  });
}
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const profile = await findProfileById(id);

    if (!profile) {
      return res.status(404).json({
        erro: "Perfil não encontrado"
      });
    }

    res.json(profileOutputDTO(profile));
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar perfil"
    });
  }
});

module.exports = router;