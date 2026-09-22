function projectOutputDTO(project) {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    url: project.url,
    createdAt: project.createdAt,
    profileId: project.profileId,
    profile: project.profile,
    technologies: project.technologies
  };
}

module.exports = {
  projectOutputDTO
};