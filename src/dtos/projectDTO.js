function validateProject(data) {
  const errors = [];

  if (!data.title || data.title.trim() === "") {
    errors.push("Título é obrigatório");
  }

  if (!data.url || data.url.trim() === "") {
    errors.push("URL é obrigatória");
  } else {
    try {
      new URL(data.url);
    } catch {
      errors.push("URL inválida");
    }
  }

  if (!data.profileId) {
    errors.push("Profile é obrigatório");
  }

  if (!Array.isArray(data.technologyIds)) {
    errors.push("technologyIds deve ser uma lista");
  }

  return errors;
}

module.exports = {
  validateProject
};