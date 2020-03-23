const routes = require("express").Router();
const Controller = require("../controllers");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

routes.post("/login", Controller.login);
routes.get("/countries", authentication, Controller.getCountries);
routes.get("/reports", authentication, Controller.getReports);
routes.post("/reports", authentication, Controller.postReports);
routes.delete("/reports/:id", authentication, authorization, Controller.remove);

module.exports = routes;
