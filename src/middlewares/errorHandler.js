const { AppError, ValidationError, NotFoundError } = require("../errors/AppError");

function notFoundMiddleware(req, res, next) {
  next(new NotFoundError(`Rota ${req.method} ${req.originalUrl} não encontrada`));
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof ValidationError) {
    return res.status(400).json({
      erros: err.errors
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      erro: err.message
    });
  }

  // Registro relacionado não encontrado (ex.: update/delete em id inexistente)
  if (err.code === "P2025") {
    return res.status(404).json({
      erro: "Registro não encontrado"
    });
  }

  // Violação de restrição única (ex.: e-mail ou nome duplicado)
  if (err.code === "P2002") {
    const campos = Array.isArray(err.meta?.target) ? err.meta.target.join(", ") : "valor";
    return res.status(400).json({
      erros: [`Já existe um registro com esse ${campos}`]
    });
  }

  // Chave estrangeira inválida (ex.: profileId ou technologyId inexistente)
  if (err.code === "P2003") {
    return res.status(400).json({
      erros: ["Referência inválida para um registro relacionado"]
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      erro: err.message
    });
  }

  return res.status(500).json({
    erro: "Erro interno do servidor"
  });
}

module.exports = {
  errorHandler,
  notFoundMiddleware
};
