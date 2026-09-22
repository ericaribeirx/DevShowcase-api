require("dotenv").config();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createTechnology(data) {
  return await prisma.technology.create({
    data
  });
}

async function findAllTechnologies() {
  return await prisma.technology.findMany();
}

module.exports = {
  prisma,
  createTechnology,
  findAllTechnologies
};