function validateFeedback(data) {
  const errors = [];

  if (!data.author || data.author.trim() === "") {
    errors.push("Autor é obrigatório");
  }

  if (!data.comment || data.comment.trim() === "") {
    errors.push("Comentário é obrigatório");
  }

  if (data.rating === undefined || data.rating === null || data.rating === "") {
    errors.push("Nota é obrigatória");
  } else if (!Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5) {
    errors.push("Nota deve ser um número inteiro entre 1 e 5");
  }

  return errors;
}

module.exports = {
  validateFeedback
};
