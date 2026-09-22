class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

class ValidationError extends AppError {
  constructor(errors) {
    super("Erro de validação", 400);
    this.errors = Array.isArray(errors) ? errors : [errors];
  }
}

class NotFoundError extends AppError {
  constructor(message = "Recurso não encontrado") {
    super(message, 404);
  }
}

module.exports = {
  AppError,
  ValidationError,
  NotFoundError
};
