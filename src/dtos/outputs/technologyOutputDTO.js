function technologyOutputDTO(technology) {
  return {
    id: technology.id,
    name: technology.name
  };
}

module.exports = {
  technologyOutputDTO
};