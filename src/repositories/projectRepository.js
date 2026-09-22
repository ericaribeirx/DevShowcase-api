require("dotenv").config();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createProject(data) {
  const { technologyIds, ...projectData } = data;

  return await prisma.project.create({
    data: {
      ...projectData,
      technologies: {
        connect: technologyIds.map((id) => ({ id }))
      }
    }
  });
}

async function findAllProjects() {
  return await prisma.project.findMany({
    include: {
      profile: true,
      technologies: true
    }
  });
}

module.exports = {
  prisma,
  createProject,
  findAllProjects
};