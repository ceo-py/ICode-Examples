
const ROLE = {
  'ADMIN': 'ADMIN',
  'MODERATOR': 'MODERATOR',
  'BASIC': 'BASIC',

}

function canViewProject(user, project) {
  return (
    user.role === ROLE.ADMIN ||
    project.userId === user.id
  )
}

function scopedProjects(user, projects) {
  if (user.role === ROLE.ADMIN) return projects
  return projects.filter(project => project.userId === user.id)
}

function canDeleteProject(user, project) {
  return project.userId === user.id
}

// eslint-disable-next-line no-undef
module.exports = {
  canViewProject,
  scopedProjects,
  canDeleteProject
}