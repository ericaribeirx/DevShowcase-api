const express = require("express");

const { validateProject } = require("../dtos/projectDTO");
const { validateFeedback } = require("../dtos/feedbackDTO");

const { projectOutputDTO } = require("../dtos/outputs/projectOutputDTO");
const { feedbackOutputDTO } = require("../dtos/outputs/feedbackOutputDTO");

const {
  createProject,
  findAllProjects,
  findProjectById,
  incrementUpvote
} = require("../repositories/projectRepository");

const { createFeedback } = require("../repositories/feedbackRepository");

const { ValidationError, NotFoundError } = require("../errors/AppError");

const router = express.Router();

function parseProjectId(rawId) {
  const id = Number(rawId);

  if (!Number.isInteger(id)) {
    throw new ValidationError(["Id de projeto inválido"]);
  }

  return id;
}

router.post("/", async (req, res, next) => {
  try {
    const errors = validateProject(req.body);

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    const project = await createProject(req.body);
    const createdProject = await findProjectById(project.id);

    res.status(201).json(projectOutputDTO(createdProject));
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
    const technology = req.query.technology ? String(req.query.technology) : undefined;

    const { projects, total } = await findAllProjects({ technology, page, limit });

    res.json({
      data: projects.map(projectOutputDTO),
      meta: {
        page,
        limit,
        total,
        totalPages: total > 0 ? Math.ceil(total / limit) : 0
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/feedbacks", async (req, res, next) => {
  try {
    const projectId = parseProjectId(req.params.id);

    const errors = validateFeedback(req.body);

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    const project = await findProjectById(projectId);

    if (!project) {
      throw new NotFoundError("Projeto não encontrado");
    }

    const { feedback, updatedProject } = await createFeedback(projectId, req.body);

    res.status(201).json(feedbackOutputDTO(feedback, updatedProject));
  } catch (error) {
    next(error);
  }
});

router.put("/:id/upvote", async (req, res, next) => {
  try {
    const projectId = parseProjectId(req.params.id);

    const project = await findProjectById(projectId);

    if (!project) {
      throw new NotFoundError("Projeto não encontrado");
    }

    const updatedProject = await incrementUpvote(projectId);

    res.json(projectOutputDTO(updatedProject));
  } catch (error) {
    next(error);
  }
});

module.exports = router;