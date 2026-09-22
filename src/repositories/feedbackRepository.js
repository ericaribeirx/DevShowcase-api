const { prisma } = require("./projectRepository");

async function createFeedback(projectId, data) {
  const feedback = await prisma.feedback.create({
    data: {
      author: data.author,
      comment: data.comment,
      rating: data.rating,
      projectId
    }
  });

  const aggregate = await prisma.feedback.aggregate({
    where: { projectId },
    _avg: { rating: true }
  });

  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: { averageRating: aggregate._avg.rating ?? 0 },
    include: {
      profile: true,
      technologies: true,
      feedbacks: true
    }
  });

  return { feedback, updatedProject };
}

module.exports = {
  createFeedback
};
