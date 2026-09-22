function projectOutputDTO(project) {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    url: project.url,
    createdAt: project.createdAt,
    averageRating: project.averageRating,
    upvotes: project.upvotes,
    profileId: project.profileId,
    profile: project.profile,
    technologies: project.technologies,
    feedbacks: project.feedbacks
  };
}

module.exports = {
  projectOutputDTO
};