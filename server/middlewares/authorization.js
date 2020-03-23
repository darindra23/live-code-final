let { Report } = require("../models");
const createError = require("http-errors");

module.exports = {
  async authorization(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      console.log(req.params.id);
      let foundReport = await Report.findOne(condition);
      if (foundReport) {
        if (foundReport.UserId === req.user.id) {
          next();
        } else {
          throw createError(403, "Forbidden access.");
        }
      } else {
        throw createError(404);
      }
    } catch (error) {
      next(error);
    }
  }
};
