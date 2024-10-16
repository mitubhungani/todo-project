const isValid = (req, res, next) => {
  let { task } = req.body;

  if (!task) {
    res.send("Invalid task");
  } else {
    next();
  }
};

module.exports = isValid;
