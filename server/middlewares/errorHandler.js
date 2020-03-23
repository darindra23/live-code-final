module.exports = {
  errorHandler(err, req, res, next) {
    if (err.errors) {
      res.status(400).json(err.errors);
    } else if (err.name === "TypeError") {
      res.status(404).json({ message: "Data not found" });
    } else if (err.message === "invalid token") {
      res.status(401).json({ message: err.message });
    } else if (err.message === "jwt must be provided") {
      res.status(403).json({ message: err.message });
    } else {
      res.status(err.status || 500).json(err);
    }
  }
};
