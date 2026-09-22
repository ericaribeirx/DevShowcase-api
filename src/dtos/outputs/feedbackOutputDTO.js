function feedbackOutputDTO(feedback, project) {
  return {
    id: feedback.id,
    author: feedback.author,
    comment: feedback.comment,
    rating: feedback.rating,
    createdAt: feedback.createdAt,
    projectId: feedback.projectId,
    project: project
      ? {
          id: project.id,
          averageRating: project.averageRating,
          feedbacksCount: project.feedbacks ? project.feedbacks.length : undefined
        }
      : undefined
  };
}

module.exports = {
  feedbackOutputDTO
};
