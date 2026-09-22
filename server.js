require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");

const openapiSpec = require("./src/docs/openapi.json");

const profileRoutes = require("./src/routes/profileRoutes");

const technologyRoutes = require("./src/routes/technologyRoutes");

const projectRoutes = require("./src/routes/projectRoutes");

const { errorHandler, notFoundMiddleware } = require("./src/middlewares/errorHandler");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensagem: "DevShowcase API funcionando!"
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use("/api/profiles", profileRoutes);

app.use("/api/technologies", technologyRoutes);

app.use("/api/projects", projectRoutes);

app.use(notFoundMiddleware);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});