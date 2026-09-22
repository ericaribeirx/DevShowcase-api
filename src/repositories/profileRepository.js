require("dotenv").config();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createProfile(data) {
  return await prisma.profile.create({
    data
  });
}

async function findProfileById(id) {
  return await prisma.profile.findUnique({
    where: {
      id
    }
  });
}

module.exports = {
  prisma,
  createProfile,
  findProfileById
};