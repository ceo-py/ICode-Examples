function authUser(req, res, next) {
  if (!req.user) {
    return res.status(403).json({message: 'You need to sing in!'});
  }
  next()
}

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401)
      return res.send('Not allowed')
    }

    next()
  }
}

// eslint-disable-next-line no-undef
module.exports = {
  authUser,
  authRole
}