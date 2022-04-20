const authMiddleware = (req, res, next) => {
  const id = req.session.sid;
  if (!id) {
    res.status(401).end()
  }
  next();
}

module.exports = authMiddleware;