const {
  prisma,
  createProfile,
  findProfileById
} = require("./repositories/profileRepository");

async function testarPrisma() {
  const profile = await createProfile({
    name: "Érica",
    email: "erica@teste.com",
    bio: "Estudante de Sistemas para Internet"
  });

  console.log("Perfil criado:");
  console.log(profile);

  const encontrado = await findProfileById(profile.id);

  console.log("Perfil encontrado:");
  console.log(encontrado);

  await prisma.$disconnect();
}

testarPrisma();