const { Router } = require("express");
const { getCountriesDb } = require("../controllers/CountryController");

const CountryRoute = Router();

CountryRoute.get("/", getCountriesDb);
CountryRoute.get("/:id", getCountriesDb);

module.exports = CountryRoute;
