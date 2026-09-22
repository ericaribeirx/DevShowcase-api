const express = require("express");

const profileRoutes = require("./src/routes/profileRoutes");

const technologyRoutes = require("./src/routes/technologyRoutes");

const projectRoutes = require("./src/routes/projectRoutes");

const app = express();

app.use(express.json());

app.use("/api/profiles", profileRoutes);

app.use("/api/technologies", technologyRoutes);

app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.json({
    mensagem: "DevShowcase API funcionando!"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});