module.exports = function (req, res, next) {
  if (!req.user.isAdmin)
    return res.status(403).send("Request ignored Because you are not Admin");
  next();
};
