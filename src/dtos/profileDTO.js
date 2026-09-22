function validateProfile(data) {
  const errors = [];

  if (!data.name || data.name.trim() === "") {
    errors.push("Nome é obrigatório");
  }

  if (!data.email || data.email.trim() === "") {
    errors.push("E-mail é obrigatório");
  } else if (!data.email.includes("@")) {
    errors.push("E-mail inválido");
  }

  return errors;
}

module.exports = {
  validateProfile
};