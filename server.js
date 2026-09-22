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

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});