const express = require("express");

const { validateProject } = require("../dtos/projectDTO");

const { projectOutputDTO } = require("../dtos/outputs/projectOutputDTO");

const {
  createProject,
  findAllProjects
} = require("../repositories/projectRepository");

const router = express.Router();

router.post("/", async (req, res) => {
  const errors = validateProject(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      erros: errors
    });
  }

  try {
    const project = await createProject(req.body);

const projectWithRelations = await findAllProjects();

const createdProject = projectWithRelations.find(
  (item) => item.id === project.id
);

   res.status(201).json(projectOutputDTO(createdProject));

  } catch (error) {
    res.status(500).json({
      erro: "Erro ao criar projeto"
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await findAllProjects();

    res.json(projects.map(projectOutputDTO));
    
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar projetos"
    });
  }
});

module.exports = router;