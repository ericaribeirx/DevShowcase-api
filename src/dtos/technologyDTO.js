function validateTechnology(data) {
  const errors = [];

  if (!data.name || data.name.trim() === "") {
    errors.push("Nome da tecnologia é obrigatório");
  }

  return errors;
}

module.exports = {
  validateTechnology
};