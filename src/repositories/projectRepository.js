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

async function findAllProjects({ technology, page = 1, limit = 10 } = {}) {
  const where = technology
    ? {
        technologies: {
          some: {
            name: {
              equals: technology,
              mode: "insensitive"
            }
          }
        }
      }
    : {};

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      include: {
        profile: true,
        technologies: true,
        feedbacks: true
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.project.count({ where })
  ]);

  return { projects, total };
}

async function findProjectById(id) {
  return await prisma.project.findUnique({
    where: { id },
    include: {
      profile: true,
      technologies: true,
      feedbacks: true
    }
  });
}

async function incrementUpvote(id) {
  return await prisma.project.update({
    where: { id },
    data: {
      upvotes: {
        increment: 1
      }
    },
    include: {
      profile: true,
      technologies: true,
      feedbacks: true
    }
  });
}

module.exports = {
  prisma,
  createProject,
  findAllProjects,
  findProjectById,
  incrementUpvote
};