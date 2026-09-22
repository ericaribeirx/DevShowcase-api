function profileOutputDTO(profile) {
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    bio: profile.bio,
    createdAt: profile.createdAt
  };
}

module.exports = {
  profileOutputDTO
};