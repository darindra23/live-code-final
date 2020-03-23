const { User, Report, Country } = require("../models");
const createError = require("http-errors");
const { sign } = require("../helpers/jwt");

class Controller {
  static async login(req, res, next) {
    try {
      let { username, password } = req.body;
      let condition = {
        where: { username }
      };
      let findUser = await User.findOne(condition);
      if (findUser) {
        if (findUser.password === password) {
          let token = sign({ id: findUser.id, username: findUser.username });
          res
            .status(200)
            .json({ token, id: findUser.id, username: findUser.username });
        } else {
          throw createError(400, "Invalid Username or Password.");
        }
      } else {
        throw createError(404);
      }
    } catch (error) {
      next(error);
    }
  }
  static async getCountries(req, res, next) {
    try {
      let countries = await Country.findAll();
      res.status(200).json(countries);
    } catch (error) {
      next(error);
    }
  }
  static async getReports(req, res, next) {
    try {
      let condition = {
        where: {
          UserId: req.user.id
        },
        include: Country
      };
      let reports = await Report.findAll(condition);
      res.status(200).json(reports);
    } catch (error) {
      next(error);
    }
  }
  static async postReports(req, res, next) {
    try {
      let conditionCountry = {
        where: {
          id: req.body.CountryId
        }
      };
      let foundCountry = await Country.findOne(conditionCountry);
      if (foundCountry) {
        let input = {
          cases: req.body.cases,
          CountryId: req.body.CountryId,
          UserId: req.user.id
        };
        let inputUpdate = {
          cases: Number(foundCountry.cases) + Number(req.body.cases)
        };
        let created = await Report.create(input);
        let updated = await Country.update(inputUpdate, conditionCountry);
        let condition = {
          where: {
            id: created.id
          },
          include: Country
        };
        let newReport = await Report.findOne(condition);
        res.status(201).json(newReport);
      } else {
        throw createError(404);
      }
    } catch (error) {
      next(error);
    }
  }
  static async remove(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      let foundReport = await Report.findOne(condition);
      if (foundReport) {
        let conditionCountry = {
          where: {
            id: foundReport.CountryId
          }
        };
        let country = await Country.findOne(conditionCountry);
        let updateCountry = {
          cases: Number(country.cases) - Number(foundReport.cases)
        };
        let updated = await Country.update(updateCountry, conditionCountry);
        let deleted = await Report.destroy(condition);
        let finalCountry = await Country.findOne(conditionCountry);
        res
          .status(200)
          .json({ country: finalCountry, report: "Successfully delete." });
      } else {
        throw createError(404);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
